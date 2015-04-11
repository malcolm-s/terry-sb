function replace(target, pattern, replaceFunc) {
	var match = target.match(pattern);
	if (match) {
		return replaceFunc(match);
	} else {
		return target;
	}
}

function capitalise(name) {
	if (name[0])
		return name[0].toUpperCase() + name.substring(1);
	return name;
}

function fixApostrophes (name) {
	return name
		.replace("ouve", "ou've")
		.replace("ont", "on't")
		.replace("ant", "an't")
		.replace("im", "i'm")
		.replace("ive", "i've");
}

function hashTagNumbers (word) {
	if (parseInt(word)) {
		return "#" + word;
	} else {
		return word;
	}
}

module.exports = function parse(name) {
	var words = name
		.replace(".mp3", "")
		.split("-");

	return words
		.map(fixApostrophes)
		.map(hashTagNumbers)
		.map(capitalise)
		.join(" ");
}

//var replaceDictionary = [
//	{
//		key: "youve",
//		value: "you've"
//	},
//	{
//		key: "dont",
//		value: "don't"
//	},
//	{
//		key: "cant",
//		value: "can't"
//	},
//	{
//		key: "Cant",
//		value: "Can't"
//	},
//	{
//		key: "Dont",
//		value: "Don't"
//	}
//];
//
//[1,2,3,4,5,6,7,8,9].forEach(function(i) {
//	replaceDictionary.push({
//		key: i.toString(),
//	 	value: "#" + i
//	});
//});
