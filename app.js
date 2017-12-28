const express = require("express");
const router = require("./routes");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(router);

app.listen(port, () => {
    console.log("Running on port:", port);
});