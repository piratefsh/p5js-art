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

	var _componentsLSystem = __webpack_require__(24);

	var _componentsLSystem2 = _interopRequireDefault(_componentsLSystem);

	var _componentsLSystemEditor = __webpack_require__(65);

	var _componentsLSystemEditor2 = _interopRequireDefault(_componentsLSystemEditor);

	var _componentsLSystemExamples = __webpack_require__(66);

	var _componentsLSystemExamples2 = _interopRequireDefault(_componentsLSystemExamples);

	var ls = undefined,
	    currLSystem = undefined,
	    _editor = undefined;

	var p5functions = {
	    preload: function preload() {},

	    setup: function setup() {
	        // p5functions.reset()
	        p5functions.editor();

	        document.getElementById('btn-reset').addEventListener('click', function () {
	            p5functions.reset();
	        });
	    },

	    editor: function editor() {
	        _editor = new _componentsLSystemEditor2['default']();
	    },

	    reset: function reset() {
	        document.getElementById('editor').classList.add('hidden');
	        document.getElementById('controls').classList.remove('hidden');

	        createCanvas(1260, 480);

	        clear();
	        strokeWeight(1.5);
	        background(20);
	        stroke(255);
	        var distanceX = 200;

	        // l systems to draw
	        var systems = [_componentsLSystemExamples2['default'].weed3, _componentsLSystemExamples2['default'].weed1, _componentsLSystemExamples2['default'].arrow, _componentsLSystemExamples2['default'].weed2, _componentsLSystemExamples2['default'].weed4];
	        var iterations = [4, 5, 5, 5, 4];

	        translate(0, height - 50);
	        // stroke(random(100,200),random(100,200),0)

	        for (var i = 0; i < systems.length; i++) {
	            var l = systems[i];
	            translate(distanceX, 0);
	            l.run(iterations[i]);
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

	module.exports = __webpack_require__.p + "1f83f2144fe806b9fca63da112e9615f.js";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(25)['default'];

	var _classCallCheck = __webpack_require__(28)['default'];

	var _slicedToArray = __webpack_require__(29)['default'];

	var _Object$keys = __webpack_require__(61)['default'];

	var _Object$assign = __webpack_require__(2)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var LSystemConstants = {};
	LSystemConstants.PLUS_ANGLE = '+';
	LSystemConstants.MINUS_ANGLE = '-';
	LSystemConstants.PUSH = '[';
	LSystemConstants.POP = ']';
	LSystemConstants.STOCHASTIC_PTN = new RegExp("([\.0-9]+)([a-zA-Z])");
	LSystemConstants.VALID_VAR_PTN = new RegExp("[a-zA-Z]");

	var LSystems = (function () {
	    function LSystems(options) {
	        _classCallCheck(this, LSystems);

	        this.setAngle(options.angle);
	        this.setAxiom(options.axiom);
	        this.rules = {};
	        this.addRules(options.rules);
	        this.length = options.length || 5;
	        this.name = options.name || 'l-system';
	        this.iterations = options.iterations || 4;
	        this.lineWidth = options.lineWidth || 1;
	    }

	    _createClass(LSystems, [{
	        key: 'setAngle',
	        value: function setAngle(an) {
	            if (!an) throw new Error('LSystem: missing angle');
	            this.angle = an;
	        }
	    }, {
	        key: 'setAxiom',
	        value: function setAxiom(ax) {
	            if (!ax) throw new Error('LSystem: missing axiom');
	            this.axiom = ax;
	        }
	    }, {
	        key: 'addRules',
	        value: function addRules(rules) {
	            var newRules = {};
	            _Object$keys(rules).forEach(function (key) {
	                var val = rules[key];
	                if (typeof val == 'string') {
	                    newRules[key] = [rules[key].trim()];
	                } else {
	                    newRules[key] = rules[key].map(function (str) {
	                        return str.trim();
	                    });
	                }
	            });

	            _Object$assign(this.rules, newRules);
	        }
	    }, {
	        key: 'addRule',
	        value: function addRule(variable, replacement) {
	            if (!variable || !replacement) throw new Error('LSystem: missing rule variable/replacement');
	            this.rules[variable] = replacement.trim();
	        }
	    }, {
	        key: 'replace',
	        value: function replace(iterations) {
	            // copy axiom
	            var variables = _Object$keys(this.rules);
	            var result = this.axiom.toString();
	            var variable = undefined,
	                rule = undefined,
	                replaced = undefined,
	                v = undefined;

	            // for each iteration
	            for (var i = 0; i < iterations; i++) {
	                replaced = '';

	                // for each variable, replace with rule
	                for (var j = 0; j < result.length; j++) {
	                    v = result[j];
	                    if (variables.indexOf(v) > -1) {
	                        // pick random rule
	                        var rules = this.rules[v];
	                        var randIdx = Math.floor(random(rules.length));
	                        replaced += rules[randIdx];
	                    } else {
	                        replaced += v;
	                    }
	                }

	                result = replaced;
	            }
	            return result;
	        }
	    }, {
	        key: 'draw',
	        value: function draw(state, offset, drawLines) {
	            // track min-max coords
	            push();

	            strokeWeight(this.lineWidth);

	            var min = new p5.Vector(Infinity, Infinity);
	            var max = new p5.Vector(-Infinity, -Infinity);
	            var coord = new p5.Vector(0, 0);
	            var theta = 0;
	            var pad = 30;
	            // apply offset to align drawing to top left
	            if (offset) {
	                translate(-offset.min.x + pad, -offset.min.y + pad);
	            }

	            var validVariables = _Object$keys(this.rules);
	            var variable = undefined;
	            var turtle = new p5.Vector(0, -this.length);
	            var states = new Array();

	            for (var i = 0; i < state.length; i++) {
	                min.x = coord.x < min.x ? coord.x : min.x;
	                min.y = coord.y < min.y ? coord.y : min.y;
	                max.x = coord.x > max.x ? coord.x : max.x;
	                max.y = coord.y > max.y ? coord.y : max.y;

	                variable = state[i];

	                switch (variable) {
	                    case LSystemConstants.PLUS_ANGLE:
	                        theta = radians(this.angle);
	                        turtle.rotate(theta);
	                        break;
	                    case LSystemConstants.MINUS_ANGLE:
	                        theta = -radians(this.angle);
	                        turtle.rotate(theta);
	                        break;
	                    case LSystemConstants.PUSH:
	                        states.push([coord.copy(), turtle.copy()]);
	                        break;
	                    case LSystemConstants.POP:
	                        var _states$pop = states.pop(),
	                            _states$pop2 = _slicedToArray(_states$pop, 2),
	                            c = _states$pop2[0],
	                            t = _states$pop2[1];

	                        coord = c;
	                        turtle = t;
	                        break;
	                    default:
	                        if (validVariables.indexOf(variable) > -1 || variable.match(LSystemConstants.VALID_VAR_PTN)) {
	                            if (drawLines) {
	                                line(coord.x, coord.y, coord.x + turtle.x, coord.y + turtle.y);
	                            }
	                            coord.add(turtle);
	                        } else {
	                            throw new Error('LSystem: Unknown token ' + variable);
	                        }
	                }
	            }
	            if (!offset) {
	                // redraw with offset
	                this.draw(state, { min: min, max: max }, true);
	            }
	            pop();
	        }
	    }, {
	        key: 'getString',
	        value: function getString() {
	            return this.string;
	        }
	    }, {
	        key: 'run',
	        value: function run(n) {
	            this.string = this.replace(n || this.iterations);
	            this.draw(this.string);
	        }
	    }]);

	    return LSystems;
	})();

	exports['default'] = LSystems;
	module.exports = exports['default'];

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

	module.exports = { "default": __webpack_require__(62), __esModule: true };

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(63);
	module.exports = __webpack_require__(7).Object.keys;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(12);

	__webpack_require__(64)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 64 */
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(25)['default'];

	var _classCallCheck = __webpack_require__(28)['default'];

	var _Object$keys = __webpack_require__(61)['default'];

	var _interopRequireDefault = __webpack_require__(17)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _LSystem = __webpack_require__(24);

	var _LSystem2 = _interopRequireDefault(_LSystem);

	var _LSystemExamples = __webpack_require__(66);

	var _LSystemExamples2 = _interopRequireDefault(_LSystemExamples);

	var LSystemEditor = (function () {
	    function LSystemEditor() {
	        _classCallCheck(this, LSystemEditor);

	        this.elem = document.getElementById('editor');
	        this.initForm();
	        this.initExampleList();
	        this.curr = null;

	        var hasDraw = window.location.search.indexOf('d') > -1;
	        var example = document.getElementById(window.location.search.split('=')[1]);

	        if (example) {
	            // draw pattern if exists
	            example.click();
	        } else {
	            // else draw first example
	            var firstExample = document.querySelector('#examples-list li a');
	            firstExample.click();
	        }
	    }

	    _createClass(LSystemEditor, [{
	        key: 'save',
	        value: (function (_save) {
	            function save() {
	                return _save.apply(this, arguments);
	            }

	            save.toString = function () {
	                return _save.toString();
	            };

	            return save;
	        })(function () {
	            var name = this.curr.name;
	            save(name + '-' + new Date() + '.png');
	        })
	    }, {
	        key: 'rulesToString',
	        value: function rulesToString(rules) {
	            var vars = _Object$keys(rules);
	            return vars.reduce(function (acc, key) {
	                return key + '=' + rules[key].join(',') + '\n' + acc;
	            }, "");
	        }
	    }, {
	        key: 'drawCurrentSystem',
	        value: function drawCurrentSystem() {
	            clear();
	            // background(20);
	            stroke(255);
	            strokeWeight(1.2);

	            var rules = {};
	            var allRules = document.getElementById('editor-rules').value.split('\n');
	            allRules.forEach(function (rule) {
	                // ignore whitespace
	                rule = rule.trim();
	                if (rule.length < 1) {
	                    return;
	                }

	                // find rule and break
	                var matches = rule.match('([A-Z])=(.*)');
	                if (matches) {
	                    var rs = matches[2].split(',');
	                    rules[matches[1]] = rs;
	                } else {
	                    window.alert(rule + ' is not a valid rule.');
	                }
	            });

	            var l = new _LSystem2['default']({
	                angle: document.getElementById('editor-angle').value,
	                axiom: document.getElementById('editor-axiom').value,
	                length: document.getElementById('editor-length').value,
	                rules: rules
	            });
	            var iterations = document.getElementById('editor-iterations').value;
	            push();

	            l.run(iterations);
	            pop();

	            document.getElementById('string').innerHTML = l.getString();

	            this.curr = l;
	        }
	    }, {
	        key: 'initForm',
	        value: function initForm() {
	            var _this = this;

	            this.elem.classList.remove('hidden');
	            var status = document.getElementById('status');
	            document.getElementById('controls').classList.add('hidden');

	            createCanvas(window.innerWidth - this.elem.getBoundingClientRect().width, window.innerHeight - status.getBoundingClientRect().height);

	            // on draw
	            document.getElementById('lsystem-form').addEventListener('submit', function (e) {
	                e.preventDefault();
	                _this.drawCurrentSystem();
	            });

	            // on save
	            document.getElementById('btn-save').addEventListener('click', function () {
	                _this.save();
	            });
	        }
	    }, {
	        key: 'initExampleList',
	        value: function initExampleList() {
	            var _this2 = this;

	            var exampleList = document.getElementById('examples-list');
	            // add examples

	            var _loop = function (example) {
	                var e = _LSystemExamples2['default'][example];
	                var li = document.createElement('li');
	                var a = document.createElement('a');
	                a.id = e.name.split(' ').join('-');
	                a.classList.add('btn');
	                a.classList.add('btn-default');
	                a.classList.add('btn-sm');
	                a.innerHTML = e.name;
	                a.addEventListener('click', function () {
	                    // load data
	                    document.getElementById('editor-angle').value = e.angle;
	                    document.getElementById('editor-iterations').value = e.iterations;
	                    document.getElementById('editor-axiom').value = e.axiom;
	                    document.getElementById('editor-rules').value = _this2.rulesToString(e.rules);
	                    document.getElementById('editor-length').value = e.length;
	                    // draw
	                    _this2.drawCurrentSystem();
	                });
	                li.appendChild(a);
	                exampleList.appendChild(li);
	            };

	            for (var example in _LSystemExamples2['default']) {
	                _loop(example);
	            }
	        }
	    }]);

	    return LSystemEditor;
	})();

	exports['default'] = LSystemEditor;
	module.exports = exports['default'];

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(17)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _LSystem = __webpack_require__(24);

	var _LSystem2 = _interopRequireDefault(_LSystem);

	exports['default'] = {
	    binaryTree: new _LSystem2['default']({
	        name: 'binary tree',
	        angle: 30,
	        axiom: 'X',
	        rules: {
	            'X': 'F[-X][+X]'
	        },
	        iterations: 4,
	        length: 36
	    }),

	    koch: new _LSystem2['default']({
	        name: 'koch snowflake',
	        angle: 60,
	        axiom: 'F++F++F',
	        rules: {
	            'F': 'F-F++F-F'
	        },
	        iterations: 4
	    }),

	    kochEdge: new _LSystem2['default']({
	        name: 'koch edge',
	        angle: 60,
	        axiom: 'F',
	        rules: {
	            'F': 'F-F++F-F'
	        },
	        iterations: 1,
	        length: 36
	    }),

	    dragon: new _LSystem2['default']({
	        name: 'dragon curve',
	        angle: 90,
	        axiom: 'FX',
	        rules: {
	            'X': 'X+YF+',
	            'Y': '-FX-Y'
	        },
	        iterations: 9
	    }),

	    sierpinksi: new _LSystem2['default']({
	        name: "Sierpinski's triangle",
	        angle: 60,
	        axiom: 'A',
	        rules: {
	            'A': '+B-A-B+',
	            'B': '-A+B+A-'
	        },
	        iterations: 7,
	        length: 3
	    }),

	    arrow: new _LSystem2['default']({
	        name: 'arrow weed',
	        angle: 30,
	        axiom: 'X',
	        rules: {
	            'X': 'F[+X][-X]FX',
	            'F': 'FF'
	        },
	        iterations: 5
	    }),

	    weed1: new _LSystem2['default']({
	        name: 'fuzzy weed',
	        angle: 22.5,
	        axiom: 'X',
	        rules: {
	            'X': 'F-[[X]+X]+F[+FX]-X',
	            'F': 'FF'
	        },
	        length: 5,
	        iterations: 5
	    }),

	    weed2: new _LSystem2['default']({
	        name: 'twiggy weed',
	        angle: 25,
	        axiom: 'X',
	        rules: {
	            'X': 'F[-X]F[-X]+X',
	            'F': 'FF'
	        },
	        length: 5,
	        iterations: 5
	    }),

	    weed3: new _LSystem2['default']({
	        name: 'tall seaweed',
	        angle: 25,
	        axiom: 'F',
	        rules: {
	            'F': 'F[+F]F[-F]F'
	        },
	        length: 5,
	        iterations: 4
	    }),

	    weed4: new _LSystem2['default']({
	        name: 'wavy seaweed',
	        angle: 22.5,
	        axiom: 'F',
	        rules: {
	            'F': 'FF-[-F+F+F]+[+F-F-F]'
	        },
	        length: 5,
	        iterations: 4
	    }),

	    sWeed1: new _LSystem2['default']({
	        name: 'stochastic fuzzy weed',
	        angle: 22.5,
	        axiom: 'X',
	        rules: {
	            'X': ['F-[[X]+X]+F[+FX]-X', 'F+[[X]-X]-F[-FX]+X'],
	            'F': 'FF'
	        },
	        iterations: 4
	    })
	};
	module.exports = exports['default'];

/***/ }
/******/ ]);