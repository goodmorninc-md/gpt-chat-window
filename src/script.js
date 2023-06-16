import "./loginPage.css";
import "./styles.css";
import qr_code from "./qr_c.jpg";
import copyImg from "./copy.png";
import chatbotAvatar from "./chatbot-avatar.jpg";
import userAvatar from "./user-avatar.jpg";
import {
  createQA,
  deleteQA,
  updateQA,
  updateDialogue,
  deleteDialogue,
  getDialogueQAs,
} from "./requireApi.js";

import goodPng from "./good.png";
import badPng from "./bad.png";
import menu from "./menu.png";
import load from "./loading.gif";
import { reject } from "lodash";
const user_avatar1 = document.getElementById("user_avatar1");
const user_avatar2 = document.getElementById("user_avatar2");
const chat_avatar1 = document.getElementById("chat_avatar1");
const user_photo = document.getElementById("userPhoto");
const GapTop = document.getElementById("gapTop");
const chatLog = document.querySelector(".chat-log");
const chatInput = document.querySelector(".chat-input input");
const chatForm = document.querySelector(".chat-input button");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatHistory = document.getElementById("chat-history");
const bottomGap = document.getElementById("bottomGap");
const botMessage1 = document.getElementById("test");
botMessage1.setAttribute("src", load);
user_photo.setAttribute("src", userAvatar);
user_avatar1.setAttribute("src", userAvatar);
user_avatar2.setAttribute("src", userAvatar);
chat_avatar1.setAttribute("src", chatbotAvatar);

let button = $("#editButton_2");
let yesButton =
  '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">' +
  '<polyline points="20 6 9 17 4 12"></polyline>' +
  "</svg>";
let noButton =
  '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">' +
  '<line x1="18" y1="6" x2="6" y2="18"></line>' +
  '<line x1="6" y1="6" x2="18" y2="18"></line></svg>';
let editButton =
  ' <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>' +
  "</svg>";
let deleteButton =
  '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">' +
  '<polyline points="3 6 5 6 21 6"></polyline>' +
  '<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>' +
  '<line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>' +
  "</svg>";
var shapeArr = [yesButton, noButton, editButton, deleteButton];
//聊天窗口添加用户的消息
export async function addUserMessage(message) {
  return new Promise((resolve, reject) => {
    //没有输入消息，不发送请求
    if (message.length == 0) {
      return;
    }
    //新创建消息盒子
    const messageContainer = document.createElement("div");
    messageContainer.className = "message user-message";
    //创建头像
    const avatar = document.createElement("img");
    avatar.src = userAvatar;
    avatar.alt = "User Avatar";
    avatar.className = "avatar";
    messageContainer.appendChild(avatar);
    //创建消息
    const text = document.createElement("div");
    text.className = "text";
    text.textContent = message;
    messageContainer.appendChild(text);
    // console.log(chatHistory, messageContainer);
    //在聊天记录中中加入用户消息
    chatHistory.append(messageContainer);
    resolve();
  });
}
export async function addChatbotLoadingImg(newMessageId) {
  return new Promise((resolve, reject) => {
    //新创建消息盒子
    const messageContainer = document.createElement("div");
    messageContainer.className = "message chatbot-message";
    messageContainer.id = `messageContainer${newMessageId}`;
    //创建头像
    const avatar = document.createElement("img");
    avatar.src = chatbotAvatar;
    avatar.alt = "Chatbot Avatar";
    avatar.className = "avatar";
    avatar.id = "chatBot" + newMessageId;
    messageContainer.appendChild(avatar);
    //创建消息
    const text = document.createElement("div");
    text.className = "text";
    text.id = `botMessage${newMessageId}`;
    const loadingImg = document.createElement("img");
    loadingImg.src = load;
    loadingImg.alt = "User Avatar";
    loadingImg.className = "avatar";
    text.appendChild(loadingImg);
    messageContainer.appendChild(text);
    chatHistory.append(messageContainer);
    resolve();
  });
}
let botMessage = 1;
//添加chatgpt的消息
export async function addChatbotMessage(message, newMessageId, newMessageFlag) {
  //后端返回的消息
  //正在发送消息
  return new Promise((resolve, reject) => {
    if (newMessageFlag === 2) {
      //删除加载图片div
      let hideText = $(`#botMessage-100`);
      hideText.remove();
      const messageContainer = $(`#messageContainer-100`);
      messageContainer.attr("id", `messageContainer${newMessageId}`);
      let text = $("<div></div>")
        .addClass("text")
        .attr("id", `botMessage${newMessageId}`)
        .text("");
      // const text = $(`#botMessage${newMessageId}`);
      text.text(message);
      messageContainer.append(text);
      resolve([messageContainer["0"], text]);
    } else {
      //直接加载后端返回的所有聊天记录
      const messageContainer = $("<div></div>")
        .addClass("message chatbot-message")
        .attr("id", `messageContainer${newMessageId}`);
      const avatar = $("<img>")
        .attr({
          src: chatbotAvatar,
          alt: "Chatbot Avatar",
        })
        .addClass("avatar");
      messageContainer.append(avatar);
      const text = $("<div></div>")
        .addClass("text")
        .attr("id", `botMessage${newMessageId}`)
        .text("");
      messageContainer.append(text);
      resolve([messageContainer["0"], text]);
    }
  }).then((data) => {
    const messageContainer = data[0];
    const text = data[1];
    const imgs = [copyImg, goodPng, badPng];
    const comment_plugin = $("<div></div>").addClass("comment-plugin");
    for (let i = 0; i < 3; i++) {
      const button1 = $("<button></button>").addClass("comment-plugin-div");
      const img1 = $("<img>").addClass("chat-message-bot").attr({
        src: imgs[i],
        alt: "Chatbot Avatar",
      });
      button1.append(img1);
      comment_plugin.append(button1);
    }
    //这里["0"]需要研究下
    messageContainer.append(comment_plugin["0"]);
    chatHistory.append(messageContainer);
    const delay = 100;
    displayTextOneCharAtATime(message, text, delay);
  });
}

