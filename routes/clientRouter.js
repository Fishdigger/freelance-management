const express = require("express");
const clientRouter = express.Router();
const service = require("../service/clientService.js");


clientRouter.get("/", (req, res) => {
    service.getAll().then((data) => {
        res.status(200).json(data);
    });
});

clientRouter.get("/:id", (req, res) => {
    let id = parseInt(req.params.id, 10);
    service.getOne({id: id}).then((data) => {
        res.json(data);
    });
});

//This guy's going to require a query string
//ex: /clients/byname?name=joel%20gregory
clientRouter.get("/byname", (req, res) => {
    service.getByName(req.query.name).then((data) => {
        res.json(data);
    });
});

clientRouter.post("/", (req, res) => {
    let errors = service.validateClient(req.body);
    if (errors.length > 0) {
        res.json(errors);
    }
    service.insert(req.body).then((err, result) => {
        if (err) res.json(err);
        else res.json("ok");
    });
});

clientRouter.delete("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    service.delete(id).then((err, result) => {
        if (err) res.json(err);
        else res.json("ok");
    })
});

clientRouter.put("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    service.update(req.body, id).then((err, result) => {
        if (err) res.json(err);
        else res.json("ok");
    });
});

module.exports = clientRouter;