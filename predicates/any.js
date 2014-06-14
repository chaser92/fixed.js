var Fixed = require('../');

var any = function () {
	var args = arguments;
	var f = function() { };
	f.validateArgument = function(_, argument) {
		for (var tp in args) {
			if (Fixed.validateArgument(args[tp], argument))
				return true;
		}
		return false;
	};
	return f;
};

// if just Matching.Any is provided
any.validateArgument = function() { return true; }

module.exports = any;
