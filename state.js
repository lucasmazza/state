;(function(root) {
  var State = {};

  // Public: The prefix for the classes that will be treated as states.
  State.prefix = 'state-';

  // Public: Sets a state in an element, concatenating the state String with the
  // configured prefix at 'State.prefix'.
  //
  // element - A DOM element.
  // state   - A String.
  //
  // Returns the element.
  State.set = function(element, state) {
    State.clear(element);
    element.classList.add(State.prefix + state);

    return element;
  };

  // Public: Gets the state that the element is on, checking if any state class
  // is present on the element.
  //
  // element - A DOM element.
  //
  // Returns a String or undefined if the element is not in any state.
  State.get = function(element) {
    var states = State._getStates(element),
        state = states[0];

    if (state) {
      return state.replace(new RegExp('^' + State.prefix), '');
    }
  };

  // Public: Clears all the states in the element classList.
  // element - A DOM element.
  //
  // Returns the element.
  State.clear = function(element) {
    var states = State._getStates(element);
    for (var index = 0; index < states.length; index++) {
      element.classList.remove(states[index]);
    }

    return element;
  };

  // Internal: Gets all the classes on the supplied element that should be
  // treated as states in the element.
  //
  // Returns an Array.
  State._getStates = function(element) {
    var states = [],
        classes = element.classList,
        matcher = new RegExp('^' + State.prefix);

    for (var index = 0; index < classes.length; index++) {
      if(matcher.test(classes[index])) {
        states.push(classes[index]);
      }
    }
    return states;
  };

  if(root.Element) {
    Element.prototype.setState = function(state) {
      return State.set(this, state);
    };

    Element.prototype.getState = function() {
      return State.get(this);
    };

    Element.prototype.clearState = function() {
      return State.clear(this);
    };
  }

  if(root.jQuery) {
    root.jQuery.fn.setState = function(state) {
      return this.each(function() {
        State.set(this, state);
      });
    };

    root.jQuery.fn.getState = function() {
      return State.get(this.get(0));
    };

    root.jQuery.fn.clearState = function() {
      return this.each(function() {
        State.clear(this);
      });
    };
  }
  root.State = State;
})(this);
