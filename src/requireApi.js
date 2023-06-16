import axios from "axios";
import { addChatbotMessage, addUserMessage } from "./script";
import { delay } from "lodash";
import { PopupMessage } from "./popup";
const url = "http://localhost:80";
// 设置请求头中的认证信息
// 获取存储在 Cookie 中的 Token
var storedToken;
storedToken = getTokenFromCookie();
console.log("获取token:", storedToken);
if (storedToken !== null) {
  axios.defaults.headers.common["token"] = `${storedToken}`;
} else {
  PopupMessage("请先登录", 2);
  // window.location = "http://localhost:3000/login";
}

export function setTokenToCookie(token) {
  document.cookie = `token=${token}; path=/;`;
}
// 从 Cookie 获取 Token
export function getTokenFromCookie() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("token=")) {
      return cookie.substring("token=".length);
    }
  }
  return null;
}
//获取到的response.data才是后端返回的数据
// 创建新会话
export async function createDialogue(userData) {
  try {
    // console.log(userData)
    const response = await axios.post(`${url}/dialogue`, userData);
    let responseData = response.data;
    
    if (responseData.code === 1) {
      PopupMessage("创建会话成功", 1);
      return responseData;
    } else {
      PopupMessage("创建会话失败", 2);
      return responseData;
    }
    let response1 = {
      //data为id
      data: 10,
      code:1,
      msg:"success"
      // senderId: 2,
      // createTime: time,
      // topic: "test",
    };
    return response1
  } catch (error) {
    console.error(error);
  }
}

// 删除会话
export async function deleteDialogue(dialogueId) {
  try {
    const response = await axios.delete(`${url}/dialogue/${dialogueId}`);
    //前端写的四数据
    let response1 = {
      //data为id
      data: null,
      code: 1,
      msg: "success",
    };
    let responseData = response.data;
    if (responseData.code === 1) {
      PopupMessage("删除会话成功", 1);
      return responseData;
    } else {
      PopupMessage("删除会话失败", 2);
      return responseData;
    }
  } catch (error) {
    console.error(error);
  }
}

// 修改会话
export async function updateDialogue(userData) {
  try {
    console.log(userData);
    const response = await axios.put(`${url}/dialogue/`, userData);
    // let response1 = {
    //   //data为id
    //   data: null,
    //   code:2,
    //   msg:"success"
    // };
    let responseData = response.data;
    if (responseData.code === 1) {
      PopupMessage("修改会话成功", 1);
      return responseData;
    } else {
      responseData("修改会话失败", 2);
      return responseData;
    }
  } catch (error) {
    console.error(error);
  }
}

