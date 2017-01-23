# State

[![Greenkeeper badge](https://badges.greenkeeper.io/lucasmazza/state.svg)](https://greenkeeper.io/)

**state** is a small library to manage an element state by adding/removing
CSS classes, while maintaining a single class on the element whenever you change
the state of the element.

## Setup

```
bower install lucasmazza/state --save
```

Or you can [download a zip](https://github.com/lucasmazza/state/releases) file.

## Usage

state adds a small API to every DOM element to add/remove states.

```js
import State from 'state';

const el = document.getElementById('container');
const state = new State(el);

// Sets the 'is-loading' class on the element.
state.set('loading');
// Sets the 'is-done' class, and remove the 'is-loading' class.
state.set('done');

// 'State#get' returns the state of the element.
state.get(); // 'done'.

// Sets the 'is-loading' class back, removing the 'is-done'.
state.set('loading');

// Bind callbacks fore entering and leaving a specific state:
state.leave('loading', () => console.log('Not "loading" anymore.'));
state.enter('loaded', () => console.log('Loaded!'));

state.set('loaded');
// log will 'Not "loading" anymore.' and 'Loaded!'.

// Removes all 'is-*' classes from the element.
state.clear();
```

## License

Copyright (c) 2014 Lucas Mazza. See LICENSE file.
