var assert = require("assert");
var db = require("../src/db");

describe('db', function() {

  describe('load', function() {

    beforeEach(function () {
      db.save({});
    });

    it('should return empty object if nothing saved', function() {
      assert.deepEqual(db.load(), {});
    });

    it('should return saved data', function() {
      db.save({test:"test"});
      assert.deepEqual(db.load(), {test:"test"});
    });

  });
  describe('save', function() {

    it('should take a data parameter', function() {
      db.save({test:"test"});
    });
  });
});
