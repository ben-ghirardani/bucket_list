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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var AjaxRequest = __webpack_require__(1);
var BucketView = __webpack_require__(2);
var AllCountriesView = __webpack_require__(3);


function app(){
    var countriesView = new AllCountriesView();
    var bucketView = new BucketView();
    var countriesData = new AjaxRequest("https://restcountries.eu/rest/v2/all");
    countriesData.get(countriesView.render);



    var bucketData = new AjaxRequest("http://localhost:3000/api/bucket-list");
    bucketData.get(bucketView.render);
    
    var form = document.querySelector("form");
    
    form.addEventListener("submit", function(event){
        event.preventDefault();
        var countryToAdd = countriesData.characters[this.countries.value];
        if (!countryToAdd.name) return;
        bucketData.post(countriesView.render, countryToAdd);

        var bucketUl = document.querySelector("#bucket-display");
        var nameLi = document.createElement('li');
        var deleteButton = document.createElement('button');
        var flag = document.createElement('img');
        var lineBreak = document.createElement('hr');
        deleteButton.id = this.countries.value;
        deleteButton.innerText = "Remove";
        nameLi.innerText = "Name: " + countryToAdd.name;
        flag.src = countryToAdd.flag;
        flag.width = 100;
        bucketUl.appendChild(flag);
        bucketUl.appendChild(nameLi);
        bucketUl.appendChild(deleteButton);
        bucketUl.appendChild(lineBreak);

    })

    
    
}

window.addEventListener('load', app);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var AjaxRequest= function(url) {
  this.url = url;
  this.data = [];
}

AjaxRequest.prototype.get = function(callback) {
  var request = new XMLHttpRequest();
  request.open("GET", this.url);
  request.onload = function(){
    if(request.status === 200){
      var jsonString = request.responseText;
      this.characters = JSON.parse(jsonString);
      callback(this.characters);
    }
  }.bind(this);
  request.send();
}

AjaxRequest.prototype.post = function(callback, data) {

  var request = new XMLHttpRequest();
  request.open("POST", this.url);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function(){
    if(request.status === 200){
      var jsonString = request.responseText;
      this.characters = JSON.parse(jsonString);
      callback(this.characters);
    }
  }.bind(this);
  request.send(JSON.stringify(data));
}

AjaxRequest.prototype.delete = function(index) {

  var request = new XMLHttpRequest();
  request.open("DELETE", this.url);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function(){
    if(request.status === 200){
      var jsonString = request.responseText;
      this.characters = JSON.parse(jsonString);
    }
  }.bind(this);
  request.send(JSON.stringify(index));
}

module.exports = AjaxRequest;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var BucketView = function(){

}

BucketView.prototype.render = function(data, request){
    var bucketUl = document.querySelector("#bucket-display");
    
    for (var i = 0; i < data.length; i++) {
        var nameLi = document.createElement('li');
        var deleteButton = document.createElement('button');
        var flag = document.createElement('img');
        var lineBreak = document.createElement('hr');
        deleteButton.value = i;
        deleteButton.innerText = "Remove";
        nameLi.innerText = "Name: " + data[i].name;
        flag.src = data[i].flag;
				flag.width = 100;
				
        deleteButton.addEventListener("click", function(){
         var AjaxRequest = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./services/ajax_request\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
         var bucketData = new AjaxRequest("http://localhost:3000/api/bucket-list");
          bucketData.delete(this.value);
    })

        bucketUl.appendChild(flag);
        bucketUl.appendChild(nameLi);
        bucketUl.appendChild(deleteButton);
        bucketUl.appendChild(lineBreak);
    }
}

module.exports = BucketView;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var AllCountriesView = function(){

}

AllCountriesView.prototype.render = function(data){
    var select = document.querySelector("#country-list");

    for (var i = 0; i < data.length; i++) {
        var countryOption = document.createElement('option');
        countryOption.value = i;
        countryOption.innerText = data[i].name;
        select.appendChild(countryOption);
    }
}

module.exports = AllCountriesView;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map