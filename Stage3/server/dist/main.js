/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apiError/apiError.js":
/*!**********************************!*\
  !*** ./src/apiError/apiError.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass ApiError extends Error {\n  constructor(code, message) {\n    super();\n    this.code = code;\n    this.message = message;\n  }\n\n  static badRequest(message) {\n    return new ApiError(400, message);\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiError);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBpRXJyb3IvYXBpRXJyb3IuanMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLFFBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvYXBpRXJyb3IvYXBpRXJyb3IuanM/ZjJlYSJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcGlFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoY29kZSwgbWVzc2FnZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jb2RlID0gY29kZTtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB9XG5cbiAgc3RhdGljIGJhZFJlcXVlc3QobWVzc2FnZSkge1xuICAgIHJldHVybiBuZXcgQXBpRXJyb3IoNDAwLCBtZXNzYWdlKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQXBpRXJyb3I7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/apiError/apiError.js\n");

/***/ }),

/***/ "./src/controller/groupController.js":
/*!*******************************************!*\
  !*** ./src/controller/groupController.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _service_groupService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../service/groupService */ \"./src/service/groupService.js\");\n\n\nclass GroupController {\n\n  static async getGroup(req, res, next) {\n    try {\n      const groupsParamValueToFind = req.params.paramValue;\n      const groupsParamNameToFind = req.query.paramName;\n\n      console.log(groupsParamNameToFind);\n      console.log(groupsParamValueToFind);\n\n      const response = await _service_groupService__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getGroup(groupsParamNameToFind, groupsParamValueToFind);\n\n      return res.json(response);\n    } catch (e) {\n      next(e);\n    }\n  }\n\n  static async createGroup(req, res, next) {\n    try {\n      const { groupName, groupTitle } = req.body;\n      const response = await _service_groupService__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createGroup(groupName, groupTitle);\n\n      return res.json(response);\n    } catch (e) {\n      next(e);\n    }\n  };\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GroupController);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udHJvbGxlci9ncm91cENvbnRyb2xsZXIuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBbUQ7O0FBRW5EOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNkJBQTZCLHNFQUFxQjs7QUFFbEQ7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjLHdCQUF3QjtBQUN0Qyw2QkFBNkIseUVBQXdCOztBQUVyRDtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaUVBQWUsZUFBZSIsInNvdXJjZXMiOlsid2VicGFjazovL3NlcnZlci8uL3NyYy9jb250cm9sbGVyL2dyb3VwQ29udHJvbGxlci5qcz81NjBmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHcm91cFNlcnZpY2UgZnJvbSBcIi4uL3NlcnZpY2UvZ3JvdXBTZXJ2aWNlXCI7XG5cbmNsYXNzIEdyb3VwQ29udHJvbGxlciB7XG5cbiAgc3RhdGljIGFzeW5jIGdldEdyb3VwKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGdyb3Vwc1BhcmFtVmFsdWVUb0ZpbmQgPSByZXEucGFyYW1zLnBhcmFtVmFsdWU7XG4gICAgICBjb25zdCBncm91cHNQYXJhbU5hbWVUb0ZpbmQgPSByZXEucXVlcnkucGFyYW1OYW1lO1xuXG4gICAgICBjb25zb2xlLmxvZyhncm91cHNQYXJhbU5hbWVUb0ZpbmQpO1xuICAgICAgY29uc29sZS5sb2coZ3JvdXBzUGFyYW1WYWx1ZVRvRmluZCk7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgR3JvdXBTZXJ2aWNlLmdldEdyb3VwKGdyb3Vwc1BhcmFtTmFtZVRvRmluZCwgZ3JvdXBzUGFyYW1WYWx1ZVRvRmluZCk7XG5cbiAgICAgIHJldHVybiByZXMuanNvbihyZXNwb25zZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbmV4dChlKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgY3JlYXRlR3JvdXAocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBncm91cE5hbWUsIGdyb3VwVGl0bGUgfSA9IHJlcS5ib2R5O1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBHcm91cFNlcnZpY2UuY3JlYXRlR3JvdXAoZ3JvdXBOYW1lLCBncm91cFRpdGxlKTtcblxuICAgICAgcmV0dXJuIHJlcy5qc29uKHJlc3BvbnNlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBuZXh0KGUpO1xuICAgIH1cbiAgfTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBHcm91cENvbnRyb2xsZXI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/controller/groupController.js\n");

/***/ }),

