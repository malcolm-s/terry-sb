var assert = require("assert");
var parse = require("../src/name-parser");

describe('name-parser', function() {

	describe('parse', function() {
		it("should capitalise every letter", function () {
			assert.equal(parse("test-me-please"), "Test Me Please");
		});

		it('should remove .mp3', function() {
			assert.equal(parse("test.mp3"), "test");
		});

		it('should fix youve', function() {
			assert.equal(parse("you've"), "you've");
		});

		it('should fix dont', function() {
			assert.equal(parse("dont"), "don't");
		});

		it('should fix cant', function() {
			assert.equal(parse("cant"), "can't");
		});

		it('should change 1 to #1', function() {
			assert.equal(parse("test-1.mp3"), "test #1");
		});

		it('should handle capitalisations', function() {
			assert.equal(parse("Dont"), "Don't")
		});

		it('should handle capitalisations', function() {
			assert.equal(parse("Cant"), "Can't")
		});
	});
});
