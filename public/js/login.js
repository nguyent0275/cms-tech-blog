const loginFormHandler = async (event) => {
    event.preventDefault(event);
    console.log("logging in");
  
    const email = document.getElementById("email-login").value.trim();
    const password = document.getElementById("password-login").value.trim();
  
    // console.log(email, password)
  
    // login route from controller
    if (email && password) {
      const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to Login");
      }
    }
  };
  
  const signUpFormHandler = async (event) => {
    event.preventDefault(event);
  
    const username = document.getElementById("username-signup").value.trim();
    const email = document.getElementById("email-signup").value.trim();
    const password = document.getElementById("password-signup").value.trim();
    const confirmPassword = document
      .getElementById("confirm-password-signup")
      .value.trim();
  
    // signup route from controller
    if (!username) {
      alert("Please enter a valid username");
    } else if (!email) {
      alert("Please enter a valid email");
    } else if (!password) {
      alert("Please enter a valid password");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      const response = await fetch("/api/user/", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert((await response.json()).message);
        return;
      }
    }
  };
  
  // selects the button and adds the eventhandler
  document
    .querySelector(".login-form")
    .addEventListener("submit", loginFormHandler);
  
  document
    .querySelector(".signup-form")
    .addEventListener("submit", signUpFormHandler);
  