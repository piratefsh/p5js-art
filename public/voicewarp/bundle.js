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

	__webpack_require__(18);

	__webpack_require__(19);

	var _p5init = __webpack_require__(23);

	var _p5init2 = _interopRequireDefault(_p5init);

	var pVectorArr = [];
	var formResolution = 10;
	var startRadius = 90;
	// this is where center is.
	var centerX = window.innerWidth / 2;
	var centerY = window.innerHeight / 2;
	var mic = undefined;
	var prevIntensity = 0;
	var currPos = undefined;
	var p5functions = {
	    preload: function preload() {},

	    setup: function setup() {
	        p5functions.reset();
	        frameRate(24);
	        document.getElementById('btn-reset').addEventListener('click', function () {
	            p5functions.reset();
	        });

	        mic = new p5.AudioIn();
	        mic.start();
	    },

	    reset: function reset() {
	        createCanvas(window.innerWidth, window.innerHeight);
	        stroke(0);
	        background(2);
	        p5functions.init();
	        currPos = createVector(0, height / 2);
	    },

	    init: function init() {
	        startRadius = random(30, 90);
	        pVectorArr = [];
	        // for loop to save positions of circles in an array

	        // what is the angle of where 1 of the object would be placed at?
	        var angle = radians(360 / formResolution);

	        for (var i = 0; i < formResolution; i++) {
	            var tmpX = cos(angle * i) * startRadius;
	            var tmpY = sin(angle * i) * startRadius;
	            //const tmpX = random(10,-10)+cos(angle*i) *startRadius;
	            //const tmpY = random(10,-10)+sin(angle*i) *startRadius;
	            var pv = createVector(tmpX, tmpY);
	            pVectorArr.push(pv);
	        };
	    },

	    draw: function draw() {
	        push();

	        // bg color
	        // blendMode(BLEND);
	        // background(2, 20);

	        //
	        // Start Drawing
	        //
	        var level = mic.getLevel();
	        var randRange = map(level, 0, 0.5, 0, startRadius);
	        var colorIntensity = map(level, 0, 0.2, 0, 255);
	        p5functions.init(map(level, 0, 0.5, 20, 100));

	        beginShape();

	        translate(currPos.x, currPos.y);
	        currPos.add(random(0, randRange), random(-randRange, randRange));
	        // translate(centerX, centerY)

	        var randomness = new Array(formResolution);
	        for (var i = 0; i < formResolution; i++) {
	            randomness[i] = pVectorArr[i].copy();
	            randomness[i].add(createVector(random(-randRange, randRange), random(-randRange, randRange)));
	        }

	        // include '9' so we can draw '0' > '1'
	        var pLast = randomness[pVectorArr.length - 1];
	        curveVertex(pLast.x, pLast.y); // draw

	        for (var i = 0; i < formResolution; i++) {

	            var p = randomness[i];

	            // connect a line through the dots
	            curveVertex(p.x, p.y);
	        };

	        // include '0' so we can draw '8' > '9'
	        curveVertex(randomness[0].x, randomness[0].y); // draw

	        // include '1' so we can draw '9' > '0'
	        curveVertex(randomness[1].x, randomness[1].y); // draw

	        var minColor = 180;
	        var opacity = 255;
	        if (Math.abs(colorIntensity - prevIntensity) > 0.2) {
	            prevIntensity = colorIntensity;
	        } else {
	            opacity = 0;
	        }

	        fill(minColor, random(minColor, colorIntensity), random(minColor, colorIntensity), opacity);
	        stroke(minColor, random(minColor, colorIntensity), random(minColor, colorIntensity), opacity);

	        //fill(255,255,100,100);
	        endShape();

	        pop();
	    },

	    keyReleased: function keyReleased() {
	        switch (key) {
	            case '1':
	                strokeCap(ROUND);
	                break;
	            case '2':
	                strokeCap(SQUARE);
	                break;
	            case '3':
	                strokeCap(PROJECT);
	                break;
	            case 's':
	            case 'S':
	                save('masterpiece.png');
	                break;
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
	var $export = __webpack_require__(5);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(10)});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , core      = __webpack_require__(7)
	  , ctx       = __webpack_require__(8)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 6 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(9);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(11)
	  , toObject = __webpack_require__(12)
	  , IObject  = __webpack_require__(14);

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
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(13);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(15);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
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

	module.exports = __webpack_require__.p + "index.html";

/***/ },
/* 19 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(17)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = init;

	var _fileP5 = __webpack_require__(24);

	var _fileP52 = _interopRequireDefault(_fileP5);

	var _fileP5LibP5Sound = __webpack_require__(25);

	var _fileP5LibP5Sound2 = _interopRequireDefault(_fileP5LibP5Sound);

	function init() {
	    addScript(_fileP52['default']).onload = function () {
	        addScript(_fileP5LibP5Sound2['default']);
	    };
	}

	function addScript(src) {
	    var p5Script = document.createElement('script');
	    p5Script.setAttribute('src', src);
	    document.body.appendChild(p5Script);
	    return p5Script;
	}
	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "1f83f2144fe806b9fca63da112e9615f.js";

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "b4127bbfc915a0d447d381abc190668b.js";

/***/ }
/******/ ]);