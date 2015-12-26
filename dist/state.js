/*!
 * state.js v1.0.1
 * https://github.com/lucasmazza/state
 *
 * Licensed Apache 2.0 © Lucas Mazza
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.State = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function E () {
	// Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
	on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;

},{}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _tinyEmitter = require('tiny-emitter');

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

var filter = Array.prototype.filter;

var State = (function () {
  function State(element) {
    _classCallCheck(this, State);

    this.element = element;
    this.prefix = 'is-';
    this.emitter = new _tinyEmitter2['default']();
  }

  State.prototype.set = function set(state) {
    this.clear();
    this.element.classList.add('' + this.prefix + state);
    this.emitter.emit('enter:' + state);
  };

  State.prototype.get = function get() {
    var state = this._getStates()[0];
    return state && state.replace(this._matcher(), '');
  };

  State.prototype.enter = function enter(states, callback) {
    var _this = this;

    states.split(' ').forEach(function (state) {
      return _this.emitter.on('enter:' + state, callback);
    });
  };

  State.prototype.leave = function leave(states, callback) {
    var _this2 = this;

    states.split(' ').forEach(function (state) {
      return _this2.emitter.on('leave:' + state, callback);
    });
  };

  State.prototype.is = function is(state) {
    return this.get() == state;
  };

  State.prototype.clear = function clear() {
    var state = this.get();

    if (state) {
      this.emitter.emit('leave:' + state);
      this.element.classList.remove('' + this.prefix + state);
    }
  };

  State.prototype._getStates = function _getStates() {
    var matcher = this._matcher();

    return filter.call(this.element.classList, function (klass) {
      return matcher.test(klass);
    });
  };

  State.prototype._matcher = function _matcher() {
    return new RegExp('^' + this.prefix);
  };

  return State;
})();

exports['default'] = State;
module.exports = exports['default'];

},{"tiny-emitter":1}]},{},[2])(2)
});