/*global QUnit:true*/
var setup = {
  setup: function() {
    this.element = document.createElement('div');
  }
};

QUnit.module('Element#setState', setup);

QUnit.test('it sets the state of an element through a class', function(assert) {
  this.element.setState('loading');

  assert.haveClass(this.element, 'state-loading');
});

QUnit.test('it does not mantain multiple state classes at the same time', function(assert) {
  this.element.setState('loading');
  this.element.setState('done');

  assert.haveClass(this.element, 'state-done');
  assert.notHaveClass(this.element, 'state-loading');
});

QUnit.module('Element#getState', setup);

QUnit.test('gets the state of an element', function(assert) {
  this.element.setState('loading');
  assert.equal(this.element.getState(), 'loading');
});

QUnit.module('Element#clearState', setup);

QUnit.test('it removes the class when clearing the state of the element', function(assert) {
  this.element.setState('loading');
  assert.haveClass(this.element, 'state-loading');

  this.element.clearState();
  assert.notHaveClass(this.element, 'state-loading');
});
