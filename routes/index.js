const routes = require("express").Router();
const clientRouter = require("./clientRouter.js");

routes.get("/", (req, res) => {
    res.send("Connected at root");
});

routes.use("/clients", clientRouter);

module.exports = routes;