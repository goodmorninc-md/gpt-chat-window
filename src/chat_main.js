import {
  sendSMS,
  registerUser,
  userLogin,
  createDialogue,
  deleteDialogue,
  updateDialogue,
  getUserDialogues,
  createQA,
  deleteQA,
  updateQA,
  getDialogueQAs,
  getTokenFromCookie,
  getOrders,
  UserPay
} from "./requireApi.js";
// 导入函数
import {
  addUserMessage,
  addChatbotLoadingImg,
  addChatbotMessage,
  newChatGPTMessage,
  clearChatHistory,
  createNewChat,
  showAllChat,
  displayTextOneCharAtATime,
  createDialogueInPage,
  changeShape,
  deleteDialogueInPage,
  loadAllChatMessages
} from "./script.js";
import { showPaymentPopup,updateOrderRecords,PopupMessage } from "./popup.js";
import axios from "axios";
const storedToken = getTokenFromCookie();
//展开关闭付款框
const showPaymentPopupBtn = $("#payButton");
showPaymentPopupBtn.click(() => {
  showPaymentPopup();
});
var current_chat = -1;
// axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//递归打印后端返回消息

//用户进入主界面等页面加载完展示该用户的所有对话
window.onload = async function () {
  try {
    let dialogueData = getUserDialogues();
    // console.log(dialogueData);
    dialogueData.then((responseData) => {
      let DataArray = responseData.data
      // console.log(DataArray, DataArray[0]);
      if (DataArray.length >= 0) {
        //将当前对话设置为获取到的第一个对话
        current_chat = DataArray[0].id;
        // console.log("current_chat:", current_chat);
        var ChatHistory = getDialogueQAs(current_chat);
        //在左边会话选择框中渲染该用户的所有会话
        showAllChat(DataArray);
        var allChat;
        // 展示第一个会话的记录
        // console.log(ChatHistory);
        ChatHistory.then(async (ChatHistoryData) => {
          // console.log(ChatHistoryData.data, typeof ChatHistoryData.data);
          allChat = ChatHistoryData.data;
          loadAllChatMessages(allChat, 0);
          // resolve(allChat);
        });
      }
    });
    let orderData = getOrders()
    console.log(orderData)
    orderData.then((data)=>{
      console.log(data)
      updateOrderRecords(data)
    })
  } catch (error) {
    console.log(error);
  }
};


// 设置请求头中的认证信息
//模拟后端返回的创建id
let dataId = 20
//创建会话
const createNewChatBtn = $("#new-chat-btn");
createNewChatBtn.click(() => {
  let time = new Date();
  //获取当前时间
  time = time.toJSON().split("T")[0];
  // 前端假数据
  let userData = {
    time: time,
    topic: "myTopic",
  };
  //像后端发起请求
  
  let response = createDialogue(userData);
  response.then((responseData) => {
    // console.log(responseData);
    if (responseData.code === 1) {
      responseData.topic = userData.topic;
      responseData.createTime = userData.time;
      //模拟后端返回的id
      responseData.data = dataId
      dataId+=1
      console.log(dataId)
      createDialogueInPage(responseData);
    } else {
      console.log("create new dialogue wrong");
    }
  });
});


//发起问答
//向后端发消息
const messageInput = document.getElementById("message-input");
const sendButton = $("#send-button");
//给发送问题添加回车事件
messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    sendButton.click();
  }
});
sendButton.click((e) => {
  e.preventDefault();

  const message = messageInput.value;

  messageInput.value = "";
  //前端插入用户消息
  addUserMessage(message);
  let qaData = {
    question: message,
    dialogueId: current_chat,
  };
  // Call ChatGPT API to generate response and append to chatLog
  let responseMessage = createQA(qaData);
  let temporaryId = -100;
  addChatbotLoadingImg(temporaryId);
  responseMessage.then((responseData) => {
    // console.log(responseData);
    if (responseData.code === 1) {
      addChatbotMessage(responseData.data.answer, responseData.data.qaId, 2);
    }
    else{
      PopupMessage(responseData.msg,2)
    }
  });
});

const PayButton = $("#PostNewPayBtn")
PayButton.click(()=>{
  console.log(PayButton["0"].innerHTML)
  let flag = PayButton["0"].innerHTML.split("￥")[0]
  console.log(flag)
  if(flag === "choose your pay")
  {
    PopupMessage("请选择套餐",2)
  }
  else{
    let ChoosePayMoney = Number(PayButton["0"].innerHTML.split("￥")[1])
    console.log(ChoosePayMoney)
    let response = UserPay(ChoosePayMoney)
    response.then((responseData)=>{
      if(responseData.code === 1)
      {
        PopupMessage("支付成功",1)
      }
      else{
        PopupMessage("支付失败",2)
      }
    })
  }
  
})

$(document).ready(function() {
  var $logoutButton = $('#logout-button');
  
  $logoutButton.on('click', function() {
    // 删除 cookie 中的 token
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // 跳转到登录界面
    window.location.href = 'http://localhost:3000/login.html';
  });
});