/***/ "./src/controller/userController.js":
/*!******************************************!*\
  !*** ./src/controller/userController.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/models */ \"./src/models/models.js\");\n/* harmony import */ var _service_userService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/userService */ \"./src/service/userService.js\");\n\n\n\nclass UserController {\n\n  static async getUser(req, res, next) {\n    try {\n      const usersParamValueToFind = req.params.paramValue;\n      const usersParamNameToFind = req.query.paramName;\n\n      const response = await _service_userService__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getUser(usersParamNameToFind, usersParamValueToFind);\n\n      return res.json(response);\n    } catch (e) {\n      next(e);\n    }\n  };\n\n  static async createUser(req, res, next) {\n    try {\n      console.log(req.body);\n      const { username, firstName, lastName, email } = req.body;\n      const userCreationResponse = await _service_userService__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createUser(username, firstName, lastName, email);\n\n      return res.json(userCreationResponse);\n    } catch (e) {\n      next(e);\n    }\n  };\n\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserController);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udHJvbGxlci91c2VyQ29udHJvbGxlci5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBNkM7QUFDSTs7QUFFakQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkJBQTZCLG9FQUFtQjs7QUFFaEQ7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsdUNBQXVDO0FBQ3JELHlDQUF5Qyx1RUFBc0I7O0FBRS9EO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlFQUFlLGNBQWMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvY29udHJvbGxlci91c2VyQ29udHJvbGxlci5qcz8wNGE1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gXCIuLi9tb2RlbHMvbW9kZWxzXCI7XG5pbXBvcnQgVXNlclNlcnZpY2UgZnJvbSBcIi4uL3NlcnZpY2UvdXNlclNlcnZpY2VcIjtcblxuY2xhc3MgVXNlckNvbnRyb2xsZXIge1xuXG4gIHN0YXRpYyBhc3luYyBnZXRVc2VyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVzZXJzUGFyYW1WYWx1ZVRvRmluZCA9IHJlcS5wYXJhbXMucGFyYW1WYWx1ZTtcbiAgICAgIGNvbnN0IHVzZXJzUGFyYW1OYW1lVG9GaW5kID0gcmVxLnF1ZXJ5LnBhcmFtTmFtZTtcblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBVc2VyU2VydmljZS5nZXRVc2VyKHVzZXJzUGFyYW1OYW1lVG9GaW5kLCB1c2Vyc1BhcmFtVmFsdWVUb0ZpbmQpO1xuXG4gICAgICByZXR1cm4gcmVzLmpzb24ocmVzcG9uc2UpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIG5leHQoZSk7XG4gICAgfVxuICB9O1xuXG4gIHN0YXRpYyBhc3luYyBjcmVhdGVVc2VyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcS5ib2R5KTtcbiAgICAgIGNvbnN0IHsgdXNlcm5hbWUsIGZpcnN0TmFtZSwgbGFzdE5hbWUsIGVtYWlsIH0gPSByZXEuYm9keTtcbiAgICAgIGNvbnN0IHVzZXJDcmVhdGlvblJlc3BvbnNlID0gYXdhaXQgVXNlclNlcnZpY2UuY3JlYXRlVXNlcih1c2VybmFtZSwgZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwpO1xuXG4gICAgICByZXR1cm4gcmVzLmpzb24odXNlckNyZWF0aW9uUmVzcG9uc2UpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIG5leHQoZSk7XG4gICAgfVxuICB9O1xuXG59XG5leHBvcnQgZGVmYXVsdCBVc2VyQ29udHJvbGxlcjsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/controller/userController.js\n");

/***/ }),

