$(document).ready(() => {
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  async function signUpUser(email, password) {
    await $.post("/api/signup", {
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
