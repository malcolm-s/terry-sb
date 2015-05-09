var fs = require("fs");
var path = require("path");
var parse = require("./name-parser");

var AUDIO_PATH = path.join(__dirname, '../') + "public/audio";

module.exports.toAudioInfo = function (fileName) {
	return {
		src: fileName,
		text: parse(fileName)
	};
}

module.exports.getData = function() {
	return fs.readdirSync(AUDIO_PATH)
		.map(module.exports.toAudioInfo);
}