/***/ "./src/db/index.js":
/*!*************************!*\
  !*** ./src/db/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"connectToTheMongoDB\": () => (/* binding */ connectToTheMongoDB)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _apiError_apiError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../apiError/apiError */ \"./src/apiError/apiError.js\");\n\n\n\nfunction connectToTheMongoDB() {\n  mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(\"mongodb://localhost:27017/admin-panel-test-task\", () => {\n    console.log(\"Connected to the mongoDB\");\n  });\n}\n\nasync function checkForTheDuplication(Model, document, fieldsToCheck) {\n\n  async function findDuplicate(document, paramName) {\n    const duplicate = await Model.findOne({\n      [paramName]: document[paramName]\n    });\n\n    if (duplicate) {\n      throw _apiError_apiError__WEBPACK_IMPORTED_MODULE_1__[\"default\"].badRequest(`${paramName} for ${Model.collection.name} must be unique`);\n    }\n  }\n\n  for (let fieldVal of fieldsToCheck) {\n    if (!Model.schema.obj[fieldVal]) {\n      continue;\n    }\n\n    if (Array.isArray(document)) {\n\n      for (let docVal of document) {\n        await findDuplicate(docVal, fieldVal);\n      }\n\n    }\n\n    await findDuplicate(document, fieldVal);\n  }\n\n}\n\n// OVERWRITE mongoose.Model.create method\n\nconst create = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Model.create);\n\n(mongoose__WEBPACK_IMPORTED_MODULE_0___default().Model.create) = async function (docs, options, callback) {\n  if (options && options.checkForDuplications) {\n    await checkForTheDuplication(this, docs, options.checkForDuplications);\n  }\n\n  return create.apply(this, arguments);\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZGIvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFnQztBQUNZOztBQUVyQztBQUNQLEVBQUUsdURBQWdCO0FBQ2xCO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxZQUFZLHFFQUFtQixJQUFJLFdBQVcsTUFBTSx1QkFBdUI7QUFDM0U7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxlQUFlLDhEQUFxQjs7QUFFcEMsOERBQXFCO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VydmVyLy4vc3JjL2RiL2luZGV4LmpzPzgxNDkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xuaW1wb3J0IEFwaUVycm9yIGZyb20gXCIuLi9hcGlFcnJvci9hcGlFcnJvclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gY29ubmVjdFRvVGhlTW9uZ29EQigpIHtcbiAgbW9uZ29vc2UuY29ubmVjdChcIm1vbmdvZGI6Ly9sb2NhbGhvc3Q6MjcwMTcvYWRtaW4tcGFuZWwtdGVzdC10YXNrXCIsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3RlZCB0byB0aGUgbW9uZ29EQlwiKTtcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNoZWNrRm9yVGhlRHVwbGljYXRpb24oTW9kZWwsIGRvY3VtZW50LCBmaWVsZHNUb0NoZWNrKSB7XG5cbiAgYXN5bmMgZnVuY3Rpb24gZmluZER1cGxpY2F0ZShkb2N1bWVudCwgcGFyYW1OYW1lKSB7XG4gICAgY29uc3QgZHVwbGljYXRlID0gYXdhaXQgTW9kZWwuZmluZE9uZSh7XG4gICAgICBbcGFyYW1OYW1lXTogZG9jdW1lbnRbcGFyYW1OYW1lXVxuICAgIH0pO1xuXG4gICAgaWYgKGR1cGxpY2F0ZSkge1xuICAgICAgdGhyb3cgQXBpRXJyb3IuYmFkUmVxdWVzdChgJHtwYXJhbU5hbWV9IGZvciAke01vZGVsLmNvbGxlY3Rpb24ubmFtZX0gbXVzdCBiZSB1bmlxdWVgKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBmaWVsZFZhbCBvZiBmaWVsZHNUb0NoZWNrKSB7XG4gICAgaWYgKCFNb2RlbC5zY2hlbWEub2JqW2ZpZWxkVmFsXSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZG9jdW1lbnQpKSB7XG5cbiAgICAgIGZvciAobGV0IGRvY1ZhbCBvZiBkb2N1bWVudCkge1xuICAgICAgICBhd2FpdCBmaW5kRHVwbGljYXRlKGRvY1ZhbCwgZmllbGRWYWwpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgYXdhaXQgZmluZER1cGxpY2F0ZShkb2N1bWVudCwgZmllbGRWYWwpO1xuICB9XG5cbn1cblxuLy8gT1ZFUldSSVRFIG1vbmdvb3NlLk1vZGVsLmNyZWF0ZSBtZXRob2RcblxuY29uc3QgY3JlYXRlID0gbW9uZ29vc2UuTW9kZWwuY3JlYXRlO1xuXG5tb25nb29zZS5Nb2RlbC5jcmVhdGUgPSBhc3luYyBmdW5jdGlvbiAoZG9jcywgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5jaGVja0ZvckR1cGxpY2F0aW9ucykge1xuICAgIGF3YWl0IGNoZWNrRm9yVGhlRHVwbGljYXRpb24odGhpcywgZG9jcywgb3B0aW9ucy5jaGVja0ZvckR1cGxpY2F0aW9ucyk7XG4gIH1cblxuICByZXR1cm4gY3JlYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/db/index.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv/config */ \"dotenv/config\");\n/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv_config__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./db */ \"./src/db/index.js\");\n/* harmony import */ var _middleware_errorMiddleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./middleware/errorMiddleware */ \"./src/middleware/errorMiddleware.js\");\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes */ \"./src/routes/index.js\");\n\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_1___default()();\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default().json());\napp.use('/api', _routes__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\napp.use(_middleware_errorMiddleware__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\nconst PORT = process.env.PORT || 5000;\n\nasync function start() {\n  try {\n    (0,_db__WEBPACK_IMPORTED_MODULE_2__.connectToTheMongoDB)();\n    app.listen(PORT, () => {\n      console.log(`Server started at port ${PORT}`);\n    });\n  } catch (e) {\n    console.log(e);\n  }\n\n}\nstart();\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBdUI7QUFDTztBQUNhO0FBQ2dCO0FBQ3pCOztBQUVsQyxZQUFZLDhDQUFPO0FBQ25CLFFBQVEsbURBQVk7QUFDcEIsZ0JBQWdCLCtDQUFVO0FBQzFCLFFBQVEsbUVBQWU7QUFDdkI7O0FBRUE7QUFDQTtBQUNBLElBQUksd0RBQW1CO0FBQ3ZCO0FBQ0EsNENBQTRDLEtBQUs7QUFDakQsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2RvdGVudi9jb25maWcnO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBjb25uZWN0VG9UaGVNb25nb0RCIH0gZnJvbSAnLi9kYic7XG5pbXBvcnQgZXJyb3JNaWRkbGV3YXJlIGZyb20gJy4vbWlkZGxld2FyZS9lcnJvck1pZGRsZXdhcmUnO1xuaW1wb3J0IG1haW5Sb3V0ZXIgZnJvbSAnLi9yb3V0ZXMnO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5hcHAudXNlKGV4cHJlc3MuanNvbigpKTtcbmFwcC51c2UoJy9hcGknLCBtYWluUm91dGVyKTtcbmFwcC51c2UoZXJyb3JNaWRkbGV3YXJlKTtcbmNvbnN0IFBPUlQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDUwMDA7XG5cbmFzeW5jIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICB0cnkge1xuICAgIGNvbm5lY3RUb1RoZU1vbmdvREIoKTtcbiAgICBhcHAubGlzdGVuKFBPUlQsICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBTZXJ2ZXIgc3RhcnRlZCBhdCBwb3J0ICR7UE9SVH1gKTtcbiAgICB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9XG5cbn1cbnN0YXJ0KCk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/middleware/errorMiddleware.js":
