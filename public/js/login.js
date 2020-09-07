$(document).ready(() => {
  console.log("login page connected");
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  loginForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email) {
      emailInput.val("");
      $(".login-alerts").text("Input a valid email address");
      setTimeout(fadeOut, 3000);
      function fadeOut() {
        $(".login-alerts").text("");
      }
      return;
    } else if (!userData.password) {
      emailInput.val("");
      $(".login-alerts").text("Input a valid pasword");
      setTimeout(fadeOut, 3000);
      function fadeOut() {
        $(".login-alerts").text("");
      }
      return;
    } else if (!userData.email + !userData.password) {
      emailInput.val("");
      passwordInput.val("");
      $(".login-alerts").text("Input a valid email and password");
      setTimeout(fadeOut, 3000);
      function fadeOut() {
        $(".login-alerts").text("");
      }
      return;
    }

    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  async function loginUser(email, password) {
    await $.post("/api/login", {
      email: email,
      password: password
    });
    window.location.replace("/jar");
    if (err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  }
});
