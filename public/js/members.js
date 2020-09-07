$(document).ready(() => {
  console.log("members connected");
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
});
