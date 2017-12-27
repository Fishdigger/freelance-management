const express = require("express");
const router = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(router);

app.listen(port, () => {
    console.log("Running on port:", port);
});