/*!*******************************************!*\
  !*** ./src/middleware/errorMiddleware.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _apiError_apiError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../apiError/apiError */ \"./src/apiError/apiError.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((err, req, res, next) => {\n  if (err instanceof _apiError_apiError__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n    return res.status(err.code).json({ message: err.message });\n  }\n  return res.status(500).json({ message: err.message });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbWlkZGxld2FyZS9lcnJvck1pZGRsZXdhcmUuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBNEM7O0FBRTVDLGlFQUFlO0FBQ2YscUJBQXFCLDBEQUFRO0FBQzdCLHVDQUF1QyxzQkFBc0I7QUFDN0Q7QUFDQSxnQ0FBZ0Msc0JBQXNCO0FBQ3RELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvbWlkZGxld2FyZS9lcnJvck1pZGRsZXdhcmUuanM/NmJhYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBpRXJyb3IgZnJvbSBcIi4uL2FwaUVycm9yL2FwaUVycm9yXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChlcnIsIHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIGlmIChlcnIgaW5zdGFuY2VvZiBBcGlFcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKGVyci5jb2RlKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG4gIH1cbiAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG59OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/middleware/errorMiddleware.js\n");

/***/ }),

/***/ "./src/models/models.js":
/*!******************************!*\
  !*** ./src/models/models.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GroupModel\": () => (/* binding */ GroupModel),\n/* harmony export */   \"UserModel\": () => (/* binding */ UserModel),\n/* harmony export */   \"UsersGroupsModel\": () => (/* binding */ UsersGroupsModel)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n  username: {\n    type: String,\n    unique: true,\n    match: [/^[a-zA-Z0-9\\.,-]{4,20}$/, \"Username does't match required pattern\"]\n  },\n\n  firstName: {\n    type: String,\n    match: [/^[a-zA-Z]+\\s?[a-zA-Z]+$/, \"First name does't match required pattern\"],\n    minlength: [2, 'First name is too short'],\n    maxlength: [20, 'First name is too long']\n  },\n\n  lastName: {\n    type: String,\n    match: [/^[a-zA-Z]+$/, \"Last name does't match required pattern\"],\n    minlength: [2, 'Last name is too short'],\n    maxlength: [20, 'Last name is too long']\n  },\n\n  email: {\n    type: String,\n    unique: true,\n    match: [/^[a-zA-Z0-9!#$%&'\\*\\+\\-\\/=?^_`{}|]{1,65}@([a-zA-Z0-9]+.){1,2}[a-zA-Z]{2,14}$/]\n  }\n});\n\n// UserSchema.indexes({ username: 1, email: 1 }, { unique: true });\n\nconst GroupSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n  groupName: {\n    type: String,\n    unique: true,\n    match: [/^[a-zA-Z0-9.-]{4,20}$/, \"Group's name doesn't match required pattern\"]\n  },\n\n  groupTitle: {\n    type: String,\n    match: [/^[a-zA-Z0-9.-]{6,20}$/, \"Group's title doesn't match required pattern\"]\n  },\n});\n\nconst UsersGroupsSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n  userId: {\n    type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.ObjectId,\n  },\n\n  groupId: {\n    type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.ObjectId\n  }\n});\n\nconst UserModel = (0,mongoose__WEBPACK_IMPORTED_MODULE_0__.model)('User', UserSchema);\nconst GroupModel = (0,mongoose__WEBPACK_IMPORTED_MODULE_0__.model)('Group', GroupSchema);\nconst UsersGroupsModel = (0,mongoose__WEBPACK_IMPORTED_MODULE_0__.model)('UsersGroups', UsersGroupsSchema);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbW9kZWxzL21vZGVscy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUF5Qzs7QUFFekMsdUJBQXVCLDRDQUFNO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixLQUFLO0FBQ25DLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLEdBQUcsS0FBSyxpQkFBaUIsSUFBSSxTQUFTLEtBQUs7QUFDeEY7QUFDQSxDQUFDOztBQUVELHdCQUF3Qix1QkFBdUIsSUFBSSxjQUFjOztBQUVqRSx3QkFBd0IsNENBQU07QUFDOUI7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLEtBQUs7QUFDakMsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsNEJBQTRCLEtBQUs7QUFDakMsR0FBRztBQUNILENBQUM7O0FBRUQsOEJBQThCLDRDQUFNO0FBQ3BDO0FBQ0EsVUFBVSwyREFBcUI7QUFDL0IsR0FBRzs7QUFFSDtBQUNBLFVBQVUsMkRBQXFCO0FBQy9CO0FBQ0EsQ0FBQzs7QUFFTSxrQkFBa0IsK0NBQUs7QUFDdkIsbUJBQW1CLCtDQUFLO0FBQ3hCLHlCQUF5QiwrQ0FBSyIsInNvdXJjZXMiOlsid2VicGFjazovL3NlcnZlci8uL3NyYy9tb2RlbHMvbW9kZWxzLmpzP2M3ODUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2NoZW1hLCBtb2RlbCB9IGZyb20gJ21vbmdvb3NlJztcblxuY29uc3QgVXNlclNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICB1c2VybmFtZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICB1bmlxdWU6IHRydWUsXG4gICAgbWF0Y2g6IFsvXlthLXpBLVowLTlcXC4sLV17NCwyMH0kLywgXCJVc2VybmFtZSBkb2VzJ3QgbWF0Y2ggcmVxdWlyZWQgcGF0dGVyblwiXVxuICB9LFxuXG4gIGZpcnN0TmFtZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBtYXRjaDogWy9eW2EtekEtWl0rXFxzP1thLXpBLVpdKyQvLCBcIkZpcnN0IG5hbWUgZG9lcyd0IG1hdGNoIHJlcXVpcmVkIHBhdHRlcm5cIl0sXG4gICAgbWlubGVuZ3RoOiBbMiwgJ0ZpcnN0IG5hbWUgaXMgdG9vIHNob3J0J10sXG4gICAgbWF4bGVuZ3RoOiBbMjAsICdGaXJzdCBuYW1lIGlzIHRvbyBsb25nJ11cbiAgfSxcblxuICBsYXN0TmFtZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBtYXRjaDogWy9eW2EtekEtWl0rJC8sIFwiTGFzdCBuYW1lIGRvZXMndCBtYXRjaCByZXF1aXJlZCBwYXR0ZXJuXCJdLFxuICAgIG1pbmxlbmd0aDogWzIsICdMYXN0IG5hbWUgaXMgdG9vIHNob3J0J10sXG4gICAgbWF4bGVuZ3RoOiBbMjAsICdMYXN0IG5hbWUgaXMgdG9vIGxvbmcnXVxuICB9LFxuXG4gIGVtYWlsOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIHVuaXF1ZTogdHJ1ZSxcbiAgICBtYXRjaDogWy9eW2EtekEtWjAtOSEjJCUmJ1xcKlxcK1xcLVxcLz0/Xl9ge318XXsxLDY1fUAoW2EtekEtWjAtOV0rLil7MSwyfVthLXpBLVpdezIsMTR9JC9dXG4gIH1cbn0pO1xuXG4vLyBVc2VyU2NoZW1hLmluZGV4ZXMoeyB1c2VybmFtZTogMSwgZW1haWw6IDEgfSwgeyB1bmlxdWU6IHRydWUgfSk7XG5cbmNvbnN0IEdyb3VwU2NoZW1hID0gbmV3IFNjaGVtYSh7XG4gIGdyb3VwTmFtZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICB1bmlxdWU6IHRydWUsXG4gICAgbWF0Y2g6IFsvXlthLXpBLVowLTkuLV17NCwyMH0kLywgXCJHcm91cCdzIG5hbWUgZG9lc24ndCBtYXRjaCByZXF1aXJlZCBwYXR0ZXJuXCJdXG4gIH0sXG5cbiAgZ3JvdXBUaXRsZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBtYXRjaDogWy9eW2EtekEtWjAtOS4tXXs2LDIwfSQvLCBcIkdyb3VwJ3MgdGl0bGUgZG9lc24ndCBtYXRjaCByZXF1aXJlZCBwYXR0ZXJuXCJdXG4gIH0sXG59KTtcblxuY29uc3QgVXNlcnNHcm91cHNTY2hlbWEgPSBuZXcgU2NoZW1hKHtcbiAgdXNlcklkOiB7XG4gICAgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLFxuICB9LFxuXG4gIGdyb3VwSWQ6IHtcbiAgICB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWRcbiAgfVxufSk7XG5cbmV4cG9ydCBjb25zdCBVc2VyTW9kZWwgPSBtb2RlbCgnVXNlcicsIFVzZXJTY2hlbWEpO1xuZXhwb3J0IGNvbnN0IEdyb3VwTW9kZWwgPSBtb2RlbCgnR3JvdXAnLCBHcm91cFNjaGVtYSk7XG5leHBvcnQgY29uc3QgVXNlcnNHcm91cHNNb2RlbCA9IG1vZGVsKCdVc2Vyc0dyb3VwcycsIFVzZXJzR3JvdXBzU2NoZW1hKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/models/models.js\n");

