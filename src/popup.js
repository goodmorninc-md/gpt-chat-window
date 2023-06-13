// 获取用户头像元素
const userAvatar = document.getElementById("userPhoto");
import backgroundImg1 from "./background1.jpg";
// 获取弹窗元素
const popup = document.getElementById("popup");
import { getOrders, getUserUsage } from "./requireApi";
// 获取关闭按钮元素
const closeButton = document.getElementById("closeButton");
// $(document).ready(function() {
//     // 点击用户头像时显示弹窗
//     $('#userAvatar').click(function() {
//       $('#popup').show();
//     });

//     // 点击关闭按钮时隐藏弹窗
//     $('#closeButton').click(function() {
//       $('#popup').hide();
//     });
//   });
export function PopupMessage(alertMessage, showFlag) {
  console.log(alertMessage);
  layer.msg(alertMessage, {
    time: 1000, // 显示时间（毫秒）
    icon: showFlag, // 图标，1表示成功，2表示失败，3表示警告，默认为0无图标
    shade: 0.1, // 遮罩层透明度（0-1之间）
    shadeClose: true, // 是否点击遮罩层关闭提示框
  });
}
// Define a function to show the payment popup
const pay_plugin = document.getElementById("pay-plugin-top");
pay_plugin.style.backgroundImage = `url(${backgroundImg1})`;
pay_plugin.style.backgroundSize = "100% 100%";
const pay_plugin1 = document.getElementById("pay-plugin-top1");
pay_plugin1.style.backgroundImage = `url(${backgroundImg1})`;
pay_plugin1.style.backgroundSize = "100% 100%";
export function showPaymentPopup() {
  // Get the payment popup element
  const paymentPopup = document.getElementById("paymentPopup");

  // Get the close button element
  const closeButton = paymentPopup.querySelector(".pay-plugin-close");
  console.log(closeButton);
  // Show the payment popup
  paymentPopup.style.display = "block";

  // 创建 ::before 伪元素样式
  var beforeElement = document.getElementById("before-overlay");
  beforeElement.classList.add("before-overlay"); // 添加自定义类名，用于设置样式
  // When the user clicks the close button, hide the payment popup
  closeButton.onclick = function () {
    paymentPopup.style.display = "none";
    beforeElement.style.display = "none";
  };
}
// Call the showPaymentPopup function when the user clicks a button or performs some other action
$("#payButton").click(() => {
  showPaymentPopup();
});

export function showUsagePopup() {
  // Get the payment popup element
  const usagePopup = document.getElementById("usagePopup");

  // Get the close button element
  const closeButton = usagePopup.querySelector(".pay-plugin-close");
  console.log(closeButton);
  // Show the payment popup
  usagePopup.style.display = "block";

  // 创建 ::before 伪元素样式
  var beforeElement = document.getElementById("before-overlay");
  beforeElement.classList.add("before-overlay"); // 添加自定义类名，用于设置样式
  // When the user clicks the close button, hide the payment popup
  closeButton.onclick = function () {
    usagePopup.style.display = "none";
    beforeElement.style.display = "none";
  };

  let responseData = getOrders();
  responseData.then(async (data) => {
    updateOrderRecords(data);
    //获取用户用量

    new Promise(async (resolve, reject) => {
      let UserUsage = await getUserUsage();
      let sum = 0;
      let UserOrder = data.data;
      UserOrder.forEach((element) => {
        sum += Number(element.totalPay);
      });
      resolve([UserUsage, sum]);
    }).then((d) => {
      let UserUsage = d[0]
      let sum = d[1]
      UserUsage.then((responseUsageData) => {
        if (responseUsageData.code === 1) {
          let UserAmount = responseUsageData.data.amount;
          var $quotaMeter = $("#quota-meter");
          var $quotaUsed = $quotaMeter.find(".quota-used");
          $("#user-balance").text(`您的余额剩余：$${UserAmount}`);
          // 需要设置已用量和总量参数，这里只是示例
          var usedQuota = UserAmount;
          var totalQuota = sum;

          // 计算使用量占总量的比例
          var ratio = usedQuota / totalQuota;
          // 根据比例设置使用量的颜色和宽度
          $quotaUsed.css({
            "background-color": getUsedColor(ratio),
            width: ratio * 100 + "%",
          });
        } else {
          var usedQuota = 80;
          var totalQuota = 100;
          $("#user-balance").text(`您的余额剩余："出错"}`);
          // 计算使用量占总量的比例
          var ratio = usedQuota / totalQuota;
          // 根据比例设置使用量的颜色和宽度
          $quotaUsed.css({
            "background-color": getUsedColor(ratio),
            width: ratio * 100 + "%",
          });
        }
      });
    });
  });
}

