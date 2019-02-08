const path = require("path");
const json = require(path.join(__dirname, "db.json"));
const express = require("express");

// we fake the _search api
const PORT = 9200;

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get("/_search", function(req, res) {
    res.send(JSON.stringify(json));
});

app.post("/_search", function(req, res) {
    res.send(JSON.stringify(json));
});

app.listen(PORT, function() {
    console.log(
        `JSON Server is running mocking the elastic search api on port ${PORT}`
    );
});
