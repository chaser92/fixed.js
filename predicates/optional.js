var Fixed = require('../');

module.exports = Fixed(Function, function (type) {
	var f = function() { } 
	f.validateArgument = function(_, argument) {
		return argument === undefined || 
			argument === null || 
			Fixed.validateArgument(type, argument);
	};
	return f;
});