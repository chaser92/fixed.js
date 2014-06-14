var Fixed = require('../');

module.exports = Fixed(Number, function (length) {
	var f = function() { } 
	f.validateArgument = function(_, argument) {
		return argument instanceof Array &&
			argument.length === length;
	};
	return f;
});
