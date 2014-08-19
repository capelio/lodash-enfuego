var test = require('tape');
var _ = require('lodash');
_.mixin(require('../lib'));

test('hasPath', function (t) {
  var object = {
    str: 'bar',
    deep: {
      object: {
        str: 'bar'
      }
    }
  };

  t.true(_.hasPath(object, 'str'), 'Finds shallow property');
  t.false(_.hasPath(object, 'foo'), 'Cannot find non-existant shallow property');
  t.true(_.hasPath(object, 'deep.object.str'), 'Finds deep property');
  t.false(_.hasPath(object, 'deep.object.foo'), 'Cannot find non-existant deep property');
  t.end();
});

test('hasNumber', function (t) {
  var object = {
    str: 'foo',
    num: 10,
    deep: {
      object: {
        str: 'foo',
        num: 10
      }
    }
  };

  t.true(_.hasNumber(object, 'num'), 'Finds shallow number');
  t.false(_.hasNumber(object, 'str'), 'Finds and returns false for shallow string');
  t.false(_.hasNumber(object, 'foo'), 'Cannot find non-existant shallow number');
  t.true(_.hasNumber(object, 'deep.object.num'), 'Finds deep number');
  t.false(_.hasNumber(object, 'deep.object.str'), 'Finds and returns false for deep string');
  t.false(_.hasNumber(object, 'deep.object.foo'), 'Cannot find non-existant deep number');
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
