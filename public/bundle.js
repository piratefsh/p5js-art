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

	var _componentsMover = __webpack_require__(20);

	var _componentsMover2 = _interopRequireDefault(_componentsMover);

	var _componentsRepeller = __webpack_require__(43);

	var _componentsRepeller2 = _interopRequireDefault(_componentsRepeller);

	var _componentsAttractor = __webpack_require__(42);

	var _componentsAttractor2 = _interopRequireDefault(_componentsAttractor);

	var movers = [];
	var attractors = [];
	var gravity = undefined,
	    wind = undefined;
	var repeller = undefined,
	    attractor = undefined;
	var moverRadius = 5;
	var numMovers = 10;
	var numAttractors = 5;
	var frictionCoefficient = 0.06;
	var frictionNormal = 1;
	var frictionMag = frictionCoefficient * frictionNormal;

	var p5functions = {
	    setup: function setup() {
	        createCanvas(window.innerWidth, window.innerHeight);
	        background(20);
	        var center = new p5.Vector(0, height / 2);

	        for (var i = 0; i < numMovers; i++) {
	            var pos = center.copy();
	            pos.y -= 10 * numMovers;
	            pos.y += 10 * i;
	            movers.push(new _componentsMover2['default'](2, pos, 10));
	        }

	        gravity = new p5.Vector(0, 0.08);
	        wind = new p5.Vector(0.05, 0);

	        // repeller = new Repeller(new p5.Vector(width / 2 - 20, height / 2 + 80));
	        for (var i = 0; i < numAttractors; i++) {
	            var x = random(0, width * 0.7);
	            var pos = new p5.Vector(x, height / 2);
	            var a = new _componentsAttractor2['default']((i + 1) * 5, pos);
	            attractors.push(a);
	            // a.draw();
	        }
	    },

	    draw: function draw() {
	        background(20, 0);
	        movers.forEach(function (mv) {
	            mv.run();
	            // mv.applyForce(gravity);
	            // const repellerForce = repeller.repel(mv);
	            // mv.applyForce(repellerForce);
	            attractors.forEach(function (a) {
	                var attrForce = a.attract(mv);
	                mv.applyForce(attrForce);
	                if (mouseIsPressed) {
	                    a.draw();
	                }
	            });

	            // mv.applyForce(friction);
	        });
	    },

	    keyPressed: function keyPressed() {
	        if (keyCode === ENTER) {
	            save();
	        }
	    }

	    // mousePressed: function(){
	    //     const pos = new p5.Vector(mouseX, mouseY);
	    //     movers.push(new Mover(moverRadius, pos))
	    // }
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

	'use strict';

	var _get = __webpack_require__(21)['default'];

	var _inherits = __webpack_require__(27)['default'];

	var _createClass = __webpack_require__(38)['default'];

	var _classCallCheck = __webpack_require__(41)['default'];

	var _interopRequireDefault = __webpack_require__(17)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _Attractor2 = __webpack_require__(42);

	var _Attractor3 = _interopRequireDefault(_Attractor2);

	var Mover = (function (_Attractor) {
	    _inherits(Mover, _Attractor);

	    function Mover(r, p) {
	        var m = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

	        _classCallCheck(this, Mover);

	        _get(Object.getPrototypeOf(Mover.prototype), 'constructor', this).call(this, m, p);
	        this.radius = r;
	        this.mass = m;
	        this.velocity = new p5.Vector(0, 1);
	        this.acceleration = new p5.Vector(0, 0);
	    }

	    _createClass(Mover, [{
	        key: 'applyForce',
	        value: function applyForce(f) {
	            var force = f.copy();
	            force.div(this.mass);
	            this.acceleration.add(force);
	        }
	    }, {
	        key: 'applyAttractor',
	        value: function applyAttractor(f) {
	            this.acceleration.add(f);
	        }
	    }, {
	        key: 'checkEdges',
	        value: function checkEdges() {
	            if (this.pos.x < 0 || this.pos.x > width) {
	                this.velocity.x *= -1;
	            }
	            if (this.pos.y < 0 || this.pos.y > height) {
	                this.velocity.y *= -1;
	            }
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            // this.checkEdges();
	            this.velocity.add(this.acceleration);
	            this.pos.add(this.velocity);
	            this.acceleration.mult(0);
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {
	            noStroke();
	            fill(255, 100);
	            ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
	        }
	    }, {
	        key: 'run',
	        value: function run() {
	            this.update();
	            this.draw();
	        }
	    }]);

	    return Mover;
	})(_Attractor3['default']);

	exports['default'] = Mover;
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$getOwnPropertyDescriptor = __webpack_require__(22)["default"];

	exports["default"] = function get(_x, _x2, _x3) {
	  var _again = true;

	  _function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;
	    desc = parent = getter = undefined;
	    _again = false;
	    if (object === null) object = Function.prototype;

	    var desc = _Object$getOwnPropertyDescriptor(object, property);

	    if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);

	      if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;
	        _x2 = property;
	        _x3 = receiver;
	        _again = true;
	        continue _function;
	      }
	    } else if ("value" in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;

	      if (getter === undefined) {
	        return undefined;
	      }

	      return getter.call(receiver);
	    }
	  }
	};

	exports.__esModule = true;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(23), __esModule: true };

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(14);
	__webpack_require__(24);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(25);

	__webpack_require__(26)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(11)
	  , defined = __webpack_require__(10);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	module.exports = function(KEY, exec){
	  var $def = __webpack_require__(5)
	    , fn   = (__webpack_require__(7).Object || {})[KEY] || Object[KEY]
	    , exp  = {};
	  exp[KEY] = exec(fn);
	  $def($def.S + $def.F * __webpack_require__(16)(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(28)["default"];

	var _Object$setPrototypeOf = __webpack_require__(30)["default"];

	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	exports.__esModule = true;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(29), __esModule: true };

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(14);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(31), __esModule: true };

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(32);
	module.exports = __webpack_require__(7).Object.setPrototypeOf;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $def = __webpack_require__(5);
	$def($def.S, 'Object', {setPrototypeOf: __webpack_require__(33).set});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(14).getDesc
	  , isObject = __webpack_require__(34)
	  , anObject = __webpack_require__(35);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line no-proto
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(36)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(34);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(37);
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
/* 37 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(39)["default"];

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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(40), __esModule: true };

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(14);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = __webpack_require__(38)["default"];

	var _classCallCheck = __webpack_require__(41)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var Attractpr = (function () {
	    function Attractpr(m, pos) {
	        _classCallCheck(this, Attractpr);

	        this.pos = pos;

	        this.G = 0.4;
	        this.mass = m;
	        this.radius = this.mass;
	    }

	    _createClass(Attractpr, [{
	        key: "draw",
	        value: function draw() {
	            noStroke();
	            fill(255, 50);
	            ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
	        }
	    }, {
	        key: "attract",
	        value: function attract(p) {
	            // force direction
	            var force = p5.Vector.sub(this.pos, p.pos);

	            // distance of particles
	            var distance = force.mag();

	            // normalize direction
	            force.normalize();

	            // constrain distance
	            distance = constrain(distance, this.radius, 200);

	            // magintude
	            var strength = this.G * (this.mass * p.mass) / (distance * distance);

	            // vector of direction and magnitude
	            force.mult(strength);
	            force.mult(p.mass);
	            return force;
	        }
	    }]);

	    return Attractpr;
	})();

	exports["default"] = Attractpr;
	module.exports = exports["default"];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = __webpack_require__(38)["default"];

	var _classCallCheck = __webpack_require__(41)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var Repeller = (function () {
	    function Repeller(pos) {
	        _classCallCheck(this, Repeller);

	        this.pos = pos;
	        this.radius = 30;

	        this.G = 1;
	        this.mass = 100;
	    }

	    _createClass(Repeller, [{
	        key: "draw",
	        value: function draw() {
	            noStroke();
	            fill(255, 100);
	            ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
	        }
	    }, {
	        key: "repel",
	        value: function repel(p) {
	            // force direction
	            var direction = p5.Vector.sub(this.pos, p.pos);

	            // distance of particles
	            var distance = direction.mag();
	            direction.normalize();
	            distance = constrain(distance, 5, 100);
	            // magintude
	            var force = -1 * this.G * (this.mass * p.mass) / (distance * distance);

	            // vector of direction and magnitude
	            direction.mult(force);
	            return direction;
	        }
	    }]);

	    return Repeller;
	})();

	exports["default"] = Repeller;
	module.exports = exports["default"];

/***/ }
/******/ ]);