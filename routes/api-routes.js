const db = require("../models");
const passport = require("../config/passport");
const sequelize = require("sequelize");

module.exports = app => {
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  app.post("/api/signup", async (req, res) => {
    await db.User.create({
      email: req.body.email,
      password: req.body.password
    });
    res.redirect(307, "/api/login");
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/jar", async (req, res) => {
    const dbJar = await db.Jar.findAll({
      where: {
        UserId: req.user.id
      }
    });
    res.json(dbJar);
  });

  app.get("/api/jar/:Duration", async (req, res) => {
    const dbJar = await db.Jar.findAll({
      where: {
        UserId: req.user.id,
        Duration: req.params.Duration
      },
      order: sequelize.fn("RAND"),
      limit: 1
    });
    res.json(dbJar);
  });

  app.post("/api/jar", async (req, res) => {
    const dbJar = await db.Jar.create({
      ActivityName: req.body.ActivityName,
      Duration: req.body.Duration,
      UserId: req.user.id
    });
    res.json(dbJar);
  });

  app.delete("/api/jar/:id", async (req, res) => {
    const dbJar = await db.Jar.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json(dbJar);
  });

  app.put("/api/jar", async (req, res) => {
    const dbJar = await db.Jar.update(
      {
        ActivityName: req.body.ActivityName,
        Duration: req.body.Duration
      },
      {
        where: {
          id: req.body.id
        }
      }
    );
    res.json(dbJar);
  });
};
