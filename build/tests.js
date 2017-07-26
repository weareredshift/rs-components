/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/typeof");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(0);

var _typeof3 = _interopRequireDefault(_typeof2);

var _Home = __webpack_require__(7);

var _Home2 = _interopRequireDefault(_Home);

var _ava = __webpack_require__(9);

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('my passing test', function (t) {
  t.pass();
});

var _component = void 0;

_ava2.default.beforeEach(function () {
  _component = _Home2.default.component();
});

(0, _ava2.default)('Should return a route configuration object', function (t) {
  t.is(typeof _Home2.default === 'undefined' ? 'undefined' : (0, _typeof3.default)(_Home2.default), 'object');
});

(0, _ava2.default)('Should define a route component', function (t) {
  t.is(_component.type, 'div');
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, ".HomeView__duck__3Wnig {\n  display: block;\n  width: 120px;\n  margin: 1.5rem auto; }\n", ""]);

// exports
exports.locals = {
	"duck": "HomeView__duck__3Wnig"
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2fb6b82ccda39ee98d2e9639c8c7f84e.jpg";

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var cov_1hwos1ghfg=function(){var path='/Users/talex/git/react-redux-starter-kit/src/routes/Home/components/HomeView.js',hash='6329633a290e871105c27f86ad6d6b9b64b3f71a',global=new Function('return this')(),gcv='__coverage__',coverageData={path:'/Users/talex/git/react-redux-starter-kit/src/routes/Home/components/HomeView.js',statementMap:{'0':{start:{line:3,column:0},end:{line:5,column:3}},'1':{start:{line:6,column:0},end:{line:6,column:29}},'2':{start:{line:8,column:13},end:{line:8,column:29}},'3':{start:{line:10,column:14},end:{line:10,column:44}},'4':{start:{line:12,column:12},end:{line:12,column:50}},'5':{start:{line:14,column:13},end:{line:14,column:42}},'6':{start:{line:16,column:18},end:{line:16,column:40}},'7':{start:{line:18,column:25},end:{line:18,column:59}},'8':{start:{line:20,column:0},end:{line:20,column:27}},'9':{start:{line:22,column:39},end:{line:22,column:93}},'10':{start:{line:24,column:15},end:{line:36,column:1}},'11':{start:{line:25,column:19},end:{line:25,column:34}},'12':{start:{line:26,column:2},end:{line:35,column:4}},'13':{start:{line:38,column:22},end:{line:42,column:1}},'14':{start:{line:39,column:2},end:{line:41,column:4}},'15':{start:{line:44,column:0},end:{line:44,column:70}}},fnMap:{'0':{name:'_interopRequireDefault',decl:{start:{line:22,column:9},end:{line:22,column:31}},loc:{start:{line:22,column:37},end:{line:22,column:95}},line:22},'1':{name:'HomeView',decl:{start:{line:24,column:43},end:{line:24,column:51}},loc:{start:{line:24,column:58},end:{line:36,column:1}},line:24},'2':{name:'mapStateToProps',decl:{start:{line:38,column:31},end:{line:38,column:46}},loc:{start:{line:38,column:54},end:{line:42,column:1}},line:38}},branchMap:{'0':{loc:{start:{line:22,column:46},end:{line:22,column:92}},type:'cond-expr',locations:[{start:{line:22,column:70},end:{line:22,column:73}},{start:{line:22,column:76},end:{line:22,column:92}}],line:22},'1':{loc:{start:{line:22,column:46},end:{line:22,column:67}},type:'binary-expr',locations:[{start:{line:22,column:46},end:{line:22,column:49}},{start:{line:22,column:53},end:{line:22,column:67}}],line:22}},s:{'0':0,'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0},f:{'0':0,'1':0,'2':0},b:{'0':[0,0],'1':[0,0]},inputSourceMap:null,_coverageSchema:'332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'},coverage=global[gcv]||(global[gcv]={});if(coverage[path]&&coverage[path].hash===hash){return coverage[path];}coverageData.hash=hash;return coverage[path]=coverageData;}();++cov_1hwos1ghfg.s[0];Object.defineProperty(exports,"__esModule",{value:true});++cov_1hwos1ghfg.s[1];exports.HomeView=undefined;var _react=(++cov_1hwos1ghfg.s[2],__webpack_require__(10));var _react2=(++cov_1hwos1ghfg.s[3],_interopRequireDefault(_react));var _Duck=(++cov_1hwos1ghfg.s[4],__webpack_require__(5));var _Duck2=(++cov_1hwos1ghfg.s[5],_interopRequireDefault(_Duck));var _reactRedux=(++cov_1hwos1ghfg.s[6],__webpack_require__(11));var _responsiveHelpers=(++cov_1hwos1ghfg.s[7],__webpack_require__(8));++cov_1hwos1ghfg.s[8];__webpack_require__(3);function _interopRequireDefault(obj){++cov_1hwos1ghfg.f[0];++cov_1hwos1ghfg.s[9];return(++cov_1hwos1ghfg.b[1][0],obj)&&(++cov_1hwos1ghfg.b[1][1],obj.__esModule)?(++cov_1hwos1ghfg.b[0][0],obj):(++cov_1hwos1ghfg.b[0][1],{default:obj});}var HomeView=(++cov_1hwos1ghfg.s[10],exports.HomeView=function HomeView(_ref){++cov_1hwos1ghfg.f[1];var breakpoint=(++cov_1hwos1ghfg.s[11],_ref.breakpoint);++cov_1hwos1ghfg.s[12];return _react2.default.createElement('div',{className:(0,_responsiveHelpers.setClass)({default:'py6',mobileLg:'py3'},breakpoint)},_react2.default.createElement('h4',{className:'typ--center'},'Welcome!'),_react2.default.createElement('img',{alt:'This is a duck, because Redux!',className:'duck',src:_Duck2.default}));});++cov_1hwos1ghfg.s[13];var mapStateToProps=function mapStateToProps(state){++cov_1hwos1ghfg.f[2];++cov_1hwos1ghfg.s[14];return{breakpoint:state.breakpoint};};++cov_1hwos1ghfg.s[15];exports.default=(0,_reactRedux.connect)(mapStateToProps)(HomeView);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var cov_2h8yg4fmz4=function(){var path='/Users/talex/git/react-redux-starter-kit/src/routes/Home/index.js',hash='7e8c0d556f7d4f94d8b77547f69dff340ddcaa5a',global=new Function('return this')(),gcv='__coverage__',coverageData={path:'/Users/talex/git/react-redux-starter-kit/src/routes/Home/index.js',statementMap:{'0':{start:{line:3,column:0},end:{line:5,column:3}},'1':{start:{line:7,column:16},end:{line:7,column:48}},'2':{start:{line:9,column:17},end:{line:9,column:50}},'3':{start:{line:11,column:39},end:{line:11,column:93}},'4':{start:{line:14,column:0},end:{line:16,column:2}}},fnMap:{'0':{name:'_interopRequireDefault',decl:{start:{line:11,column:9},end:{line:11,column:31}},loc:{start:{line:11,column:37},end:{line:11,column:95}},line:11}},branchMap:{'0':{loc:{start:{line:11,column:46},end:{line:11,column:92}},type:'cond-expr',locations:[{start:{line:11,column:70},end:{line:11,column:73}},{start:{line:11,column:76},end:{line:11,column:92}}],line:11},'1':{loc:{start:{line:11,column:46},end:{line:11,column:67}},type:'binary-expr',locations:[{start:{line:11,column:46},end:{line:11,column:49}},{start:{line:11,column:53},end:{line:11,column:67}}],line:11}},s:{'0':0,'1':0,'2':0,'3':0,'4':0},f:{'0':0},b:{'0':[0,0],'1':[0,0]},inputSourceMap:null,_coverageSchema:'332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'},coverage=global[gcv]||(global[gcv]={});if(coverage[path]&&coverage[path].hash===hash){return coverage[path];}coverageData.hash=hash;return coverage[path]=coverageData;}();++cov_2h8yg4fmz4.s[0];Object.defineProperty(exports,"__esModule",{value:true});var _HomeView=(++cov_2h8yg4fmz4.s[1],__webpack_require__(6));var _HomeView2=(++cov_2h8yg4fmz4.s[2],_interopRequireDefault(_HomeView));function _interopRequireDefault(obj){++cov_2h8yg4fmz4.f[0];++cov_2h8yg4fmz4.s[3];return(++cov_2h8yg4fmz4.b[1][0],obj)&&(++cov_2h8yg4fmz4.b[1][1],obj.__esModule)?(++cov_2h8yg4fmz4.b[0][0],obj):(++cov_2h8yg4fmz4.b[0][1],{default:obj});}// Sync route definition
++cov_2h8yg4fmz4.s[4];exports.default={component:_HomeView2.default};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var cov_t4e07c19x=function(){var path='/Users/talex/git/react-redux-starter-kit/src/utils/responsiveHelpers.js',hash='9c818babd82089683b566891c92a4dcbbf88879b',global=new Function('return this')(),gcv='__coverage__',coverageData={path:'/Users/talex/git/react-redux-starter-kit/src/utils/responsiveHelpers.js',statementMap:{'0':{start:{line:3,column:0},end:{line:5,column:3}},'1':{start:{line:6,column:0},end:{line:6,column:116}},'2':{start:{line:8,column:15},end:{line:8,column:54}},'3':{start:{line:10,column:15},end:{line:10,column:47}},'4':{start:{line:12,column:39},end:{line:12,column:93}},'5':{start:{line:18,column:18},end:{line:29,column:1}},'6':{start:{line:39,column:15},end:{line:54,column:1}},'7':{start:{line:40,column:2},end:{line:40,column:60}},'8':{start:{line:40,column:38},end:{line:40,column:60}},'9':{start:{line:41,column:2},end:{line:43,column:3}},'10':{start:{line:42,column:4},end:{line:42,column:165}},'11':{start:{line:45,column:2},end:{line:45,column:64}},'12':{start:{line:45,column:37},end:{line:45,column:64}},'13':{start:{line:47,column:18},end:{line:47,column:52}},'14':{start:{line:48,column:22},end:{line:48,column:56}},'15':{start:{line:49,column:24},end:{line:51,column:17}},'16':{start:{line:50,column:4},end:{line:50,column:25}},'17':{start:{line:53,column:2},end:{line:53,column:35}},'18':{start:{line:57,column:19},end:{line:57,column:38}},'19':{start:{line:59,column:2},end:{line:61,column:3}},'20':{start:{line:60,column:4},end:{line:60,column:64}},'21':{start:{line:63,column:2},end:{line:63,column:20}},'22':{start:{line:77,column:30},end:{line:85,column:1}},'23':{start:{line:78,column:19},end:{line:78,column:124}},'24':{start:{line:80,column:2},end:{line:84,column:3}},'25':{start:{line:81,column:4},end:{line:81,column:16}},'26':{start:{line:83,column:4},end:{line:83,column:17}},'27':{start:{line:98,column:27},end:{line:106,column:1}},'28':{start:{line:99,column:19},end:{line:99,column:124}},'29':{start:{line:101,column:2},end:{line:105,column:3}},'30':{start:{line:102,column:4},end:{line:102,column:16}},'31':{start:{line:104,column:4},end:{line:104,column:17}}},fnMap:{'0':{name:'_interopRequireDefault',decl:{start:{line:12,column:9},end:{line:12,column:31}},loc:{start:{line:12,column:37},end:{line:12,column:95}},line:12},'1':{name:'setClass',decl:{start:{line:39,column:43},end:{line:39,column:51}},loc:{start:{line:39,column:74},end:{line:54,column:1}},line:39},'2':{name:'(anonymous_2)',decl:{start:{line:49,column:60},end:{line:49,column:61}},loc:{start:{line:49,column:75},end:{line:51,column:3}},line:49},'3':{name:'breakpointFromString',decl:{start:{line:56,column:9},end:{line:56,column:29}},loc:{start:{line:56,column:38},end:{line:64,column:1}},line:56},'4':{name:'breakpointIsGreaterThan',decl:{start:{line:77,column:73},end:{line:77,column:96}},loc:{start:{line:77,column:141},end:{line:85,column:1}},line:77},'5':{name:'breakpointIsLessThan',decl:{start:{line:98,column:67},end:{line:98,column:87}},loc:{start:{line:98,column:132},end:{line:106,column:1}},line:98}},branchMap:{'0':{loc:{start:{line:12,column:46},end:{line:12,column:92}},type:'cond-expr',locations:[{start:{line:12,column:70},end:{line:12,column:73}},{start:{line:12,column:76},end:{line:12,column:92}}],line:12},'1':{loc:{start:{line:12,column:46},end:{line:12,column:67}},type:'binary-expr',locations:[{start:{line:12,column:46},end:{line:12,column:49}},{start:{line:12,column:53},end:{line:12,column:67}}],line:12},'2':{loc:{start:{line:40,column:2},end:{line:40,column:60}},type:'if',locations:[{start:{line:40,column:2},end:{line:40,column:60}},{start:{line:40,column:2},end:{line:40,column:60}}],line:40},'3':{loc:{start:{line:41,column:2},end:{line:43,column:3}},type:'if',locations:[{start:{line:41,column:2},end:{line:43,column:3}},{start:{line:41,column:2},end:{line:43,column:3}}],line:41},'4':{loc:{start:{line:41,column:7},end:{line:41,column:90}},type:'cond-expr',locations:[{start:{line:41,column:43},end:{line:41,column:54}},{start:{line:41,column:57},end:{line:41,column:90}}],line:41},'5':{loc:{start:{line:42,column:73},end:{line:42,column:156}},type:'cond-expr',locations:[{start:{line:42,column:109},end:{line:42,column:120}},{start:{line:42,column:123},end:{line:42,column:156}}],line:42},'6':{loc:{start:{line:45,column:2},end:{line:45,column:64}},type:'if',locations:[{start:{line:45,column:2},end:{line:45,column:64}},{start:{line:45,column:2},end:{line:45,column:64}}],line:45},'7':{loc:{start:{line:49,column:24},end:{line:51,column:17}},type:'binary-expr',locations:[{start:{line:49,column:24},end:{line:51,column:4}},{start:{line:51,column:8},end:{line:51,column:17}}],line:49},'8':{loc:{start:{line:59,column:2},end:{line:61,column:3}},type:'if',locations:[{start:{line:59,column:2},end:{line:61,column:3}},{start:{line:59,column:2},end:{line:61,column:3}}],line:59},'9':{loc:{start:{line:78,column:19},end:{line:78,column:124}},type:'cond-expr',locations:[{start:{line:78,column:61},end:{line:78,column:102}},{start:{line:78,column:105},end:{line:78,column:124}}],line:78},'10':{loc:{start:{line:80,column:2},end:{line:84,column:3}},type:'if',locations:[{start:{line:80,column:2},end:{line:84,column:3}},{start:{line:80,column:2},end:{line:84,column:3}}],line:80},'11':{loc:{start:{line:80,column:6},end:{line:80,column:74}},type:'binary-expr',locations:[{start:{line:80,column:6},end:{line:80,column:36}},{start:{line:80,column:40},end:{line:80,column:74}}],line:80},'12':{loc:{start:{line:99,column:19},end:{line:99,column:124}},type:'cond-expr',locations:[{start:{line:99,column:61},end:{line:99,column:102}},{start:{line:99,column:105},end:{line:99,column:124}}],line:99},'13':{loc:{start:{line:101,column:2},end:{line:105,column:3}},type:'if',locations:[{start:{line:101,column:2},end:{line:105,column:3}},{start:{line:101,column:2},end:{line:105,column:3}}],line:101},'14':{loc:{start:{line:101,column:6},end:{line:101,column:75}},type:'binary-expr',locations:[{start:{line:101,column:6},end:{line:101,column:36}},{start:{line:101,column:40},end:{line:101,column:75}}],line:101}},s:{'0':0,'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0,'17':0,'18':0,'19':0,'20':0,'21':0,'22':0,'23':0,'24':0,'25':0,'26':0,'27':0,'28':0,'29':0,'30':0,'31':0},f:{'0':0,'1':0,'2':0,'3':0,'4':0,'5':0},b:{'0':[0,0],'1':[0,0],'2':[0,0],'3':[0,0],'4':[0,0],'5':[0,0],'6':[0,0],'7':[0,0],'8':[0,0],'9':[0,0],'10':[0,0],'11':[0,0],'12':[0,0],'13':[0,0],'14':[0,0]},inputSourceMap:null,_coverageSchema:'332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'},coverage=global[gcv]||(global[gcv]={});if(coverage[path]&&coverage[path].hash===hash){return coverage[path];}coverageData.hash=hash;return coverage[path]=coverageData;}();++cov_t4e07c19x.s[0];Object.defineProperty(exports,"__esModule",{value:true});++cov_t4e07c19x.s[1];exports.breakpointIsLessThan=exports.breakpointIsGreaterThan=exports.setClass=exports.breakpoints=undefined;var _typeof2=(++cov_t4e07c19x.s[2],__webpack_require__(0));var _typeof3=(++cov_t4e07c19x.s[3],_interopRequireDefault(_typeof2));function _interopRequireDefault(obj){++cov_t4e07c19x.f[0];++cov_t4e07c19x.s[4];return(++cov_t4e07c19x.b[1][0],obj)&&(++cov_t4e07c19x.b[1][1],obj.__esModule)?(++cov_t4e07c19x.b[0][0],obj):(++cov_t4e07c19x.b[0][1],{default:obj});}/**
 * Object containing breakpoint names and sizes
 * @type {Object}
 */var breakpoints=(++cov_t4e07c19x.s[5],exports.breakpoints={desktopLg:1400,desktopMd:1300,desktopSm:1200,tabletLg:1040,tabletMd:991,tabletSm:840,mobileLg:767,mobileMd:540,mobileSm:400,mobileXsm:350});/**
 * Returns a string of classes that match / are adjacent to the current breakpoint
 * @param {classObj} classObj           Obj containing key / value pairs for desired breakpoints
 * @param {Object} breakpoint           Obj describing current breakpoint state
 * @param {string} breakpoint.name      String defining current breakpoint name
 * @param {number} breakpoint.size      Number defining current breakpoint size
 * @return {string}                     Returns class string that matches correct breakpoint
 */var setClass=(++cov_t4e07c19x.s[6],exports.setClass=function setClass(classObj,breakpoint){++cov_t4e07c19x.f[1];++cov_t4e07c19x.s[7];if(classObj.default===undefined){++cov_t4e07c19x.b[2][0];++cov_t4e07c19x.s[8];classObj.default='';}else{++cov_t4e07c19x.b[2][1];}++cov_t4e07c19x.s[9];if((typeof breakpoint==='undefined'?(++cov_t4e07c19x.b[4][0],'undefined'):(++cov_t4e07c19x.b[4][1],(0,_typeof3.default)(breakpoint)))!=='object'){++cov_t4e07c19x.b[3][0];++cov_t4e07c19x.s[10];throw new Error('Bad breakpoint type given: '+breakpoint+' ('+(typeof breakpoint==='undefined'?(++cov_t4e07c19x.b[5][0],'undefined'):(++cov_t4e07c19x.b[5][1],(0,_typeof3.default)(breakpoint)))+')');}else{++cov_t4e07c19x.b[3][1];}++cov_t4e07c19x.s[11];if(breakpoint.name==='default'){++cov_t4e07c19x.b[6][0];++cov_t4e07c19x.s[12];return classObj['default'];}else{++cov_t4e07c19x.b[6][1];}var sizeArray=(++cov_t4e07c19x.s[13],Object.keys(breakpoints).reverse());var startingIndex=(++cov_t4e07c19x.s[14],sizeArray.indexOf(breakpoint.name));var firstMatchedKey=(++cov_t4e07c19x.s[15],(++cov_t4e07c19x.b[7][0],sizeArray.slice(startingIndex).find(function(key){++cov_t4e07c19x.f[2];++cov_t4e07c19x.s[16];return classObj[key];}))||(++cov_t4e07c19x.b[7][1],'default'));++cov_t4e07c19x.s[17];return classObj[firstMatchedKey];});function breakpointFromString(string){++cov_t4e07c19x.f[3];var breakpoint=(++cov_t4e07c19x.s[18],breakpoints[string]);++cov_t4e07c19x.s[19];if(!breakpoint){++cov_t4e07c19x.b[8][0];++cov_t4e07c19x.s[20];throw new Error('Bad breakpoint variable given: '+string);}else{++cov_t4e07c19x.b[8][1];}++cov_t4e07c19x.s[21];return breakpoint;}/**
 * Returns a boolean indicating whether or not the currentBreakpointSize value
 * is greater than the passed breakpointToCompare value
 * @param {Object} breakpointToCompare           String or number, if string, it is used to retrieve
 *                                               the correct value from breakpoints[]
 * @param {number} currentBreakpointSize         Number indicating the current breakpoint value
 *                                               (usually breakpoint.size)
 * @return {boolean}                             Returns boolean that indicates whether the passed
 *                                               breakpointToCompare string or number is currently
 *                                               greater than the currentBreakpointSize
 */var breakpointIsGreaterThan=(++cov_t4e07c19x.s[22],exports.breakpointIsGreaterThan=function breakpointIsGreaterThan(breakpointToCompare,currentBreakpointSize){++cov_t4e07c19x.f[4];var comparison=(++cov_t4e07c19x.s[23],typeof breakpointToCompare==='string'?(++cov_t4e07c19x.b[9][0],breakpointFromString(breakpointToCompare)):(++cov_t4e07c19x.b[9][1],breakpointToCompare));++cov_t4e07c19x.s[24];if((++cov_t4e07c19x.b[11][0],currentBreakpointSize===null)||(++cov_t4e07c19x.b[11][1],currentBreakpointSize>comparison)){++cov_t4e07c19x.b[10][0];++cov_t4e07c19x.s[25];return true;}else{++cov_t4e07c19x.b[10][1];++cov_t4e07c19x.s[26];return false;}});/**
 * Returns a boolean indicating whether or not the currentBreakpointSize value
 * is less than the passed breakpointToCompare value
 * @param {Object} breakpointToCompare           String or number, if string, it is used to retrieve
 *                                               the correct value from breakpoints[]
 * @param {number} currentBreakpointSize         Number indicating the current breakpoint value
 *                                               (usually breakpoint.size)
 * @return {boolean}                             Returns boolean that indicates whether the passed
 *                                               breakpointToCompare string or number is currently
 *                                               less than the currentBreakpointSize
 */var breakpointIsLessThan=(++cov_t4e07c19x.s[27],exports.breakpointIsLessThan=function breakpointIsLessThan(breakpointToCompare,currentBreakpointSize){++cov_t4e07c19x.f[5];var comparison=(++cov_t4e07c19x.s[28],typeof breakpointToCompare==='string'?(++cov_t4e07c19x.b[12][0],breakpointFromString(breakpointToCompare)):(++cov_t4e07c19x.b[12][1],breakpointToCompare));++cov_t4e07c19x.s[29];if((++cov_t4e07c19x.b[14][0],currentBreakpointSize!==null)&&(++cov_t4e07c19x.b[14][1],currentBreakpointSize<=comparison)){++cov_t4e07c19x.b[13][0];++cov_t4e07c19x.s[30];return true;}else{++cov_t4e07c19x.b[13][1];++cov_t4e07c19x.s[31];return false;}});

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("ava");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })
/******/ ]);