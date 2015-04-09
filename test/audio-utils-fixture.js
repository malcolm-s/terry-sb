var assert = require("assert");
var au = require("../src/audio-utils");

describe('audio-utils', function() {

	describe('toAudioInfo', function() {

		it('should create object with .text and .src', function() {
			var data = au.toAudioInfo("test");
			assert(data.text);
			assert(data.src);
		});
	});

	describe('getData', function() {

		it('should return array of audio info', function() {
			var data =  au.getData();

			assert(data instanceof Array);

			if (data.length > 0) {
				var info = data[0];

				assert(info.text);
				assert(info.src);
			};
		});
	});
});
