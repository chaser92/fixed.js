global.VarArgs = function() { };

function Predicate() {

}

function empty() { };

function validateArgument(type, argument) {
	if (type.validateArgument)
		return type.validateArgument(type, argument);
	return validateSimpleType(type, argument) ||
		argument instanceof type;
}

function validateSimpleType(type, argument) {
	if (type === String)
		return typeof(argument) === 'string';
	if (type === Number)
		return typeof(argument) === 'number';
	if (type === Boolean)
		return typeof(argument) === 'boolean';
	return false;
}

function matchArguments(argTypes, args) {
	var wereVarArgs = false;
	for (var i=0; i<argTypes.length - 1; i++) {
		if (wereVarArgs)
			return false;
		if (argTypes[i] === VarArgs)
			wereVarArgs = true;
		if (!validateArgument(argTypes[i], args[i]))
			return false;
	}
	if (!wereVarArgs && args.length > argTypes.length - 1)
		return false; // too many args
	return true;
}

function fixedFunction() {
	var argTypes = arguments;
	var actualFunction = arguments[arguments.length - 1];
	return function() {
		if (!matchArguments(argTypes, arguments))
			throw new TypeError();
		return actualFunction.apply(this, arguments);
	};
}

function fixedOverloads() {
	var argOverloads = arguments;
	return function() {
		for (var i=0; i < argOverloads.length; i++) {
			if (matchArguments(argOverloads[i], arguments))
				return argOverloads[i][argOverloads[i].length - 1].apply(this, arguments);
		}
		throw new TypeError();
	}
}

function fixedObject() {

}

module.exports = function() {

	// no arguments? fixed does nothing...
	if (arguments.length == 0)
		return empty;

	// function? this shall be a contract!
	else if (arguments[0] instanceof Function)
		return fixedFunction.apply(this, arguments);

	else if (arguments[0] instanceof Array)
		return fixedOverloads.apply(this, arguments);

	// so maybe let's fix an object?
	return fixedObject.apply(this, arguments);
};

module.exports.createPredicate = function(predicate) {
	predicate.validateArgument = predicate;
	return pred;
}

module.exports.validateArgument = validateArgument;

global.Matching = require('./predicates');