var mocha = require("mocha");
var assert = require("assert");
var Fixed = require('../');

describe('Overloads', function() {
	it('should use a (Number) overload', function() {
		var tester = Fixed([Number, function(x) { return x * 2; }],
						   [String, function(x) { return "OK"; }]);
		assert.equal(tester(2), 4);
		assert.equal(tester("ok?"), "OK");
		assert.throws(function() { tester(true); });
	});

	it('should deal with a (Number, Number) self-overload call', function() {
		var mul = Fixed(
			[Number, Number, function(x, y) { return x * y; }],
			[Number, function(x) { return mul(x, x); }]); 
		assert.equal(mul(2,3), 6);
		assert.equal(mul(2), 4);
	});
});
