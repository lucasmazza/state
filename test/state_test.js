import State from '../src/state';

QUnit.module('State', {
  beforeEach: function() {
    this.element = document.createElement('div');
    this.element.classList.add('test-class');
    this.state = new State(this.element);
  }
});

QUnit.test('sets the state of the element', function(assert) {
  assert.equal(this.state.get(), undefined);
  this.state.set('loading');

  assert.equal(this.state.get(), 'loading');
  assert.equal(this.element.getAttribute('class'), 'test-class is-loading');
  assert.ok(this.state.is('loading'), `Expected state to be 'loading', but was ${this.state.get()}`);

  this.state.set('loaded');

  assert.equal(this.state.get(), 'loaded');
  assert.equal(this.element.getAttribute('class'), 'test-class is-loaded');
  assert.ok(this.state.is('loaded'), `Expected state to be 'loaded', but was ${this.state.get()}`);

  this.state.clear();
  assert.equal(this.state.get(), undefined);
  assert.equal(this.element.getAttribute('class'), 'test-class');
});

QUnit.test('triggers the callback when entering the given state', function(assert) {
  this.state.enter('loading', () => assert.ok(true));

  this.state.set('loading');
});

QUnit.test('triggers the callback when leaving the given state', function(assert) {
  this.state.set('loading');

  this.state.leave('loading', () => assert.ok(true));
  this.state.set('loaded');

  this.state.leave('loaded', () => assert.ok(true));
  this.state.clear();
  assert.expect(2);
});

QUnit.test('supports a custom prefix for the state classes', function(assert) {
  this.state.prefix = 'has-';
  this.state.set('failed');

  assert.equal(this.element.getAttribute('class'), 'test-class has-failed');
});