/***/ }),

/***/ "./src/routes/groupRouter.js":
/*!***********************************!*\
  !*** ./src/routes/groupRouter.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controller_groupController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/groupController */ \"./src/controller/groupController.js\");\n\n\n\nconst groupRouter = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();\n\ngroupRouter.get('/get/:paramValue', _controller_groupController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getGroup);\ngroupRouter.post('/create', _controller_groupController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createGroup);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (groupRouter);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcm91dGVzL2dyb3VwUm91dGVyLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBaUM7QUFDMkI7O0FBRTVELG9CQUFvQiwrQ0FBTTs7QUFFMUIsb0NBQW9DLDRFQUF3QjtBQUM1RCw0QkFBNEIsK0VBQTJCOztBQUV2RCxpRUFBZSxXQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VydmVyLy4vc3JjL3JvdXRlcy9ncm91cFJvdXRlci5qcz83MGViIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IEdyb3VwQ29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVyL2dyb3VwQ29udHJvbGxlcic7XG5cbmNvbnN0IGdyb3VwUm91dGVyID0gUm91dGVyKCk7XG5cbmdyb3VwUm91dGVyLmdldCgnL2dldC86cGFyYW1WYWx1ZScsIEdyb3VwQ29udHJvbGxlci5nZXRHcm91cCk7XG5ncm91cFJvdXRlci5wb3N0KCcvY3JlYXRlJywgR3JvdXBDb250cm9sbGVyLmNyZWF0ZUdyb3VwKTtcblxuZXhwb3J0IGRlZmF1bHQgZ3JvdXBSb3V0ZXI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/routes/groupRouter.js\n");

