const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = app => {
  app.get("/", (req, res) => {
    if (req.user) {
      res.redirect("/jar");
    }
    res.render(path.join(__dirname, "../views/signup"), {
      title: "Bored Jar | Log In"
    });
  });

  app.get("/login", (req, res) => {
    if (req.user) {
      res.redirect("/jar");
    }
    res.render(path.join(__dirname, "../views/login"), {
      title: "Bored Jar | Sign Up"
    });
  });

  app.get("/jar", isAuthenticated, (req, res) => {
    res.render(path.join(__dirname, "../views/jar"), {
      title: "Bored Jar"
    });
  });
};
