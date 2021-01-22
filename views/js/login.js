$(document).ready(() => {
  $(".login").on("submit", event => {
    event.preventDefault();

    // Getting references to our form and inputs
    const emailInput = $("#email-input")
      .val()
      .trim();
    const passwordInput = $("#password-input")
      .val()
      .trim();

    const userData = {
      email: emailInput,
      password: passwordInput
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/home");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  }
});