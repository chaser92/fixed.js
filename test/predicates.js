var mocha = require("mocha");
var assert = require("assert");
var Fixed = require('../');

describe('Predicates: Array', function() {
	it ('should allow (Array[4]) be executed with (Array[4])', function() {
		assert.doesNotThrow(function() {
			Fixed(Matching.Array(4), function(tuple) { })
			([1,2,3,4]);
		});
	});

	it ('should not allow (Array[4]) be executed with (Array[3])', function() {
		assert.throws(function() {
			Fixed(Matching.Array(3), function(tuple) { })
			([1,2,3,4]);
		});
	});
});

describe('Predicates: Any', function() {
	it ('should allow (Any(String, Number)) be executed with (String) or (Number)', function() {
		assert.doesNotThrow(function() {
			Fixed(Matching.Any(String, Number), function(val) { })
			('abc');
			Fixed(Matching.Any(String, Number), function(val) { })
			(123);
		});
	});

	it ('should not allow (Any(String, Number)) be executed with (Boolean)', function() {
		assert.throws(function() {
			Fixed(Matching.Any(String, Number), function(val) { })
			(false);
		});
	});

	it ('should allow really anything', function() {
		assert.doesNotThrow(Fixed(Matching.Any), function() { });
	});
});

describe('Predicates: Custom', function() {
	it ('should allow (Custom) be executed with Number modulo 2', function() {
		assert.doesNotThrow(function() {
			Fixed(Matching.Custom(function(v) { return v % 2 === 0; }), function(val) { })
			(2);
			Fixed(Matching.Custom(function(v) { return v % 2 === 0; }), function(val) { })
			(8);
		});
	});
});

