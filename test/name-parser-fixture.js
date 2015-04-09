var assert = require("assert");
var parse = require("../src/name-parser");

describe('name-parser', function() {

	describe('parse', function() {
		it('should remove .mp3', function() {
      
			assert.equal(parse("test.mp3"), "test");
		});

		it('should fix youve', function() {
			assert.equal(parse("test.mp3"), "you've");
		});

		it('should fix dont', function() {
			assert.equal(parse("test.mp3"), "don't");
		});

		it('should fix cant', function() {
			var data = au.toAudioInfo("cant");
			assert.equal(parse("test.mp3"), "can't");
		});

		it('should change 1 to #1', function() {
			assert.equal(parse("test.mp3"), "test #1");
		});

		it('should handle capitalisations', function() {
			assert.equal(parse("test.mp3"), "Don't")
		});
	});
});