//发起问答
//向后端发消息
//给发送问题添加回车事件
window.onload = ()=>{
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
}

function displayTextOneCharAtATime(text, element, delay) {
  let i = 0;
  const intervalId = setInterval(() => {
    $(element).text(function (_, oldText) {
      return oldText + text.charAt(i);
    });
    i++;
    if (i >= text.length) {
      clearInterval(intervalId);
    }
  }, delay);
}
function getPromise(promiseObject) {
  let result;
  promiseObject.then((data) => {
    result = data;
  });
  return result;
}
//向后端发请求
export function newChatGPTMessage(message) {
  let messageContainer = addChatbotMessage("nothing", -1);
  $.ajax({
    url: "http://127.0.0.1:80/",
    type: "GET",
    dataType: "text",
    contentType: "application/json;charset=utf-8",
    // dataType: 'JSON',
    data: {
      message: message,
    },
    success: function (response) {
      response = JSON.parse(response);
      addChatbotMessage(response.data, 2);
      // return message
    },
    error: function (err, xhr, errorType) {
      // test = "123"
      addChatbotMessage("something wrong", 3);
      console.log(err);
    },
  });
}
let chatCount = 4; // assuming there are already 3 chats
export function createDialogueInPage(response) {
  //response为数据包括
  // {
  //   code:  code就是id
  //   time
  //  msg
  //   topic
  // }
  // console.log(response);
  let time = new Date();
  time = time.toJSON().split("T")[0];
  let id = response.id;
  // console.log(data);
  let newChatName = response.topic;
  var createTime = time;
  let lieditButton =
    `<button class="edit-chat-btn" id="${"editButton_" + (id * 2 - 1)}">` +
    '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>' +
    "</svg>" +
    "</button>";
  let lideleteButton =
    `<button class="edit-chat-btn" id="${"editButton_" + id * 2}">` +
    '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">' +
    '<polyline points="3 6 5 6 21 6"></polyline>' +
    '<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>' +
    '<line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>' +
    "</svg>" +
    "</button>";
  let newChatItem = `<li id="dialogue_${id}">
    <div class="date-time">${createTime}</div>
    <div class="chat-select-div">
      <button id="chat${id}" class = "newChatButton">${newChatName}</button>
      ${lieditButton}${lideleteButton}
    </div>
  </li>`;
  //向页面渲染元素
  $("#dialogue-list").append(newChatItem);
  // 给每个按键绑定事件，先获取每个元素，在对其绑定
  let buttonId = 2 * id; //删除按键的id
  let editButtonId = buttonId - 1;
  let liDeleteButton = $("#editButton_" + buttonId);
  let liEditButton = $("#editButton_" + editButtonId);
  let chooseDialogueBtn = $("#chat" + id);
  chooseDialogueBtn.click(() => {
    clearChatHistory(id);
  });
  //给两个按键绑定对应的修改和删除事件
  liDeleteButton.click(() => {
    //给删除按键和修改聊天按键绑定更换图标和确认删除事件
    //判断是否是删除按键
    deleteDialogueInPage(id);
    console.log("绑定删除成功");
  });
  liEditButton.click(() => {
    editDialogueNameInPage(id);
    console.log("绑定编辑成功");
  });
}
//选择其他的聊天窗口
var current_chat;
export async function loadAllChatMessages(allChat, index) {
  try {
    // console.log(allChat, index);
    // 递归终止条件
    if (index >= allChat.length) {
      return;
    }

    const element = allChat[index];
    await addUserMessage(element.question);
    await addChatbotMessage(element.answer, element.id, 3);

    // 递归调用自身，增加 index 参数以控制聊天记录加载顺序
    await loadAllChatMessages(allChat, index + 1);
  } catch (error) {
    console.error(error);
  }
}
//选择其他窗口后将当前聊天窗口中的内容清空
export function clearChatHistory(i) {
  console.log("clearChatHistory", i);
  if (i === current_chat) {
    return "已经是当前窗口";
  } else {
    chatHistory.innerHTML = "";
    current_chat = i;
    let responseData = getDialogueQAs(i);
    responseData.then(async (allChat) => {
      loadAllChatMessages(allChat.data, 0);
    });
  }
}

