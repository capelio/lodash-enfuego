var _ = require('lodash');

module.exports = {};

var hasPath = module.exports.hasPath = function (object, path) {
  return path.split('.').every(function (property) {
    if (!_.isObject(object)) return false;

    if (!Object.prototype.hasOwnProperty.call(object, property)) return false;

    object = object[property];
    return true;
  });
};

var hasNumber = module.exports.hasNumber = function (object, path) {
  if (!hasPath(object, path)) return false;

  var reference = object;
  path.split('.').forEach(function (property) {
    reference = reference[property];
  });

  return _.isNumber(reference);
};
