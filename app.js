var express	= require("express");
var path = require("path");
var db = require("./src/db");

var app 	= express();
var data = db.load();

// app environment
var isDev = process.env.NODE_ENV === "dev";

// config
app.set("port", (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, "public")));

// views
app.set("views", "./views");
app.set("view engine", "jade");

// routing
app.get("/", function (req, res) {
	res.redirect("/bollocks");
})

app.get("/bollocks", function (req, res) {
	res.render("index", {
		soundboard: data.soundboard,
		isDev: isDev
	});
});

var server = app.listen(app.get("port"), function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("App listening at http://%s:%s", host, port);
});
