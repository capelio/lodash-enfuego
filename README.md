# lodash-enfuego

Node.JS lodash mixins

# Usage

``` js
var _ = require('lodash');

_.mixin(require('lodash-enfuego'));
```

# Examples

```js
var user = {
  name: 'Joe Bob'
};

_.hasPath(user, 'name');    // true

var user = {
  name: 'Joe Bob',
  friends: {
    william: {
      hometown: 'New York City',
      age: 30
    }
  }
};

_.hasPath(user, 'friends.william');               // true
_.hasPath(user, 'friends.emily');                 // false
_.hasNumber(user, 'friends.william.age');         // true
_.hasNumber(user, 'friends.william.hometown');    // false
```
# API

## _.hasPath(object, 'path.to.property')

Returns `true` or `false`.

## .hasNumber(object, 'path.to.property')

Returns `true` or `false`.