//展示该用户所有的会话信息
export function showAllChat(dialogueData) {
  current_chat = dialogueData[0].id;
  dialogueData.forEach((element) => {
    createDialogueInPage(element);
  });
}

// const qrcode_pay = document.getElementById("qrPay");
// qrcode_pay.setAttribute("src", qr_code);

const topbarContent = $("#topbarContent");
const toggleButton = $("#toggle-button");
const topbar = $("#chat-select");

// 在手机端自动隐藏侧边栏
function hideSidebarOnMobile() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 768) {
    toggleButton.removeClass("hidden");
    GapTop.classList.remove("hidden");
    topbarContent.addClass("topbar-content");
    // 禁用顶部栏按钮的点击事件
    topbarContent.find("button").prop("disabled", true);
    toggleButton.on("click", function () {
      if (!topbar.hasClass("open")) {
        topbar.addClass("open");
      } else {
        topbar.removeClass("open");
      }

      if (topbar.hasClass("open")) {
        topbarContent.find("button").prop("disabled", false);
      } else {
        topbarContent.find("button").prop("disabled", true);
      }
    });
  } else {
    toggleButton.addClass("hidden");
    GapTop.classList.add("hidden");
    topbarContent.removeClass("topbar-content");
  }
}

// 监听窗口大小改变事件
window.addEventListener("resize", hideSidebarOnMobile);

