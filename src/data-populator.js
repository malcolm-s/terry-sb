var db = require("./db.js");
var au =  require("./audio-utils.js")

function run () {
  db.save(au.getData());
}

run();
