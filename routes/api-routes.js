const db = require("../models");

module.exports = app => {

  app.get("/api/jar", async (req, res) => {
    const dbJar = await db.Jar.findAll({});
    res.json(dbJar);
  });

  app.post("/api/jar", async (req, res) => {
    const dbJar = await db.Jar.create({
      woooo: req.body.woooo,
      secondcol: req.body.secondcol
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
    const dbJar = await db.Jar.update({
      woooo: req.body.woooo,
      secondcol: req.body.secondcol
    }, {
      where: {
        id: req.body.id
      }
    });
    res.json(dbJar);
  });
};
