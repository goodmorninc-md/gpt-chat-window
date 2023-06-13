import { sendSMS, registerUser, UserLogin, 
     } from "./loginApi.js";
import './loginPage.css';

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');

// Show login form by default and hide register form
loginForm.classList.add('active');
registerForm.classList.remove('active');

// Add event listener to login link to show login form and hide register form
loginLink.addEventListener('click', function(e) {
  e.preventDefault();
  loginForm.classList.add('active');
  registerForm.classList.remove('active');
});

// Add event listener to register link to show register form and hide login form
registerLink.addEventListener('click', function(e) {
  e.preventDefault();
  loginForm.classList.remove('active');
  registerForm.classList.add('active');
});
const loginBtn = document.getElementById("loginBtn")
loginBtn.addEventListener("click",()=>{
    var username = document.getElementById("username_login").value
    var password = document.getElementById("password_login").value
    var userData = {
        username:username,
        password:password
    }
    console.log(userData)
    UserLogin(userData)
})

const registerBtn = document.getElementById("registerBtn")
registerBtn.addEventListener("click",()=>{
    let username = document.getElementById("username_register").value
    let password = document.getElementById("password_register").value
    let phoneNumber = document.getElementById("phone_register").value
    let verifyCode = document.getElementById("verifyCode").value
    
    var userData = {
        username:username,
        password:password,
        phone:phoneNumber,
        code:verifyCode
    }
    console.log(userData)
    registerUser(userData)
    
})

const verifyBtn = $("#VerifyCodeBtn")
verifyBtn.click(()=>{
    let phoneNumber = document.getElementById("phone_register").value
    sendSMS(phoneNumber)
})
