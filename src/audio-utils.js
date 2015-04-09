var fs = require("fs");
var path = require("path");
var parse = require("./name-parser");

var AUDIO_PATH = path.resolve("public/audio", "../");

function toAudioInfo (fileName) {
	return {
		src: fileName,
		text: parse(fileName)
	};
}

function getData() {
	return fs.readdirSync(AUDIO_PATH)
		.map(toAudioInfo);
}

module.exports = {
	toAudioInfo: toAudioInfo,
	getData: getData,
}