/***/ }),

/***/ "./src/routes/index.js":
/*!*****************************!*\
  !*** ./src/routes/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _groupRouter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./groupRouter.js */ \"./src/routes/groupRouter.js\");\n/* harmony import */ var _userRouter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userRouter.js */ \"./src/routes/userRouter.js\");\n\n\n\n\nconst mainRouter = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();\n\nmainRouter.use('/user', _userRouter_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\nmainRouter.use('/group', _groupRouter_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mainRouter);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcm91dGVzL2luZGV4LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQWlDO0FBQ1U7QUFDRjs7QUFFekMsbUJBQW1CLCtDQUFNOztBQUV6Qix3QkFBd0Isc0RBQVU7QUFDbEMseUJBQXlCLHVEQUFXOztBQUVwQyxpRUFBZSxVQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VydmVyLy4vc3JjL3JvdXRlcy9pbmRleC5qcz9lMjZjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGdyb3VwUm91dGVyIGZyb20gJy4vZ3JvdXBSb3V0ZXIuanMnO1xuaW1wb3J0IHVzZXJSb3V0ZXIgZnJvbSAnLi91c2VyUm91dGVyLmpzJztcblxuY29uc3QgbWFpblJvdXRlciA9IFJvdXRlcigpO1xuXG5tYWluUm91dGVyLnVzZSgnL3VzZXInLCB1c2VyUm91dGVyKTtcbm1haW5Sb3V0ZXIudXNlKCcvZ3JvdXAnLCBncm91cFJvdXRlcik7XG5cbmV4cG9ydCBkZWZhdWx0IG1haW5Sb3V0ZXI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/routes/index.js\n");

/***/ }),

