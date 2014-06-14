var Fixed = require('../');

module.exports = function () {
	var args = arguments;
	var f = function() { };
	f.validateArgument = function(_, argument) {
		for (var tp in args) {
			if (!Fixed.validateArgument(args[tp], argument))
				return false;
		}
		return true;
	};
	return f;
};
