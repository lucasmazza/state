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
// Sets the 'state-loading' class on the element.
el.setState('loading');

// Sets the 'state-done' class, and remove the 'state-loading' class.
el.setState('done');

// 'getState' returns the state of the element.
el.getState(); // 'done'.

// Sets the 'state-loading' class back, removing the 'state-done'.
el.setState('loading');

// Removes all 'state-*' classes from the element.
el.clearState();
```

If monkeypatching is not of your taste, you can manage the state of the elements
with functions exported through the `State` object.

```js
var el = document.getElementById('container');

State.set(el, 'loading');
State.set(el, 'done');
State.set(el, 'loading');
State.clear(el);
```

If you are using [jQuery](http://jquery.com/) to manipulate the DOM, the same native
API is available on jQuery objects.

```js
var el = $('#container');

el.setState('loading');
el.setState('done');
el.setState('loading');
```

## License

Copyright (c) 2014 Lucas Mazza. See LICENSE file.