function getUsedColor(ratio) {
  if (ratio <= 0.5) {
    // 使用量在总量的50%以下时，使用绿色
    return "#66cc66";
  } else if (ratio < 0.8) {
    // 使用量在总量的50%至80%之间时，使用黄色
    return "#ffd966";
  } else {
    // 使用量在总量的80%以上时，使用红色
    return "#ff6666";
  }
}
$("#userPhoto").click(() => {
  showUsagePopup();
});
// 更新订单记录
export function updateOrderRecords(responseData) {
  // orderContainer.empty(); // 清空订单容器
  console.log(responseData);
  // console.log(responseData.data);
  console.log(responseData.data, typeof responseData.data.length);
  let StatusArray = ["未支付", "支付失败", "支付成功"];
  for (var i = 0; i < responseData.data.length; i++) {
    var order = responseData.data[i];
    var orderItem = $("<div>").addClass("order-item");
    var orderId = $("<div>")
      .addClass("order-id")
      .text("Order ID: " + order.id);
    var orderTradeId = $("<div>")
      .addClass("order-id")
      .text("Trade ID: " + order.tradeId);
    var orderState = $("<div>")
      .addClass("order-state")
      .text("State: " + StatusArray[order.state + 1]);
    var orderTotalPay = $("<div>")
      .addClass("order-total-pay")
      .text("Total Pay: $" + order.totalPay);
    var orderCompleteTime = $("<div>")
      .addClass("order-complete-time")
      .text("Complete Time: " + order.completeTime);

    orderItem.append(
      orderId,
      orderTradeId,
      orderState,
      orderTotalPay,
      orderCompleteTime
    );
    console.log(orderItem);
    orderContainer.append(orderItem["0"]);
  }
}
$(document).ready(function () {
  // 模拟一些数据
  // 模拟一些数据
  // 模拟一些数据
  // 模拟一些数据
  var timeData = ["topic1", "topic2", "topic3"];
  var tokenData = [100, 120, 110];

  // 0代表查看token
  // 1代表查看订单
  var current_state = 0;

  // 获取图表容器元素
  var container = $("#container");
  var chartContainer = $("#chartContainer");
  var orderContainer = $("#orderContainer");

  // 隐藏订单容器初始时
  orderContainer.hide();

  // 获取当前日期
  var currentDate = new Date();
  var currentMonth = currentDate.getMonth();
  // 查找当前月份的索引
  var currentMonthIndex = -1;
  for (var i = 0; i < timeData.length; i++) {
    if (timeData[i] === "topic1") {
      currentMonthIndex = i;
      break;
    }
  }

  // 显示当前月份
  var currentMonthDisplay = $("#currentMonth");
  currentMonthDisplay.text(timeData[currentMonthIndex]);

  // 初始化图表实例
  var chart = echarts.init(chartContainer[0]);

  // 配置图表选项
  var chartOptions = {
    title: {
      text: "客户消费的Token曲线",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: timeData,
      axisLabel: {
        interval: 0,
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Token",
        type: "bar",
        data: tokenData,
      },
    ],
  };

  // 初始化图表数据
  chart.setOption(chartOptions);

  // 添加交互功能
  chart.on("click", function (params) {
    // 当点击图表上的数据点时触发
    if (params.componentType === "series") {
      var dataIndex = params.dataIndex;
      var selectedTime = timeData[dataIndex];
      var selectedToken = tokenData[dataIndex];
      console.log("选中的时间:", selectedTime);
      console.log("对应的Token值:", selectedToken);
      // 在这里可以根据需要执行其他操作
    }
  });

  // 上个月按钮点击事件处理函数
  $("#prevMonthBtn").on("click", function () {
    if (currentMonthIndex > 0) {
      currentMonthIndex--;
      updateChartAndOrders();
    }
  });

  // 下个月按钮点击事件处理函数
  $("#nextMonthBtn").on("click", function () {
    if (currentMonthIndex < timeData.length - 1) {
      currentMonthIndex++;
      updateChartAndOrders();
    }
  });

  // 切换图表/订单记录按钮点击事件处理函数
  $("#switchChartBtn").on("click", function () {
    if (current_state === 0) {
      current_state = 1;
      switchToOrderRecords();
    } else {
      current_state = 0;
      switchToChart();
    }
  });

  // 更新图表数据和选项以及订单记录
  function updateChartAndOrders() {
    var selectedMonthData = tokenData[currentMonthIndex];

    // 更新图表选项的数据
    chartOptions.xAxis.data = [timeData[currentMonthIndex]];
    chartOptions.series[0].data = [selectedMonthData];

    // 刷新图表
    chart.setOption(chartOptions);

    // 更新当前月份显示
    var currentMonthDisplay = $("#currentMonth");
    currentMonthDisplay.text(timeData[currentMonthIndex]);
  }

  // 切换到图表显示
  function switchToChart() {
    chartContainer.show();
    orderContainer.hide();
    $("#switchChartBtn").text("查看订单");
  }

  // 切换到订单记录显示
  function switchToOrderRecords() {
    chartContainer.hide();
    orderContainer.show();
    $("#switchChartBtn").text("查看图表");
  }

  // Call the updateChartAndOrders() function initially to initialize the chart and order records
  updateChartAndOrders();
});