/***/ "./src/routes/userRouter.js":
/*!**********************************!*\
  !*** ./src/routes/userRouter.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controller_userController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/userController.js */ \"./src/controller/userController.js\");\n\n\n\nconst userRouter = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();\n\nuserRouter.get('/get/:paramValue', _controller_userController_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getUser);\nuserRouter.post('/create', _controller_userController_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createUser);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userRouter);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcm91dGVzL3VzZXJSb3V0ZXIuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFpQztBQUM0Qjs7QUFFN0QsbUJBQW1CLCtDQUFNOztBQUV6QixtQ0FBbUMsNkVBQXNCO0FBQ3pELDJCQUEyQixnRkFBeUI7O0FBRXBELGlFQUFlLFVBQVUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvcm91dGVzL3VzZXJSb3V0ZXIuanM/ZGVhMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCBVc2VyQ29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVyL3VzZXJDb250cm9sbGVyLmpzJztcblxuY29uc3QgdXNlclJvdXRlciA9IFJvdXRlcigpO1xuXG51c2VyUm91dGVyLmdldCgnL2dldC86cGFyYW1WYWx1ZScsIFVzZXJDb250cm9sbGVyLmdldFVzZXIpO1xudXNlclJvdXRlci5wb3N0KCcvY3JlYXRlJywgVXNlckNvbnRyb2xsZXIuY3JlYXRlVXNlcik7XG5cbmV4cG9ydCBkZWZhdWx0IHVzZXJSb3V0ZXI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/routes/userRouter.js\n");

/***/ }),

/***/ "./src/service/groupService.js":
/*!*************************************!*\
  !*** ./src/service/groupService.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _apiError_apiError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../apiError/apiError */ \"./src/apiError/apiError.js\");\n/* harmony import */ var _models_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/models */ \"./src/models/models.js\");\n\n\n\nclass GroupService {\n\n  static async getGroup(paramName, paramValue) {\n    if (_models_models__WEBPACK_IMPORTED_MODULE_1__.GroupModel.schema.obj[paramName] === undefined && paramName !== \"_id\") {\n      return null;\n    }\n\n    const group = await _models_models__WEBPACK_IMPORTED_MODULE_1__.GroupModel.findOne({\n      [paramName]: paramValue\n    });\n\n    return group;\n  }\n\n  static async createGroup(groupName, groupTitle) {\n    for (let arg of arguments) {\n\n      if (!arg) {\n        throw _apiError_apiError__WEBPACK_IMPORTED_MODULE_0__[\"default\"].badRequest('Not enough data for the Group creating')\n      }\n    }\n\n    await _models_models__WEBPACK_IMPORTED_MODULE_1__.GroupModel.create([{\n      groupName,\n      groupTitle\n    }], { checkForDuplications: [\"groupName\"] });\n\n    return { message: `Group ${groupName} created successfully` };\n  };\n\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GroupService);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmljZS9ncm91cFNlcnZpY2UuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTRDO0FBQ0U7O0FBRTlDOztBQUVBO0FBQ0EsUUFBUSxpRUFBcUI7QUFDN0I7QUFDQTs7QUFFQSx3QkFBd0IsOERBQWtCO0FBQzFDO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLHFFQUFtQjtBQUNqQztBQUNBOztBQUVBLFVBQVUsNkRBQWlCO0FBQzNCO0FBQ0E7QUFDQSxLQUFLLEtBQUsscUNBQXFDOztBQUUvQyxhQUFhLGtCQUFrQixXQUFXO0FBQzFDOztBQUVBOztBQUVBLGlFQUFlLFlBQVkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvc2VydmljZS9ncm91cFNlcnZpY2UuanM/MjE1MCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBpRXJyb3IgZnJvbSBcIi4uL2FwaUVycm9yL2FwaUVycm9yXCI7XG5pbXBvcnQgeyBHcm91cE1vZGVsIH0gZnJvbSBcIi4uL21vZGVscy9tb2RlbHNcIjtcblxuY2xhc3MgR3JvdXBTZXJ2aWNlIHtcblxuICBzdGF0aWMgYXN5bmMgZ2V0R3JvdXAocGFyYW1OYW1lLCBwYXJhbVZhbHVlKSB7XG4gICAgaWYgKEdyb3VwTW9kZWwuc2NoZW1hLm9ialtwYXJhbU5hbWVdID09PSB1bmRlZmluZWQgJiYgcGFyYW1OYW1lICE9PSBcIl9pZFwiKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBncm91cCA9IGF3YWl0IEdyb3VwTW9kZWwuZmluZE9uZSh7XG4gICAgICBbcGFyYW1OYW1lXTogcGFyYW1WYWx1ZVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGdyb3VwO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGNyZWF0ZUdyb3VwKGdyb3VwTmFtZSwgZ3JvdXBUaXRsZSkge1xuICAgIGZvciAobGV0IGFyZyBvZiBhcmd1bWVudHMpIHtcblxuICAgICAgaWYgKCFhcmcpIHtcbiAgICAgICAgdGhyb3cgQXBpRXJyb3IuYmFkUmVxdWVzdCgnTm90IGVub3VnaCBkYXRhIGZvciB0aGUgR3JvdXAgY3JlYXRpbmcnKVxuICAgICAgfVxuICAgIH1cblxuICAgIGF3YWl0IEdyb3VwTW9kZWwuY3JlYXRlKFt7XG4gICAgICBncm91cE5hbWUsXG4gICAgICBncm91cFRpdGxlXG4gICAgfV0sIHsgY2hlY2tGb3JEdXBsaWNhdGlvbnM6IFtcImdyb3VwTmFtZVwiXSB9KTtcblxuICAgIHJldHVybiB7IG1lc3NhZ2U6IGBHcm91cCAke2dyb3VwTmFtZX0gY3JlYXRlZCBzdWNjZXNzZnVsbHlgIH07XG4gIH07XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdyb3VwU2VydmljZTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/service/groupService.js\n");

