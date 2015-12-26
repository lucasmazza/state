/*!
 * state v1.1.0
 * https://github.com/lucasmazza/state
 * 
 * Licensed Apache-2.0 © Lucas Mazza <lucastmazza@gmail.com>
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("state", [], factory);
	else if(typeof exports === 'object')
		exports["state"] = factory();
	else
		root["state"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _tinyEmitter = __webpack_require__(1);

	var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var filter = Array.prototype.filter;

	var State = (function () {
	  function State(element) {
	    _classCallCheck(this, State);

	    this.element = element;
	    this.prefix = 'is-';
	    this.emitter = new _tinyEmitter2.default();
	  }

	  _createClass(State, [{
	    key: 'set',
	    value: function set(state) {
	      this.clear();
	      this.element.classList.add('' + this.prefix + state);
	      this.emitter.emit('enter:' + state);
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      var state = this._getStates()[0];
	      return state && state.replace(this._matcher(), '');
	    }
	  }, {
	    key: 'enter',
	    value: function enter(states, callback) {
	      var _this = this;

	      states.split(' ').forEach(function (state) {
	        return _this.emitter.on('enter:' + state, callback);
	      });
	    }
	  }, {
	    key: 'leave',
	    value: function leave(states, callback) {
	      var _this2 = this;

	      states.split(' ').forEach(function (state) {
	        return _this2.emitter.on('leave:' + state, callback);
	      });
	    }
	  }, {
	    key: 'is',
	    value: function is(state) {
	      return this.get() == state;
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      var state = this.get();

	      if (state) {
	        this.emitter.emit('leave:' + state);
	        this.element.classList.remove('' + this.prefix + state);
	      }
	    }
	  }, {
	    key: '_getStates',
	    value: function _getStates() {
	      var matcher = this._matcher();

	      return filter.call(this.element.classList, function (klass) {
	        return matcher.test(klass);
	      });
	    }
	  }, {
	    key: '_matcher',
	    value: function _matcher() {
	      return new RegExp('^' + this.prefix);
	    }
	  }]);

	  return State;
	})();

	exports.default = State;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	function E() {
	  // Keep this empty so it's easier to inherit from
	  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
	}

	E.prototype = {
	  on: function on(name, callback, ctx) {
	    var e = this.e || (this.e = {});

	    (e[name] || (e[name] = [])).push({
	      fn: callback,
	      ctx: ctx
	    });

	    return this;
	  },

	  once: function once(name, callback, ctx) {
	    var self = this;
	    function listener() {
	      self.off(name, listener);
	      callback.apply(ctx, arguments);
	    };

	    listener._ = callback;
	    return this.on(name, listener, ctx);
	  },

	  emit: function emit(name) {
	    var data = [].slice.call(arguments, 1);
	    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
	    var i = 0;
	    var len = evtArr.length;

	    for (i; i < len; i++) {
	      evtArr[i].fn.apply(evtArr[i].ctx, data);
	    }

	    return this;
	  },

	  off: function off(name, callback) {
	    var e = this.e || (this.e = {});
	    var evts = e[name];
	    var liveEvents = [];

	    if (evts && callback) {
	      for (var i = 0, len = evts.length; i < len; i++) {
	        if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
	      }
	    }

	    // Remove event from queue to prevent memory leak
	    // Suggested by https://github.com/lazd
	    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

	    liveEvents.length ? e[name] = liveEvents : delete e[name];

	    return this;
	  }
	};

	module.exports = E;

/***/ }
/******/ ])
});
;