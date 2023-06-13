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
// import test from "./script.js"