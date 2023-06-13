import axios from "axios";
export function setTokenToCookie(token) {
  document.cookie = `token=${token}; path=/;`;
}
// import layer from "layer";
export function PopupMessage(alertMessage,showFlag) {
  console.log(alertMessage)
  layer.msg(alertMessage, {
    time: 2000, // 显示时间（毫秒）
    icon: showFlag, // 图标，1表示成功，2表示失败，3表示警告，默认为0无图标
    shade: 0.5, // 遮罩层透明度（0-1之间）
    shadeClose: true, // 是否点击遮罩层关闭提示框
  });
}
const url = "http://localhost:80"
//发送验证码
export async function sendSMS(phoneNumber) {
    try {
      console.log(phoneNumber);
      // let a = `${url}/sms/${phoneNumber}`;
      console.log(a);
      if (phoneNumber.length != 11 || isNaN(Number(phoneNumber))) {
        alert("手机号格式错误");
        return -1;
      }
      const response = await axios.post(`${url}/sms/${phoneNumber}`);
      let responseData = response.data
      // 处理响应数据
      if (responseData.code === 0) {
        PopupMessage("wrong");
      } else {
        PopupMessage("success");
      }
      console.log(responseData.data);
    } catch (error) {
      // 处理错误信息
      // PopupMessage(error)
      console.error(error);
    }
  }
  // 调用函数发送请求
  //用户注册
  export async function registerUser(userData) {
    try {
      console.log(userData);
      if (
        userData.username.length <= 0 ||
        userData.password.length <= 0 ||
        userData.phone.length <= 0 ||
        userData.code.length <= 0
      ) {
        alert("手机号格式错误");
        return -1;
      }
  
      const response = await axios.post(`${url}/register`, userData);
      // 处理响应数据
      console.log(response.data);
      if (response.data.code == 1) {
        PopupMessage("注册成功",1);
      } else {
        // console.log(response.data.msg);
        PopupMessage(response.data.msg,2);
      }
    } catch (error) {
      // 处理错误信息
      PopupMessage(error)
      console.error(error);
    }
  }
  
  export async function UserLogin(userData) {
    try {
      if (userData.username.length == 0 || userData.password.length == 0) {
        return -1;
      }
      const response = await axios.post(`${url}/login`, userData);
      console.log(response.data);
      // let response = {
      //   data:{
      //     code:1
      //   }
      // }
      var data = response.data;
      if (data.code === 1) {
        let message = "登陆成功"
        PopupMessage        //设置token
        var token = data.data;
        setTokenToCookie(token);
        window.location.href = "http://localhost:3000";
        storedToken = token;
        // getUserDialogues();
        return data.data;
      } else {
        console.log(data.msg);
      }
    } catch (error) {
      PopupMessage(error)
      console.log(error);
    }
  }