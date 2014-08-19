var test = require('tape');
var _ = require('lodash');
_.mixin(require('../lib'));

var fixture = {
  str: 'bar',
  num: 10,
  deep: {
    object: {
      str: 'bar',
      num: 10
    }
  }
};

test('hasPath', function (t) {
  t.true(_.hasPath(fixture, 'str'), 'Finds shallow property');
  t.false(_.hasPath(fixture, 'foo'), 'Cannot find non-existant shallow property');
  t.true(_.hasPath(fixture, 'deep.object.str'), 'Finds deep property');
  t.false(_.hasPath(fixture, 'deep.object.foo'), 'Cannot find non-existant deep property');
  t.end();
});

test('hasNumber', function (t) {
  t.true(_.hasNumber(fixture, 'num'), 'Finds shallow number');
  t.false(_.hasNumber(fixture, 'str'), 'Finds and returns false for shallow string');
  t.false(_.hasNumber(fixture, 'foo'), 'Cannot find non-existant shallow number');
  t.true(_.hasNumber(fixture, 'deep.object.num'), 'Finds deep number');
  t.false(_.hasNumber(fixture, 'deep.object.str'), 'Finds and returns false for deep string');
  t.false(_.hasNumber(fixture, 'deep.object.foo'), 'Cannot find non-existant deep number');
  t.end();
});

test('setPath', function (t) {
  t.test('empty object', function (tt) {
    var object = {};

    var expectation = {
      value: true
    };

    _.setPath(object, 'value', true);

    tt.deepEqual(object, expectation, 'Sets the value');
    tt.end();
  });

  t.test('shallow object', function (tt) {
    var object = {
      foo: 'bar'
    };

    var expectation = {
      foo: 'bar',
      value: true
    };

    _.setPath(object, 'value', true);

    tt.deepEqual(object, expectation, 'Sets the value');
    tt.end();
  });

  t.test('deep object', function (tt) {
    var object = {
      deep: {
        foo: 'bar'
      }
    };

    var expectation = {
      deep: {
        foo: 'bar'
      },
      another: {
        value: true
      }
    };

    _.setPath(object, 'another.value', true);

    tt.deepEqual(object, expectation, 'Sets the value');
    tt.end();
  });

  t.test('deep object with existing property', function (tt) {
    var object = {
      deep: {
        object: {
          foo: 'bar'
        }
      }
    };

    var expectation = {
      deep: {
        object: {
          foo: 'bar',
          value: true
        }
      }
    };

    _.setPath(object, 'deep.object.value', true);

    tt.deepEqual(object, expectation, 'Sets the value');
    tt.end();
  });

  t.test('shallow object without value', function (tt) {
    var object = {
      foo: 'bar'
    };

    var expectation = {
      foo: 'bar',
      value: null
    };

    _.setPath(object, 'value');

    tt.deepEqual(object, expectation, 'Sets a null value');
    tt.end();
  });
});
