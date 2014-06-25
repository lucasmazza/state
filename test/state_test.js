/*global QUnit:true,State:true*/
var setup = {
  setup: function() {
    this.element = document.createElement('div');
  }
};

QUnit.module('State#set', setup);

QUnit.test('it sets the state of an element through a class', function(assert) {
  State.set(this.element, 'loading');

  assert.haveClass(this.element, 'state-loading');
});

QUnit.test('it does not mantain multiple state classes at the same time', function(assert) {
  State.set(this.element, 'loading');
  State.set(this.element, 'done');

  assert.haveClass(this.element, 'state-done');
  assert.notHaveClass(this.element, 'state-loading');
});

QUnit.module('State#get', setup);

QUnit.test('gets the state of an element', function(assert) {
  State.set(this.element, 'loading');
  assert.equal(State.get(this.element), 'loading');
});

QUnit.module('State#clear', setup);

QUnit.test('it removes the class when clearing the state of the element', function(assert) {
  State.set(this.element, 'loading');
  assert.haveClass(this.element, 'state-loading');

  State.clear(this.element);
  assert.notHaveClass(this.element, 'state-loading');
});
