const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = app => {
  app.get("/", (req, res) => {
    if (req.user) {
      res.redirect("/jar");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    if (req.user) {
      res.redirect("/jar");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/jar", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/jar.html"));
  });
};
