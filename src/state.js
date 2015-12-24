import Emitter from 'tiny-emitter';

const filter = Array.prototype.filter;

export default class State {
  constructor(element) {
    this.element = element;
    this.prefix = 'is-';
    this.emitter = new Emitter();
  }

  set(state) {
    this.clear();
    this.element.classList.add(`${this.prefix}${state}`);
    this.emitter.emit(`enter:${state}`);
  }

  get() {
    const state = this._getStates()[0];
    return state && state.replace(this._matcher(), '');
  }

  enter(states, callback) {
    states.split(' ').forEach((state) => this.emitter.on(`enter:${state}`, callback));
  }

  leave(states, callback) {
    states.split(' ').forEach((state) => this.emitter.on(`leave:${state}`, callback));
  }

  is(state) {
    return this.get() == state;
  }

  clear() {
    const state = this.get();

    if (state) {
      this.emitter.emit(`leave:${state}`);
      this.element.classList.remove(`${this.prefix}${state}`);
    }
  }

  _getStates() {
    const matcher = this._matcher();

    return filter.call(this.element.classList, (klass) => matcher.test(klass));
  }

  _matcher() {
    return new RegExp(`^${this.prefix}`);
  }
}
