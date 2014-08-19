var _ = require('lodash');

module.exports = {};

var hasPath = module.exports.hasPath = function (object, path) {
  if (!_.isObject(object)) return false;

  return path.split('.').every(function (property) {
    if (!_.isObject(object)) return false;

    if (!Object.prototype.hasOwnProperty.call(object, property)) return false;

    object = object[property];
    return true;
  });
};

var hasNumber = module.exports.hasNumber = function (object, path) {
  if (!_.isObject(object)) return false;

  if (!hasPath(object, path)) return false;

  var reference = object;
  path.split('.').forEach(function (property) {
    reference = reference[property];
  });

  return _.isNumber(reference);
};

var setPath = module.exports.setPath = function (object, path, value) {
  if (!_.isObject(object)) return false;

  var properties = path.split('.');
  properties.forEach(function (property, index) {
    if (index === properties.length - 1) {
      return object[property] = value || null;
    }

    if (!_.isObject(object[property])) object[property] = {};
    object = object[property];
  });

  return true;
};
