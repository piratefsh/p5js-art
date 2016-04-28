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

	var _p5init = __webpack_require__(22);

	var _p5init2 = _interopRequireDefault(_p5init);

	var _componentsUnsteadyHand = __webpack_require__(24);

	var _componentsUnsteadyHand2 = _interopRequireDefault(_componentsUnsteadyHand);

	var _imagesAsmJpg = __webpack_require__(61);

	var _imagesAsmJpg2 = _interopRequireDefault(_imagesAsmJpg);

	var hand = undefined,
	    img = undefined,
	    mouseInit = undefined;
	var initMousePos = false;
	var p5functions = {
	    preload: function preload() {
<<<<<<< HEAD
	        var url = '/' + _imagesAsmJpg2['default'];
	        img = loadImage(url);
=======
	        img = loadImage(_imagesAsmJpg2['default']);
>>>>>>> unsteady
	        loadPixels(img);

	        p5.Image.prototype.getOpacity = function () {
	            return this.opacity || 255;
	        };

	        p5.Image.prototype.setOpacity = function (opacity) {
	            // if (opacity < 0) return;

	            this.loadPixels();
	            var n = 0;
	            while (n < this.pixels.length) {
	                this.pixels[n + 3] = opacity;
	                n += 4;
	            }
	            this.updatePixels();
	            this.opacity = opacity;
	        };

	        p5.Image.prototype.copyImage = function (width, height) {
	            var copy = new p5.Image(width, height);
	            copy.copy(img, 0, 0, img.width, img.height, 0, 0, width, height);
	            return copy;
	        };

	        document.querySelector('.original-img').src = _imagesAsmJpg2['default'];
	    },

	    setup: function setup() {
	        var w = img.width > window.innerWidth ? window.innerWidth : img.width;
	        var h = w / img.width * img.height;

	        if (img.height > window.innerHeight) {
	            h = window.innerHeight;
	            w = h / img.height * img.width;
	        }
	        createCanvas(w, h);
	        background(250);

	        hand = new _componentsUnsteadyHand2['default'](img);
	        hand.startShake();
	    },

	    draw: function draw() {
	        // hand.right(20);

	        // quadratic with slight random
	        // hand.shake(function(t){
	        //     const r = 10;
	        //     const b = 1;
	        //     const a = random(0,0.4);
	        //     const x = r * t;
	        //     const y = a * x * x + b * x;
	        //     let coord = [y, x]
	        //     return coord;
	        // }, LIGHTEST);

	        // linear with subtle random
	        // hand.spiral(function(t){
	        //     const r = 18;
	        //     const x = r*t
	        //     const y = -r*t*random(-0.05, 0.05)
	        //     return [x, y]
	        // }, LIGHTEST, PI/4, -PI/8);

	    },

	    keyPressed: function keyPressed() {
	        if (keyCode === ENTER) {
	            save();
	        }
	    },

	    mousePressed: function mousePressed() {
	        if (!initMousePos) {
	            mouseInit = { x: mouseX, y: mouseY };
	            initMousePos = true;
	        } else {
	            initMousePos = false;
	        }
	    },

	    mouseMoved: function mouseMoved() {
	        if (initMousePos && hand != undefined) {
	            var coord = [mouseX - mouseInit.x, mouseY - mouseInit.y];
	            hand.oneShake(coord, LIGHTEST, 0);
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
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(17)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = init;

	var _fileP5 = __webpack_require__(23);

	var _fileP52 = _interopRequireDefault(_fileP5);

	function init() {
	    var p5Script = document.createElement('script');
	    p5Script.setAttribute('src', _fileP52['default']);
	    document.body.appendChild(p5Script);
	}

	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "9480b16002247e644ca9a3005cff5ea2.js";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = __webpack_require__(25)["default"];

	var _classCallCheck = __webpack_require__(28)["default"];

	var _slicedToArray = __webpack_require__(29)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var UnsteadyHand = (function () {
	  function UnsteadyHand(img) {
	    _classCallCheck(this, UnsteadyHand);

	    this.img = img;
	    // save original
	    this.original = img.copyImage(width, height);
	  }

	  _createClass(UnsteadyHand, [{
	    key: "getStamp",
	    value: function getStamp() {
	      var opacity = arguments.length <= 0 || arguments[0] === undefined ? 80 : arguments[0];

	      var img = this.original.copyImage(width, height);

	      // get pixels
	      img.loadPixels();

	      // set opacity for pixels
	      var n = 0;
	      while (n < img.pixels.length) {
	        var brightness = (img.pixels[n] + img.pixels[n + 1] + img.pixels[n + 2]) / 3;
	        img.pixels[n + 3] = opacity;
	        n += 4;
	      }

	      img.updatePixels();

	      return img;
	    }
	  }, {
	    key: "startShake",
	    value: function startShake() {
	      image(this.original, 0, 0, width, height);

	      this.stamp = this.getStamp(40);
	      this.stamp.filter(BLUR, 1);
	    }
	  }, {
	    key: "oneShake",
	    value: function oneShake(coord) {
	      var filter = arguments.length <= 1 || arguments[1] === undefined ? NORMAL : arguments[1];
	      var opacity = arguments.length <= 2 || arguments[2] === undefined ? 255 : arguments[2];

	      var _coord = _slicedToArray(coord, 2);

	      var x = _coord[0];
	      var y = _coord[1];

	      blend(this.stamp, 0, 0, width, height, x, y, width, height, filter);
	      this.stamp.setOpacity(255);
	    }
	  }, {
	    key: "shake",
	    value: function shake(movementFn) {
	      var filter = arguments.length <= 1 || arguments[1] === undefined ? NORMAL : arguments[1];
	      var step = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

	      this.startShake();
	      var time = 0;
	      var endTime = 1;

	      var movement = undefined;
	      var stamp = this.stamp || this.getStamp();
	      movement = movementFn(time);

	      while (time <= endTime) {
	        this.oneShake(movement, filter, 255(1 - time));
	        time += 0.05;
	        movement = movementFn(time);
	      }
	    }
	  }, {
	    key: "spiral",
	    value: function spiral(movementFn) {
	      var filter = arguments.length <= 1 || arguments[1] === undefined ? NORMAL : arguments[1];
	      var rotation = arguments.length <= 2 || arguments[2] === undefined ? TWO_PI : arguments[2];
	      var offset = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

	      image(this.original, 0, 0, width, height);

	      var stamp = this.getStamp(40);
	      stamp.filter(BLUR, 1);
	      var time = 0;
	      var endTime = 1;

	      var movement = movementFn(time);

	      while (time <= endTime) {
	        push();

	        // rotate with center as origin
	        translate(width / 2, height / 2);
	        rotate(rotation * time + offset);

	        // recenter
	        translate(-width / 2, -height / 2);

	        var _movement = movement;

	        var _movement2 = _slicedToArray(_movement, 2);

	        var i = _movement2[0];
	        var j = _movement2[1];

	        blend(stamp, 0, 0, width, height, i, j, width, height, filter);
	        stamp.setOpacity(255 * (1 - time));

	        time += 0.05;
	        movement = movementFn(time);
	        pop();
	      }
	    }
	  }]);

	  return UnsteadyHand;
	})();

	exports["default"] = UnsteadyHand;
	module.exports = exports["default"];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(26)["default"];

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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(27), __esModule: true };

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(11);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _getIterator = __webpack_require__(30)["default"];

	var _isIterable = __webpack_require__(58)["default"];

	exports["default"] = (function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = _getIterator(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (_isIterable(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(31), __esModule: true };

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(32);
	__webpack_require__(50);
	module.exports = __webpack_require__(53);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(33);
	var Iterators = __webpack_require__(36);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(34)
	  , step             = __webpack_require__(35)
	  , Iterators        = __webpack_require__(36)
	  , toIObject        = __webpack_require__(37);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(38)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(14)
	  , defined = __webpack_require__(13);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(39)
	  , $export        = __webpack_require__(5)
	  , redefine       = __webpack_require__(40)
	  , hide           = __webpack_require__(41)
	  , has            = __webpack_require__(44)
	  , Iterators      = __webpack_require__(36)
	  , $iterCreate    = __webpack_require__(45)
	  , setToStringTag = __webpack_require__(46)
	  , getProto       = __webpack_require__(11).getProto
	  , ITERATOR       = __webpack_require__(47)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(41);

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(11)
	  , createDesc = __webpack_require__(42);
	module.exports = __webpack_require__(43) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(16)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 44 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(11)
	  , descriptor     = __webpack_require__(42)
	  , setToStringTag = __webpack_require__(46)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(41)(IteratorPrototype, __webpack_require__(47)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(11).setDesc
	  , has = __webpack_require__(44)
	  , TAG = __webpack_require__(47)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(48)('wks')
	  , uid    = __webpack_require__(49)
	  , Symbol = __webpack_require__(6).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(6)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 49 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(51)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(38)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(52)
	  , defined   = __webpack_require__(13);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(54)
	  , get      = __webpack_require__(56);
	module.exports = __webpack_require__(7).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(55);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(57)
	  , ITERATOR  = __webpack_require__(47)('iterator')
	  , Iterators = __webpack_require__(36);
	module.exports = __webpack_require__(7).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(15)
	  , TAG = __webpack_require__(47)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(59), __esModule: true };

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(32);
	__webpack_require__(50);
	module.exports = __webpack_require__(60);

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(57)
	  , ITERATOR  = __webpack_require__(47)('iterator')
	  , Iterators = __webpack_require__(36);
	module.exports = __webpack_require__(7).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "bb74a8de619dde9a1b69ed527a23bcb5.jpg";

/***/ }
/******/ ]);