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

	var _componentsChrysanthemum = __webpack_require__(20);

	var _componentsChrysanthemum2 = _interopRequireDefault(_componentsChrysanthemum);

	var flowers = [];
	var interval = undefined;
	var intervalFreq = 0;
	var intervalPrefix = new Date().toString();

	var p5functions = {
	    setup: function setup() {
	        createCanvas(window.innerWidth, window.innerHeight);
	        background(20);
	        var bs = new p5.Vector(width / 4, height / 3); //block size
	        for (var x = 0; x < width; x += bs.x) {
	            for (var y = 0; y < height; y += bs.y) {

	                var center = new p5.Vector(x + bs.x / 2, y + bs.y / 2);
	                flowers.push(new _componentsChrysanthemum2['default'](center));
	            }
	        }

	        interval = setInterval(function () {
	            save('orbitals-' + intervalPrefix + '-' + intervalFreq + '.png');
	            if (++intervalFreq > 4) {
	                clearInterval(interval);
	            }
	        }, 8000);
	    },

	    draw: function draw() {
	        // background(0, 1);
	        flowers.forEach(function (f) {
	            f.run();
	        });
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

	module.exports = __webpack_require__.p + "2b554b11bcc10caa6e17aa6ff105a902.js";

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(21)['default'];

	var _classCallCheck = __webpack_require__(24)['default'];

	var _interopRequireDefault = __webpack_require__(17)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _Mover = __webpack_require__(25);

	var _Mover2 = _interopRequireDefault(_Mover);

	var _Attractor = __webpack_require__(41);

	var _Attractor2 = _interopRequireDefault(_Attractor);

	var Chrysanthemum = (function () {
	    function Chrysanthemum(center) {
	        _classCallCheck(this, Chrysanthemum);

	        this.attractors = [];
	        this.movers = [];
	        this.moverRadius = 2;
	        this.moverMass = 8;
	        this.numMovers = random(6, 12);

	        var gap = random(5, 10);
	        for (var i = 0; i < this.numMovers; i++) {
	            var _pos = center.copy();
	            _pos.x -= random(3, 8);
	            _pos.y += gap * i;
	            var m = new _Mover2['default'](this.moverRadius, _pos, this.moverMass);
	            m.velocity = new p5.Vector(random(0, 1), random(0, 1));
	            this.movers.push(m);
	        }

	        var pos = center.copy();
	        var a = new _Attractor2['default'](random(25, 40), pos);
	        this.attractors.push(a);
	    }

	    _createClass(Chrysanthemum, [{
	        key: 'run',
	        value: function run() {
	            var _this = this;

	            this.movers.forEach(function (mv) {
	                mv.run();
	                _this.attractors.forEach(function (a) {
	                    var attrForce = a.attract(mv);
	                    mv.applyForce(attrForce);
	                    if (mouseIsPressed) {
	                        a.draw();
	                    }
	                });
	            });
	        }
	    }]);

	    return Chrysanthemum;
	})();

	exports['default'] = Chrysanthemum;
	module.exports = exports['default'];

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

	var $ = __webpack_require__(11);
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

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(26)['default'];

	var _inherits = __webpack_require__(32)['default'];

	var _createClass = __webpack_require__(21)['default'];

	var _classCallCheck = __webpack_require__(24)['default'];

	var _interopRequireDefault = __webpack_require__(17)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _Attractor2 = __webpack_require__(41);

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
	            fill(255, 80);
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$getOwnPropertyDescriptor = __webpack_require__(27)["default"];

	exports["default"] = function get(_x, _x2, _x3) {
	  var _again = true;

	  _function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;
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
	        desc = parent = undefined;
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(28), __esModule: true };

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(11);
	__webpack_require__(29);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(30);

	__webpack_require__(31)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(14)
	  , defined = __webpack_require__(13);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(5)
	  , core    = __webpack_require__(7)
	  , fails   = __webpack_require__(16);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(33)["default"];

	var _Object$setPrototypeOf = __webpack_require__(35)["default"];

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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(34), __esModule: true };

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(11);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(36), __esModule: true };

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(37);
	module.exports = __webpack_require__(7).Object.setPrototypeOf;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(5);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(38).set});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(11).getDesc
	  , isObject = __webpack_require__(39)
	  , anObject = __webpack_require__(40);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(8)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
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
/* 39 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(39);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = __webpack_require__(21)["default"];

	var _classCallCheck = __webpack_require__(24)["default"];

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
	            distance = constrain(distance, this.radius, 100);

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

/***/ }
/******/ ]);