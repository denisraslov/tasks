var express = require('express'),
    app = express();

app.use(express.static(__dirname));

app.use(function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

module.exports = app;
