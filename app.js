var express = require("express");
var app =  express();
var data =  require("./data.js");
// config

// views

app.set("views", "./views");
app.set("view engine", "jade");

// routing

app.get("/", function (req, res) {
	res.render("index", {
		title: "hey",
		message: "hello there!",
		items: data.items
	});
});

var server = app.listen(3001, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("App listening at http://%s:%s", host, port);
});