var Fixed = require('../');

module.exports = Fixed(Function, function (predicate) {
	var f = function() { } 
	f.validateArgument = function(_, argument) {
		return predicate(argument);
	};
	return f;
});