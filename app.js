var express	= require("express");
var path	= require("path");
var data 	= require("./src/data.js");
var app 	= express();

// config

app.use(express.static(path.join(__dirname, "public")));

// views
app.set("views", "./views");
app.set("view engine", "jade");

// routing
app.get("/", function (req, res) {
	res.render("index", {
		soundboardItems: data.soundboardItems
	});
});

var server = app.listen(3001, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("App listening at http://%s:%s", host, port);
});