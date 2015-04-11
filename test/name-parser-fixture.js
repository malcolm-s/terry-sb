var assert = require("assert");
var parse = require("../src/name-parser");

describe('name-parser', function() {

	describe('parse', function() {
		it("should capitalise every letter", function () {
			assert.equal(parse("test-me-please"), "Test Me Please");
		});

		it('should remove .mp3', function() {
			assert.equal(parse("test.mp3"), "Test");
		});

		it('should fix apostrophes', function() {
			assert.equal(parse("youve"), "You've");
			assert.equal(parse("dont"), "Don't");
			assert.equal(parse("cant"), "Can't");
			assert.equal(parse("im"), "I'm");
			assert.equal(parse("ive"), "I've");
		});

		it('should change 1 to #1', function() {
			assert.equal(parse("test-1.mp3"), "Test #1");
		});
	});
});