// 获取用户的所有会话
export async function getUserDialogues() {
  try {
    var response_data;
    const response = await axios.get(`${url}/dialogue`);

    console.log(response);
    response_data = response.data;
    console.log(response_data);
    if (response_data.code === 1) {
      return response_data;
    } else {
      PopupMessage(response_data.msg, 2);
      return -1;
    }
    // let dataId = 19;
    // let data = [
    //   {
    //     senderID: 2,
    //     createTime: "2001-11-11",
    //     topic: "test",
    //     data: dataId,
    //     code: 1,
    //     msg: "success",
    //   },
    // ];
    // dataId += 1;
  } catch (error) {
    console.log(error);
  }
}
// https://366d-2409-8a28-4f6-f99e-88d7-d4c4-74de-894c.ngrok-free.app
// http://localhost:80
function delay1(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
// 用户发起问答
export async function createQA(qaData) {
  try {
    const response = await axios.post(`${url}/dialogue/qa`, qaData);
    let responseData = response.data;
    // if (responseData.code === 1) {
    //   return responseData;
    // } else {
    //   return response.msg;
    // }
    // console.log("aaa");
    // let qaId = 200;
    // let data = {
    //   data: {
    //     answer: "我喜欢玩原神我喜欢玩原神我喜欢玩原神我喜欢玩原神我喜欢玩原神",
    //     qaId: 200,
    //   },
    //   code: 1,
    //   msg: "success",
    // };
    // await delay1(2000);
    // qaId += 1;
    return responseData;
  } catch (error) {
    console.error(error);
    return { answer: "something wrong", qaId: "-1" };
  }
}

// 删除问答
export async function deleteQA(qaId) {
  try {
    const response = await axios.delete(`${url}/dialogue/qa/${qaId}`);
    response = JSON.parse(response);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// 修改问答
export async function updateQA(qaData) {
  try {
    const response = await axios.put(`${url}/dialogue/qa`, qaData);
    response = JSON.parse(response);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// 获取会话的所有问答记录
export async function getDialogueQAs(dialogueId) {
  try {
    // const response = await axios.get({

    const response = await axios.get(`${url}/dialogue/qa/${dialogueId}`);
    // 处理响应数据
    console.log(response);
    let responseData = response.data;
    if (responseData.code === 1) {
      return responseData;
    } else {
      return [];
    }
    // response = JSON.parse(response)
    // let response1 = {
    //   code: 1,
    //   data: [
    //     {
    //       id: 1,
    //       dialogueId: 9,
    //       question: "你玩原神嘛",
    //       answer: "myTopic",
    //     },
    //     {
    //       id: 10,
    //       dialogueId: 9,
    //       question: "你玩原神嘛",
    //       answer: "myTopic",
    //     },
    //     {
    //       id: 20,
    //       dialogueId: 9,
    //       question: "你玩原神嘛",
    //       answer: "myTopic",
    //     },
    //   ],
    //   msg: "success",
    // };
    // let response2 = {
    //   code: 1,
    //   data: null,
    //   msg: "无权限操作",
    // };
    // console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
// 获取用户所有订单
export async function getOrders() {
  try {
    // = await axios.get({

    const response = await axios.get(`${url}/record`);
    let responseData = response.data
    if (responseData.code === 1) {
      //       return response.data;
      //     } else {
      //       return [];
      //     }
    }
    let response1 = {
      code: 1,
      data: [
        {
          id: 12222,
          buyerId: 9,
          tradeId: "11111",
          state: 1,
          totalPay: "5.8",
          completeTime: "2023-05-30",
        },
        {
          id: 133,
          buyerId: 9,
          tradeId: "111112",
          state: 1,
          totalPay: "5.8",
          completeTime: "2023-05-30",
        },
        {
          id: 1444,
          buyerId: 9,
          tradeId: "111112",
          state: 1,
          totalPay: "9.8",
          completeTime: "2023-05-30",
        },
      ],
      msg: "success",
    };
    // let response2 = {
    //   code: 1,
    //   data: null,
    //   msg: "无权限操作",
    // };
    // console.log(response.data);
    return responseData;
  } catch (error) {
    console.error(error);
  }
}

export async function UserPay(PayMoney) {
  // axios
  //     .post(`${url}/pay/alipay/${PayMoney}`)
  //     .then((response) => {
  //       // 处理响应数据
  //       let responseData =response.data
  //       // console.log(responseData);
  //       if (responseData.code === 1) {
  //         console.log(responseData)
  //         let a = '<form name="punchout_form" method="post" action="https://openapi-sandbox.dl.alipaydev.com/gateway.do?charset=UTF8&method=alipay.trade.page.pay&sign=jFZEOyrJnLJA%2FRFl3j%2B%2BdzVOr%2B9YVk13V7NvDSjfTEE1Jaq23mGxHk6phTsc9bLo%2F%2FxeiMTTKxt9AynXNFjNJYVRjw6vwo9Oce6j52GWSWqpW8W5f5TlSRFA5WLE3VSIa8ZtibSXsh8VaS16LndoDQLy6pqtcWC7%2BEaPiIObq2rT6WALbWRBlRTdOxp4XkcW5xXM0842psIs6S1Okm6yTTXNrkWfJMFEVsO5%2BnnbiBM%2Febfn90W8kkgU2ktvA7Q8%2BTFM3irFh8LHZUYaCxbrGG%2B2u2aenDRIHM%2BB3iVwmMm2LbZ3KlYkjncj71x%2FNdJdfxHYXbPuq6glLrxQVHsscA%3D%3D&app_id=2021000122674055&sign_type=RSA2&timestamp=2023-06-13+14%3A39%3A07&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=json"> <input type="hidden" name="biz_content" value="{&quot;out_trade_no&quot;:&quot;20150320010101001&quot;,&quot;total_amount&quot;:&quot;88.88&quot;,&quot;subject&quot;:&quot;Iphone6 16G&quot;,&quot;product_code&quot;:&quot;FAST_INSTANT_TRADE_PAY&quot;}"> <input type="submit" value="立即支付" style="display:none" > </form> <script>document.forms[0].submit();</script>'
  //         return a;
  //         return response.data;
  //       } else {
  //         console.log(responseData)
  //         return [];
  //       }
  //     })
  //     .catch((error) => {
  //       // 处理错误
  //       console.error(error);
  //     });
  // let response = {
  //   code: 1,
  //   msg: "success",
  // };
  let a = '<form name="punchout_form" method="post" action="https://openapi-sandbox.dl.alipaydev.com/gateway.do?charset=UTF8&method=alipay.trade.page.pay&sign=jFZEOyrJnLJA%2FRFl3j%2B%2BdzVOr%2B9YVk13V7NvDSjfTEE1Jaq23mGxHk6phTsc9bLo%2F%2FxeiMTTKxt9AynXNFjNJYVRjw6vwo9Oce6j52GWSWqpW8W5f5TlSRFA5WLE3VSIa8ZtibSXsh8VaS16LndoDQLy6pqtcWC7%2BEaPiIObq2rT6WALbWRBlRTdOxp4XkcW5xXM0842psIs6S1Okm6yTTXNrkWfJMFEVsO5%2BnnbiBM%2Febfn90W8kkgU2ktvA7Q8%2BTFM3irFh8LHZUYaCxbrGG%2B2u2aenDRIHM%2BB3iVwmMm2LbZ3KlYkjncj71x%2FNdJdfxHYXbPuq6glLrxQVHsscA%3D%3D&app_id=2021000122674055&sign_type=RSA2&timestamp=2023-06-13+14%3A39%3A07&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=json"> <input type="hidden" name="biz_content" value="{&quot;out_trade_no&quot;:&quot;20150320010101001&quot;,&quot;total_amount&quot;:&quot;88.88&quot;,&quot;subject&quot;:&quot;Iphone6 16G&quot;,&quot;product_code&quot;:&quot;FAST_INSTANT_TRADE_PAY&quot;}"> <input type="submit" value="立即支付" style="display:none" > </form> <script>document.forms[0].submit();</script>'
  return a;
}

$("#open-dialog").click(()=>{
  test()
})
export async function getUserUsage() {
  try {
    // console.log(userData)
    const response = await axios.get(`${url}/users`,);
    let responseData = response.data;
    if (response.code === 1) {
      PopupMessage("获取用户用量成功", 1);
      return responseData;
    } else {
      PopupMessage("获取用户用量失败", 2);
      return responseData;
    }
  } catch (error) {
    console.error(error);
  }
}