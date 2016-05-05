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

	var _componentsLSystemExamples = __webpack_require__(64);

	var _componentsLSystemExamples2 = _interopRequireDefault(_componentsLSystemExamples);

	var ls = undefined,
	    currLSystem = undefined;

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
	        document.getElementById('editor').classList.remove('hidden');
	        document.getElementById('controls').classList.add('hidden');

	        createCanvas(window.innerWidth, window.innerHeight);

	        // on draw
	        document.getElementById('btn-draw').addEventListener('click', function () {
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
	                console.log(rules);
	            });

	            var l = new _componentsLSystem2['default']({
	                angle: document.getElementById('editor-angle').value,
	                axiom: document.getElementById('editor-axiom').value,
	                rules: rules
	            });
	            var iterations = document.getElementById('editor-iterations').value;
	            push();

	            clear();
	            translate(width / 3, height - 50);
	            l.run(iterations);
	            pop();
	        });
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
	    },

	    keyPressed: function keyPressed() {
	        if (keyCode === ENTER) {
	            var _name = 'l-systems';
	            save('' + _name + new Date() + '.png');
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

	'use strict';

	var _createClass = __webpack_require__(25)['default'];

	var _classCallCheck = __webpack_require__(28)['default'];

	var _slicedToArray = __webpack_require__(29)['default'];

	var _Object$keys = __webpack_require__(60)['default'];

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

	var LSystems = (function () {
	    function LSystems(options) {
	        _classCallCheck(this, LSystems);

	        this.setAngle(options.angle);
	        this.setAxiom(options.axiom);
	        this.rules = {};
	        this.addRules(options.rules);
	        this.len = options.length || 5;
	        this.name = options.name || 'l-system';
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
	            var min = new p5.Vector(Infinity, Infinity);
	            var max = new p5.Vector(-Infinity, -Infinity);
	            var coord = new p5.Vector(0, 0);
	            var theta = 0;

	            // apply offset to center drawing
	            if (offset) {
	                var translateOffset = new p5.Vector(width / 2, height / 2);
	                var drawingSize = offset.max.sub(offset.min);
	                drawingSize.div(2);
	                drawingSize.rotate(-PI / 2);
	                translateOffset.sub(drawingSize);
	                // uncomment for auto centering
	                // translate(translateOffset.x, translateOffset.y);
	                // translate(-offset.min.x, -offset.min.y);
	                // translate(width/3, height*2/3);
	            }

	            var validVariables = _Object$keys(this.rules);
	            var variable = undefined;
	            var turtle = new p5.Vector(0, -this.len);
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
	                        if (validVariables.indexOf(variable) > -1) {
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
	        key: 'run',
	        value: function run(n) {
	            this.draw(this.replace(n));
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

	var $ = __webpack_require__(14);
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

	var _isIterable = __webpack_require__(57)["default"];

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
	__webpack_require__(49);
	module.exports = __webpack_require__(52);

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
	var setUnscope = __webpack_require__(34)
	  , step       = __webpack_require__(35)
	  , Iterators  = __webpack_require__(36)
	  , toIObject  = __webpack_require__(37);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(38)(Array, 'Array', function(iterated, kind){
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

	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

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
	var IObject = __webpack_require__(11)
	  , defined = __webpack_require__(10);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY         = __webpack_require__(39)
	  , $def            = __webpack_require__(5)
	  , $redef          = __webpack_require__(40)
	  , hide            = __webpack_require__(41)
	  , has             = __webpack_require__(15)
	  , SYMBOL_ITERATOR = __webpack_require__(44)('iterator')
	  , Iterators       = __webpack_require__(36)
	  , BUGGY           = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values';
	var returnThis = function(){ return this; };
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  __webpack_require__(47)(Constructor, NAME, next);
	  var createMethod = function(kind){
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = __webpack_require__(14).getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    __webpack_require__(48)(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
	  }
	  // Define iterator
	  if(!LIBRARY || FORCE)hide(proto, SYMBOL_ITERATOR, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * BUGGY, NAME, methods);
	  }
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

	var $          = __webpack_require__(14)
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
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(45)('wks')
	  , Symbol = __webpack_require__(6).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || __webpack_require__(46))('Symbol.' + name));
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(6)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(14)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(41)(IteratorPrototype, __webpack_require__(44)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: __webpack_require__(42)(1,next)});
	  __webpack_require__(48)(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var has  = __webpack_require__(15)
	  , hide = __webpack_require__(41)
	  , TAG  = __webpack_require__(44)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))hide(it, TAG, tag);
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(50)(true);

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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var toInteger = __webpack_require__(51)
	  , defined   = __webpack_require__(10);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(53)
	  , get      = __webpack_require__(55);
	module.exports = __webpack_require__(7).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(54);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(56)
	  , ITERATOR  = __webpack_require__(44)('iterator')
	  , Iterators = __webpack_require__(36);
	module.exports = __webpack_require__(7).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(12)
	  , TAG = __webpack_require__(44)('toStringTag')
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
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(58), __esModule: true };

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(32);
	__webpack_require__(49);
	module.exports = __webpack_require__(59);

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(56)
	  , ITERATOR  = __webpack_require__(44)('iterator')
	  , Iterators = __webpack_require__(36);
	module.exports = __webpack_require__(7).isIterable = function(it){
	  var O = Object(it);
	  return ITERATOR in O || '@@iterator' in O || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	module.exports = __webpack_require__(7).Object.keys;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(9);

	__webpack_require__(63)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 63 */
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
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(17)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _LSystem = __webpack_require__(24);

	var _LSystem2 = _interopRequireDefault(_LSystem);

	exports['default'] = {
	    koch: new _LSystem2['default']({
	        name: 'koch snowflake',
	        angle: 60,
	        axiom: 'F++F++F',
	        rules: {
	            'F': 'F-F++F-F'
	        }
	    }),

	    //arrow weed
	    arrow: new _LSystem2['default']({
	        name: 'arrow weed',
	        angle: 30,
	        axiom: 'X',
	        rules: {
	            'X': 'F[+X][-X]FX',
	            'F': 'FF'
	        }
	    }),

	    // weed 1
	    weed1: new _LSystem2['default']({
	        name: 'generic weed 1',
	        angle: 22.5,
	        axiom: 'X',
	        rules: {
	            'X': 'F-[[X]+X]+F[+FX]-X',
	            'F': 'FF'
	        },
	        length: 5
	    }),

	    // weed 2
	    weed2: new _LSystem2['default']({
	        name: 'generic weed 2',
	        angle: 25,
	        axiom: 'X',
	        rules: {
	            'X': 'F[-X]F[-X]+X',
	            'F': 'FF'
	        },
	        length: 5
	    }),

	    // weed 3
	    weed3: new _LSystem2['default']({
	        name: 'generic weed 3',
	        angle: 25,
	        axiom: 'F',
	        rules: {
	            'F': 'F[+F]F[-F]F'
	        },
	        length: 5
	    }),

	    weed4: new _LSystem2['default']({
	        name: 'generic weed 4',
	        angle: 22.5,
	        axiom: 'F',
	        rules: {
	            'F': 'FF-[-F+F+F]+[+F-F-F]'
	        },
	        length: 5
	    }),

	    sWeed1: new _LSystem2['default']({
	        name: 'stochastic generic weed 1',
	        angle: 22.5,
	        axiom: 'X',
	        rules: {
	            'X': ['F-[[X]+X]+F[+FX]-X', 'F+[[X]-X]-F[-FX]+X'],
	            'F': 'FF'
	        }
	    })
	};
	module.exports = exports['default'];

/***/ }
/******/ ]);