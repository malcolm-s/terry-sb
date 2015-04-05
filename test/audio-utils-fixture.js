var assert = require("assert");
var au = require("../audio-utils");

describe('audio-utils', function() {

	describe('toAudioInfo', function() {

		it('should create object with .text and .src', function() {
			var data = au.toAudioInfo("test");
			assert(data.text);
			assert(data.src);
		});

		it('should remove .mp3', function() {
			var data = au.toAudioInfo("test.mp3");
			assert.equal(data.text, "test");
		});

		it('should fix youve', function() {
			var data = au.toAudioInfo("youve");
			assert.equal(data.text, "you've");
		});

		it('should fix dont', function() {
			var data = au.toAudioInfo("dont");
			assert.equal(data.text, "don't");
		});

		it('should fix cant', function() {
			var data = au.toAudioInfo("cant");
			assert.equal(data.text, "can't");
		});

		it('should change 1 to #1', function() {			
			var data = au.toAudioInfo("test 1.mp3");
			assert.equal(data.text, "test #1");
		});

		it('should handle capitalisations', function() {
			var data = au.toAudioInfo("Dont.mp3");
			assert.equal(data.text, "Don't")
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