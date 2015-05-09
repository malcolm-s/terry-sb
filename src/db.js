var fs = require("fs");

var DB_FILE_PATH = "db.json";

module.exports.save = function (data) {
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 4));
}

module.exports.load = function () {
  if (fs.existsSync(DB_FILE_PATH)) {
    var data = fs.readFileSync(DB_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } else {
    return {};
  }
}
