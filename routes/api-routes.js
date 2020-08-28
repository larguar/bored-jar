// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // POST route for saving a new activity
  app.post("/api/add", function(req, res) {
    console.log("Activity: ");
    console.log(req.body);

    db.Activity.create({
      activity: req.body.activity,
      duration: req.body.duration
    });
    res.status(204).end();
  });

  // GET route for getting an activity
  app.get("/api/activities/:id", function(req, res) {
    // Find one Activity with the id in req.params.id and return activity to the user with res.json
    db.Activity.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbActivity) {
      res.json(dbActivity);
    });
  });

  // Find all Activities and return them to the user with res.json
  app.get("/api/activities", function(req, res) {
    db.Activity.findAll({}).then(function(dbActivity) {
      res.json(dbActivity);
    });
  });

  // PUT route for updating an Activity
  app.put("/api/activities", function(req, res) {
    db.Activity.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbActivity) {
        res.json(dbActivity);
      });
  });

  // Delete the Activity with the id available to us in req.params.id
  app.delete("/api/activities/:id", function(req, res) {
    db.Activity.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbActivity) {
      res.json(dbActivity);
    });
  });
  
};