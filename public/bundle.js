/******/ (function(modules) { // webpackBootstrap
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$assign = __webpack_require__(2)['default'];

	var _interopRequireDefault = __webpack_require__(17)['default'];

	var _p5init = __webpack_require__(18);

	var _p5init2 = _interopRequireDefault(_p5init);

	var _componentsStream = __webpack_require__(20);

	var _componentsStream2 = _interopRequireDefault(_componentsStream);

	var gridSize = { x: 5, y: 1 };
	var timeSpeed = 0.1;
	var streams = new Array();
	var cellSize = 40;

	var p5functions = {
	    setup: function setup() {
	        createCanvas(window.innerWidth, window.innerHeight);
	        // frameRate(30);
	        var x = undefined,
	            y = undefined,
	            n = undefined,
	            radius = undefined;
	        for (var i = 0; i < gridSize.x; i++) {
	            x = i * cellSize;
	            for (var j = 0; j < gridSize.y; j++) {
	                y = j * cellSize;
	                streams.push(new _componentsStream2['default'](new p5.Vector(i, j), timeSpeed, new p5.Vector(x, y), new p5.Vector(x + width, y)));
	            }
	        }
	        translate(width / 2, height / 2);
	        // noLoop();
	        background(0);
	    },

	    draw: function draw() {
	        // for(let i = 0; i < 30; i++){
	        streams.forEach(function (stream) {
	            stream.update();
	            stream.draw();
	        });
	        // }
	    },

	    keyPressed: function keyPressed() {
	        if (keyCode === ENTER) {
	            save();
	        }
	    }

	};

	// set global functions for p5
	_Object$assign(window, p5functions);

	(0, _p5init2['default'])();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	module.exports = __webpack_require__(7).Object.assign;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(5);

	$def($def.S + $def.F, 'Object', {assign: __webpack_require__(8)});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , core      = __webpack_require__(7)
	  , PROTOTYPE = 'prototype';
	var ctx = function(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	};
	var $def = function(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {})[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && typeof target[key] != 'function')exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp[PROTOTYPE] = C[PROTOTYPE];
	    }(out);
	    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	module.exports = $def;

/***/ },
/* 6 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var UNDEFINED = 'undefined';
	var global = module.exports = typeof window != UNDEFINED && window.Math == Math
	  ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.1'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var toObject = __webpack_require__(9)
	  , IObject  = __webpack_require__(11)
	  , enumKeys = __webpack_require__(13)
	  , has      = __webpack_require__(15);

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(16)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){   // eslint-disable-line no-unused-vars
	  var T = toObject(target)
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = IObject(arguments[i++])
	      , keys   = enumKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(has(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(10);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// indexed object, fallback for non-array-like ES3 strings
	var cof = __webpack_require__(12);
	module.exports = 0 in Object('z') ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(14);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(17)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = init;

	var _fileP5 = __webpack_require__(19);

	var _fileP52 = _interopRequireDefault(_fileP5);

	function init() {
	    var p5Script = document.createElement('script');
	    p5Script.setAttribute('src', _fileP52['default']);
	    document.body.appendChild(p5Script);
	}

	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "9480b16002247e644ca9a3005cff5ea2.js";

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = __webpack_require__(21)["default"];

	var _classCallCheck = __webpack_require__(24)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var Stream = (function () {
	    function Stream(coord, timeSpeed, start, end) {
	        _classCallCheck(this, Stream);

	        this.coord = coord;
	        this.max = end;
	        this.pos = start;
	        this.step = new p5.Vector(1, 1);
	        this.time = 0;
	        this.timeSpeed = timeSpeed;
	        this.direction = new p5.Vector(1, 1);
	        this.fillColor = 255;
	        this.setRadius();
	        this.stepRange = { x: 2, y: 6 };
	    }

	    _createClass(Stream, [{
	        key: "setRadius",
	        value: function setRadius() {
	            var x = this.coord.x + this.time;
	            var y = this.coord.y + this.time;
	            this.opacity = map(noise(x, y), 0, 1, 255, 180);
	            var max = map(noise(x, y), 0, 1, 2, 16);
	            this.radius = map(noise(x, y), 0, 1, 2, max);
	        }
	    }, {
	        key: "draw",
	        value: function draw() {
	            noStroke();
	            fill(this.fillColor, this.opacity);
	            ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            if (this.pos.x > this.max.x) {
	                return;
	            }

	            this.time += this.timeSpeed;
	            var angle1 = noise(this.pos.x, this.pos.y);
	            var angle2 = noise(angle1 * 10, angle1 * 4);
	            var angle = map(angle2, 0, 1, -180, 180);
	            var movement = new p5.Vector(cos(angle) * this.step.x, sin(angle) * this.step.y);
	            // this.pos.rotate(map(angle, 0, 1, 0, 360));
	            this.pos.add(movement);

	            this.step.x = map(noise(this.coord.x + this.time), 0, 1, this.stepRange.x, this.stepRange.y);
	            this.step.y = map(noise(this.coord.y + this.time), 0, 1, this.stepRange.x, this.stepRange.y);
	            this.setRadius();
	        }
	    }]);

	    return Stream;
	})();

	exports["default"] = Stream;
	module.exports = exports["default"];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(22)["default"];

	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;

	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(23), __esModule: true };

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(14);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ }
/******/ ]);