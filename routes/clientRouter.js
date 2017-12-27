const express = require("express");
const clientRouter = express.Router();
const service = require("../service/clientService.js");

clientRouter.get("/", (req, res) => {
    service.get({}).then((data) => {
        res.status(200).json(data);
    });
});

clientRouter.get("/:id", (req, res) => {
    res.send(`Getting client ${req.params.id}`);
});

module.exports = clientRouter;