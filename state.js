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

  Element.prototype.setState = function(state) {
    return State.set(this, state);
  };

  Element.prototype.clearState = function() {
    return State.clear(this);
  };
  root.State = State;
})(this);
