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
		key: "Cant",
		value: "Can't"
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

module.exports = function parse(name) {
	replaceDictionary.forEach(function(kv) {
		name = name.replace(kv.key, kv.value);
	});

	return name;
}
