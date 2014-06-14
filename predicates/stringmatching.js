var Fixed = require('../');

module.exports = Fixed(RegExp, function (regexp) {
	var f = function() { } 
	f.validateArgument = function(_, argument) {
		return typeof(argument) === 'string' &&
			regexp.test(argument);
	};
	return f;
});

