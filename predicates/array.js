var Fixed = require('../');
var Custom = require('./custom');

module.exports = Fixed(Number, function (length) {
	return Custom(function (argument) {
		return argument instanceof Array &&
			argument.length === length;
	});
});
