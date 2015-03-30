var fs = require("fs");

var audioPath = __dirname + "/public/audio";
var dataPath = __dirname + "/data/audio-data.json";

exports.generate = function () {
	function transform (file) {
		var name = file
			.replace(/-/g, " ")
			.replace(".mp3", "");

		return {
			src: file,
			text: name
		};
	}

	var audioFiles = fs.readdirSync(audioPath);
	var data = audioFiles.map(transform);

	fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));
}

exports.read = function () {
	return JSON.parse(fs.readFileSync(dataPath, "utf8"));
}