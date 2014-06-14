var mocha = require("mocha");
var assert = require("assert");
var Fixed = require('../');

describe('Fixed', function() {
	it('should allow (String, String) be executed with (String, String)', function(){
		assert.doesNotThrow(function() {
			Fixed(String, String, function() {})
			('a', 'b');
		});
	});

	it('should not allow (String, String) be executed with ()', function(){
		assert.throws(Fixed(String, String, function() {}), TypeError);
	});

	it ('should not allow (String, String) be executed with (String, Number)', function() {
		assert.throws(function() {
			Fixed(String, String, function() {})
			('a', 12);
		});
	});
});

