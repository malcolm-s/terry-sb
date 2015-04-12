function replace(target, pattern, replaceFunc) {
	var match = target.match(pattern);
	if (match) {
		return replaceFunc(match);
	} else {
		return target;
	}
}

function nonEmpty (word) {
  return word.length > 0;
}

function toLower (word) {
  return word.toLowerCase();
}

function capitalise(name) {
		return name[0].toUpperCase() + name.substring(1);
}

function fixApostrophes (name) {
	return name
		.replace("havent", "haven't")
		.replace("ouve", "ou've")
		.replace("ont", "on't")
		.replace("ant", "an't")
		.replace(/^im/, "i'm")
		.replace(/^ive/, "i've");
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
		.filter(nonEmpty)
		.map(toLower)
		.map(fixApostrophes)
		.map(hashTagNumbers)
		.map(capitalise)
		.join(" ");
}
