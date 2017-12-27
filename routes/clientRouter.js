const express = require("express");
const clientRouter = express.Router();
const service = require("../service/clientService.js");


clientRouter.get("/", (req, res) => {
    service.getAll().then((data) => {
        res.status(200).json(data);
    });
});

clientRouter.get("/:name", (req, res) => {
    service.getByName(req.params.name).then((data) => {
        res.json(data);
    });
});

module.exports = clientRouter;