/***/ }),

/***/ "./src/service/userService.js":
/*!************************************!*\
  !*** ./src/service/userService.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _apiError_apiError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../apiError/apiError */ \"./src/apiError/apiError.js\");\n/* harmony import */ var _models_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/models */ \"./src/models/models.js\");\n\n\n\nclass UserService {\n\n  static async getUser(paramName, paramValue) {\n    if (_models_models__WEBPACK_IMPORTED_MODULE_1__.UserModel.schema.obj[paramName] === undefined && paramName !== \"_id\") {\n      return null;\n    }\n\n    const user = await _models_models__WEBPACK_IMPORTED_MODULE_1__.UserModel.findOne({\n      [paramName]: paramValue\n    });\n\n    return user;\n  };\n\n  static async getUsers() {\n\n  }\n\n  static async createUser(username, firstName, lastName, email) {\n    for (let argValue of arguments) {\n\n      if (!argValue) {\n        throw _apiError_apiError__WEBPACK_IMPORTED_MODULE_0__[\"default\"].badRequest('Not enough data for the user creating');\n      }\n    }\n\n    await _models_models__WEBPACK_IMPORTED_MODULE_1__.UserModel.create([{\n      username,\n      firstName,\n      lastName,\n      email\n    }], { checkForDuplications: [\"username\", \"email\", \"what\"] });\n\n    return { message: \"User created successfully\" };\n  };\n\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserService);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmljZS91c2VyU2VydmljZS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBNEM7QUFDQzs7QUFFN0M7O0FBRUE7QUFDQSxRQUFRLGdFQUFvQjtBQUM1QjtBQUNBOztBQUVBLHVCQUF1Qiw2REFBaUI7QUFDeEM7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGNBQWMscUVBQW1CO0FBQ2pDO0FBQ0E7O0FBRUEsVUFBVSw0REFBZ0I7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLEtBQUsscURBQXFEOztBQUUvRCxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxpRUFBZSxXQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VydmVyLy4vc3JjL3NlcnZpY2UvdXNlclNlcnZpY2UuanM/ZGNkMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBpRXJyb3IgZnJvbSBcIi4uL2FwaUVycm9yL2FwaUVycm9yXCI7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tIFwiLi4vbW9kZWxzL21vZGVsc1wiO1xuXG5jbGFzcyBVc2VyU2VydmljZSB7XG5cbiAgc3RhdGljIGFzeW5jIGdldFVzZXIocGFyYW1OYW1lLCBwYXJhbVZhbHVlKSB7XG4gICAgaWYgKFVzZXJNb2RlbC5zY2hlbWEub2JqW3BhcmFtTmFtZV0gPT09IHVuZGVmaW5lZCAmJiBwYXJhbU5hbWUgIT09IFwiX2lkXCIpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7XG4gICAgICBbcGFyYW1OYW1lXTogcGFyYW1WYWx1ZVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHVzZXI7XG4gIH07XG5cbiAgc3RhdGljIGFzeW5jIGdldFVzZXJzKCkge1xuXG4gIH1cblxuICBzdGF0aWMgYXN5bmMgY3JlYXRlVXNlcih1c2VybmFtZSwgZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwpIHtcbiAgICBmb3IgKGxldCBhcmdWYWx1ZSBvZiBhcmd1bWVudHMpIHtcblxuICAgICAgaWYgKCFhcmdWYWx1ZSkge1xuICAgICAgICB0aHJvdyBBcGlFcnJvci5iYWRSZXF1ZXN0KCdOb3QgZW5vdWdoIGRhdGEgZm9yIHRoZSB1c2VyIGNyZWF0aW5nJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYXdhaXQgVXNlck1vZGVsLmNyZWF0ZShbe1xuICAgICAgdXNlcm5hbWUsXG4gICAgICBmaXJzdE5hbWUsXG4gICAgICBsYXN0TmFtZSxcbiAgICAgIGVtYWlsXG4gICAgfV0sIHsgY2hlY2tGb3JEdXBsaWNhdGlvbnM6IFtcInVzZXJuYW1lXCIsIFwiZW1haWxcIiwgXCJ3aGF0XCJdIH0pO1xuXG4gICAgcmV0dXJuIHsgbWVzc2FnZTogXCJVc2VyIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5XCIgfTtcbiAgfTtcblxufTtcbmV4cG9ydCBkZWZhdWx0IFVzZXJTZXJ2aWNlOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/service/userService.js\n");

/***/ }),

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("dotenv/config");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;