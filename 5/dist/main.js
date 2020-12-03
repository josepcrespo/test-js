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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _videomanager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./videomanager */ \"./src/videomanager.js\");\n\n\nconst target = document.getElementById('sunmedia')\n/**\n *\n * @param {string} src The video media file url\n * @return {HTMLVideoElement}\n */\nconst videoElm = Object(_videomanager__WEBPACK_IMPORTED_MODULE_0__[\"createVideoElement\"])('https://vod.addevweb.com/sunmedia/demos/v/normal.mp4')\n/**\n * @param {HTMLDivElement} targetElm\n * @param {HTMLVideoElement} videoElm\n */\nObject(_videomanager__WEBPACK_IMPORTED_MODULE_0__[\"onInsertVideoWhenTargetIsVisible\"])(target, videoElm)\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/videomanager.js":
/*!*****************************!*\
  !*** ./src/videomanager.js ***!
  \*****************************/
/*! exports provided: createVideoElement, onInsertVideoWhenTargetIsVisible, onVisible, isElementInViewport, autoplayVideoElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createVideoElement\", function() { return createVideoElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"onInsertVideoWhenTargetIsVisible\", function() { return onInsertVideoWhenTargetIsVisible; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"onVisible\", function() { return onVisible; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isElementInViewport\", function() { return isElementInViewport; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"autoplayVideoElement\", function() { return autoplayVideoElement; });\n\n/**\n * Creates a new video element from a certain source\n * @param {string} source\n * @return {HTMLVideoElement}\n */\nfunction createVideoElement (source) {\n  if (!source) {\n    return\n  }\n  const videoElement = document.createElement('video')\n  videoElement.src = source\n  return videoElement\n}\n\n/**\n * Waits until the target is visible to insert the a video element\n * By default the video will pause when the container is not visible\n * @param {HTMLDivElement} target\n * @param {HTMLVideoElement} videoElement\n * @param {{pauseOnNoVisible: boolean}} options\n */\nfunction onInsertVideoWhenTargetIsVisible (target, videoElement, options = { pauseOnNoVisible: true }) {\n  // Store if the element has been appended, we do not want to append it over and over\n  let appended = false\n  const cleanFn = onVisible(target, (visibilityEvent) => {\n    if (!appended && visibilityEvent.visible) {\n      target.appendChild(videoElement)\n      appended = true\n    }\n    // Check if we need to pause the video when it is not visible\n    if (appended && !visibilityEvent.visible && options.pauseOnNoVisible) {\n      videoElement.pause()\n    }\n    // Try to autoplay the selected video\n    if (appended && visibilityEvent.visible) {\n      autoplayVideoElement(videoElement)\n    }\n  })\n  // Once the video has ended we need to remove the child from the target element\n  // and clean all the handlers\n  videoElement.addEventListener('ended', () => {\n    target.removeChild(videoElement)\n    cleanFn()\n  })\n}\n\n/**\n * Given an element the callback given as parameter will be called\n * The callback will report the visibility of the element\n * @param {HTMLElement} element\n * @param {Function} callback\n */\nfunction onVisible (element, callback) {\n  // The callback will be called with the visibility of the element\n  const visibilityHandler = () => {\n    callback({ visible: isElementInViewport(element) })\n  }\n\n  window.addEventListener('load', visibilityHandler)\n  window.addEventListener('resize', visibilityHandler)\n  window.addEventListener('scroll', visibilityHandler)\n\n  // This will give us a way to unsubscribe from the events\n  return () => {\n    window.removeEventListener('load', visibilityHandler)\n    window.removeEventListener('resize', visibilityHandler)\n    window.removeEventListener('scroll', visibilityHandler)\n  }\n}\n\n/**\n * Checks if the elemen is in the viewport\n * @param {HTMLElement} element\n */\nfunction isElementInViewport (element) {\n  if (!element) {\n    return false\n  }\n\n  const rect = element.getBoundingClientRect()\n\n  // If no rect is given, return early\n  if (!rect) {\n    return false\n  }\n\n  return (\n    rect.bottom > 0 &&\n        rect.right > 0 &&\n        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&\n        rect.top < (window.innerHeight || document.documentElement.clientHeight)\n  )\n}\n\n/**\n * In case we are not able to play the video, mute it and try again\n * @param {HTMLVideoElement} videoElement\n */\nasync function autoplayVideoElement (videoElement) {\n  try {\n    await videoElement.play()\n  } catch (e) {\n    videoElement.muted = true\n    videoElement.play()\n  }\n}\n\n\n//# sourceURL=webpack:///./src/videomanager.js?");

/***/ })

/******/ });