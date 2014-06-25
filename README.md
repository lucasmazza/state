# state

**state** is a small library to manage an element state by adding/removing
CSS classes, while maintaining a single class on the element whenever you change
the state of the element.

## Setup

**TODO**.

## Usage

state adds a small API to every DOM element to add/remove states.

```js
var el = document.getElementById('container');
// Sets the 'state-default' class on the element.
el.setState('default');

// Sets the 'state-warning' class, and remove the 'state-default' class.
el.setState('warning');

// Sets the 'state-default' class back, removing the 'state-warning'.
el.setState('default');

// Removes all 'state-*' classes from the element.
el.clearState();
```

If monkeypatching is not of your taste, you can manage the state of the elements
with functions exported through the `State` object.

```js
var el = document.getElementById('container');

State.set(el, 'default');
State.set(el, 'warning');
State.set(el, 'default');
State.clear(el);
```

If you are using [jQuery](http://jquery.com/) to manipulate the DOM, the same native
API is available on jQuery objects.

```js
var el = $('#container');

el.setState('default');
el.setState('warning');
el.setState('default');
```

## License

Copyright (c) 2014 Lucas Mazza. See LICENSE file.
