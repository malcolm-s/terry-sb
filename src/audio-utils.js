var fs = require("fs");

var AUDIO_PATH = __dirname + "../public/audio";

var replaceDictionary = [
	{
		key: "youve",
		value: "you've"
	},
	{
		key: "dont",
		value: "don't"
	},
	{
		key: "cant",
		value: "can't"
	},
	{
		key: "Dont",
		value: "Don't"
	},
	{
		key: /-/g,
		value: " "
	},
	{
		key: ".mp3",
		value: ""
	}
];

[1,2,3,4,5,6,7,8,9].forEach(function(i) {
	replaceDictionary.push({
		key: i.toString(),
	 	value: "#" + i
	});
});

function toAudioInfo (fileName) {
	var name = fileName;

	replaceDictionary.forEach(function(kv) {
		name = name.replace(kv.key, kv.value);
	});

	return {
		src: fileName,
		text: name
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