// 页面加载时初始化侧边栏状态
hideSidebarOnMobile();
function changeShape(liDeleteButton, liEditButton, changeFlag, originValue) {
  if (changeFlag === 0) {
    liDeleteButton.html(shapeArr[1]);
    liEditButton.html(yesButton);
    //editbutton功能为确认删除
    liEditButton.off("click").on("click", () => {
      let deleteDialogueId = parseInt(liDeleteButton[0].id.split("_")[1]) / 2;
      console.log("deleteDialogueId:", deleteDialogueId);
      //向后端发删除请求
      let response = deleteDialogue(deleteDialogueId);
      response.then((responseData) => {
        if (responseData.code === 1) {
          //点击删除按键
          liDeleteButton.html(shapeArr[1]);
          liEditButton.html(yesButton);
          //点击取消否按键
          $("#dialogue_" + deleteDialogueId).remove();
          // createDialogueInPage(responseData);
        } else {
          liEditButton.html(shapeArr[2]);
          liDeleteButton.html(shapeArr[3]);
          //修改完后则两个按键都换回之前的功能
          changeShape(liDeleteButton, liEditButton, -1, "editTopic");
        }
      });
    });
    //这时候liDeleteButton的功能就为取消删除，，功能改为重新删除
    liDeleteButton.off("click").on("click", () => {
      //将其功能改为换回原来形状
      liDeleteButton.html(shapeArr[3]);
      liEditButton.html(shapeArr[2]);
      changeShape(liDeleteButton, liEditButton, -1, "");
    });
    // changeShape(liDeleteButton, liEditButton, -1, "");
  } else if (changeFlag === 1) {
    //修改会话主题
    //换成勾叉形状
    let EditInputId = (parseInt(liEditButton[0].id.split("_")[1]) + 1) / 2;
    var dialogueButton = $("#chat" + EditInputId);
    let input = $("#input" + EditInputId);
    var oldTopic = originValue;
    new Promise((resolve, reject) => {
      liDeleteButton.html(shapeArr[1]);
      liEditButton.html(yesButton);
      resolve();
    }).then(() => {
      //修改完了，将编辑按键的功能修改为“确认修改按键”
      liEditButton.off("click").on("click", () => {
        //获取修改的对话id
        let input = $("#input" + EditInputId);
        let newTopic = input[0].value;

        //新主题长度为0
        if (newTopic.length <= 0) {
          dialogueButton.text(oldTopic);
          dialogueButton.show();
          input.remove();
          liEditButton.html(shapeArr[2]);
          liDeleteButton.html(shapeArr[3]);
          //修改完后则两个按键都换回之前的功能
          changeShape(liDeleteButton, liEditButton, -1, "editTopic");
          return false;
        } else {
          //发起修改请求
          //获取当前时间
          let time = new Date();
          time = time.toJSON().split("T")[0];
          let userData = {
            id: EditInputId,
            createTime: time,
            topic: newTopic,
          };
          let response = updateDialogue(userData);

          response.then((responseData) => {
            if (responseData.code === 1) {
              //改回删除和编辑按键
              liEditButton.html(shapeArr[2]);
              liDeleteButton.html(shapeArr[3]);

              input.remove();

              dialogueButton.text(newTopic);
              dialogueButton.show();
            } else {
              console.log("edit dialogue wrong");
              dialogueButton.text(oldTopic);
              dialogueButton.show();
              input.remove();
              liEditButton.html(shapeArr[2]);
              liDeleteButton.html(shapeArr[3]);
              //修改完后则两个按键都换回之前的功能
              changeShape(liDeleteButton, liEditButton, -1, "editTopic");
            }
          });
        }

        //修改完后则两个按键都换回之前的功能
        changeShape(liDeleteButton, liEditButton, -1, "editTopic");
      });
      //将delete按键修改为取消修改按键
      liDeleteButton.off("click").on("click", () => {
        dialogueButton.text(oldTopic);
        dialogueButton.show();
        input.remove();
        liEditButton.html(shapeArr[2]);
        liDeleteButton.html(shapeArr[3]);
        changeShape(liDeleteButton, liEditButton, -1, "editTopic");
      });
    });
  } else if (changeFlag === -1) {
    //将其功能改为换回原来形状
    liDeleteButton.html(shapeArr[3]);
    liEditButton.html(shapeArr[2]);
    //点击取消否按键
    //这时候liDeleteButton的功能就为取消修改，将其功能改为换回原来形状，功能改为删除
    let id = (parseInt(liEditButton[0].id.split("_")[1]) + 1) / 2;
    liDeleteButton.off("click").on("click", () => {
      deleteDialogueInPage(id);
    });
    //liEditButton的功能就为删除该dialogue
    liEditButton.off("click").on("click", () => {
      console.log("liEditButton:", id);
      editDialogueNameInPage(id);
    });
  }
}
export function deleteDialogueInPage(dialogueId) {
  //获取元素，并执行对应操作
  let liDeleteButton = $("#editButton_" + dialogueId * 2);
  let liEditButton = $("#editButton_" + (dialogueId * 2 - 1));
  changeShape(liDeleteButton, liEditButton, 0, "");
}

export function editDialogueNameInPage(dialogueId) {
  //获取元素，并执行对应操作
  var dialogueButton = $("#chat" + dialogueId);
  let originValue = dialogueButton.html();
  console.log("origin", originValue);
  var editButton = $("#editButton_" + (dialogueId * 2 - 1));
  var $input = $(
    `<input type="text" id = "input${dialogueId}" class = "newChatButton" placeholder="${dialogueButton.html()}">`
  );
  dialogueButton.hide();
  $input.insertBefore(editButton);
  let liDeleteButton = $("#editButton_" + dialogueId * 2);
  let liEditButton = $("#editButton_" + (dialogueId * 2 - 1));

  changeShape(liDeleteButton, liEditButton, 1, originValue);
}
//选择发送的金额
const PayButton = $("#PostNewPayBtn");

$(document).ready(function () {
  var $inputBox = $("#inputMoney");
  $inputBox.on("focus", function () {
    $inputBox.on("input", function () {
      PayButton.text("您选择的是" + $inputBox.val());
    });
  });
  $inputBox.on("blur", function () {
    $inputBox.off("input");
  });
  $(".pay-plugin-price-list-outside>div").on("click", function () {
    console.log(this.childNodes[1]); //.value
    if (this.childNodes[1].nodeName === "DIV") {
      var selectedValue = this.childNodes[1].innerText;
      PayButton.text("您选择的是" + selectedValue);
    }
  });
});
