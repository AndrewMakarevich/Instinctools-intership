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

/***/ "./src/controller/userController.js":
/*!******************************************!*\
  !*** ./src/controller/userController.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _service_userService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../service/userService */ \"./src/service/userService.js\");\n\n\nclass UserController {\n  async createUser(req, res, next) {\n    try {\n      console.log(req.body);\n      const { username, firstName, lastName, email } = req.body;\n      const userCreationResponse = await _service_userService__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createUser(username, firstName, lastName, email);\n\n      return res.json(userCreationResponse);\n    } catch (e) {\n      next(e);\n    }\n\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new UserController());//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udHJvbGxlci91c2VyQ29udHJvbGxlci5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFpRDs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHVDQUF1QztBQUNyRCx5Q0FBeUMsdUVBQXNCOztBQUUvRDtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpRUFBZSxvQkFBb0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvY29udHJvbGxlci91c2VyQ29udHJvbGxlci5qcz8wNGE1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVc2VyU2VydmljZSBmcm9tIFwiLi4vc2VydmljZS91c2VyU2VydmljZVwiO1xuXG5jbGFzcyBVc2VyQ29udHJvbGxlciB7XG4gIGFzeW5jIGNyZWF0ZVVzZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2cocmVxLmJvZHkpO1xuICAgICAgY29uc3QgeyB1c2VybmFtZSwgZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwgfSA9IHJlcS5ib2R5O1xuICAgICAgY29uc3QgdXNlckNyZWF0aW9uUmVzcG9uc2UgPSBhd2FpdCBVc2VyU2VydmljZS5jcmVhdGVVc2VyKHVzZXJuYW1lLCBmaXJzdE5hbWUsIGxhc3ROYW1lLCBlbWFpbCk7XG5cbiAgICAgIHJldHVybiByZXMuanNvbih1c2VyQ3JlYXRpb25SZXNwb25zZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbmV4dChlKTtcbiAgICB9XG5cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbmV3IFVzZXJDb250cm9sbGVyKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/controller/userController.js\n");

/***/ }),

/***/ "./src/db/index.js":
/*!*************************!*\
  !*** ./src/db/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"connectToTheMongoDB\": () => (/* binding */ connectToTheMongoDB)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _apiError_apiError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../apiError/apiError */ \"./src/apiError/apiError.js\");\n\n\n\nfunction connectToTheMongoDB() {\n  mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(\"mongodb://localhost:27017/admin-panel-test-task\", () => {\n    console.log(\"Connected to the mongoDB\");\n  });\n}\n\nasync function checkForTheDuplication(Model, document, fieldsToCheck) {\n  for (let filedVal of fieldsToCheck) {\n    const duplicate = await Model.findOne({\n      [filedVal]: document[filedVal]\n    });\n    if (duplicate) {\n      throw _apiError_apiError__WEBPACK_IMPORTED_MODULE_1__[\"default\"].badRequest(`${filedVal} for ${Model.collection.name} must be unique`);\n    }\n  }\n  // try {\n  //   fieldsToCheck.forEach(async (field) => {\n  //     const duplicate = await Model.findOne({\n  //       [field]: document[field]\n  //     });\n  //     if (duplicate) {\n  //       throw ApiError.badRequest(`${field} for ${Model.collection.name} must be unique`);\n  //     }\n  //   });\n  // } catch (e) {\n  //   throw ApiError.badRequest(`Error`);\n  // }\n\n}\n\nconst create = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Model.create);\n\n(mongoose__WEBPACK_IMPORTED_MODULE_0___default().Model.create) = async function (docs, options, callback) {\n  if (options && options.checkForDuplications) {\n    await checkForTheDuplication(this, docs, options.checkForDuplications);\n  }\n  return create.apply(this, arguments);\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZGIvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFnQztBQUNZOztBQUVyQztBQUNQLEVBQUUsdURBQWdCO0FBQ2xCO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxxRUFBbUIsSUFBSSxVQUFVLE1BQU0sdUJBQXVCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLHdDQUF3QyxPQUFPLE1BQU0sdUJBQXVCO0FBQzVFO0FBQ0EsUUFBUTtBQUNSLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBLGVBQWUsOERBQXFCOztBQUVwQyw4REFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NlcnZlci8uL3NyYy9kYi9pbmRleC5qcz84MTQ5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcbmltcG9ydCBBcGlFcnJvciBmcm9tIFwiLi4vYXBpRXJyb3IvYXBpRXJyb3JcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbm5lY3RUb1RoZU1vbmdvREIoKSB7XG4gIG1vbmdvb3NlLmNvbm5lY3QoXCJtb25nb2RiOi8vbG9jYWxob3N0OjI3MDE3L2FkbWluLXBhbmVsLXRlc3QtdGFza1wiLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJDb25uZWN0ZWQgdG8gdGhlIG1vbmdvREJcIik7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjaGVja0ZvclRoZUR1cGxpY2F0aW9uKE1vZGVsLCBkb2N1bWVudCwgZmllbGRzVG9DaGVjaykge1xuICBmb3IgKGxldCBmaWxlZFZhbCBvZiBmaWVsZHNUb0NoZWNrKSB7XG4gICAgY29uc3QgZHVwbGljYXRlID0gYXdhaXQgTW9kZWwuZmluZE9uZSh7XG4gICAgICBbZmlsZWRWYWxdOiBkb2N1bWVudFtmaWxlZFZhbF1cbiAgICB9KTtcbiAgICBpZiAoZHVwbGljYXRlKSB7XG4gICAgICB0aHJvdyBBcGlFcnJvci5iYWRSZXF1ZXN0KGAke2ZpbGVkVmFsfSBmb3IgJHtNb2RlbC5jb2xsZWN0aW9uLm5hbWV9IG11c3QgYmUgdW5pcXVlYCk7XG4gICAgfVxuICB9XG4gIC8vIHRyeSB7XG4gIC8vICAgZmllbGRzVG9DaGVjay5mb3JFYWNoKGFzeW5jIChmaWVsZCkgPT4ge1xuICAvLyAgICAgY29uc3QgZHVwbGljYXRlID0gYXdhaXQgTW9kZWwuZmluZE9uZSh7XG4gIC8vICAgICAgIFtmaWVsZF06IGRvY3VtZW50W2ZpZWxkXVxuICAvLyAgICAgfSk7XG4gIC8vICAgICBpZiAoZHVwbGljYXRlKSB7XG4gIC8vICAgICAgIHRocm93IEFwaUVycm9yLmJhZFJlcXVlc3QoYCR7ZmllbGR9IGZvciAke01vZGVsLmNvbGxlY3Rpb24ubmFtZX0gbXVzdCBiZSB1bmlxdWVgKTtcbiAgLy8gICAgIH1cbiAgLy8gICB9KTtcbiAgLy8gfSBjYXRjaCAoZSkge1xuICAvLyAgIHRocm93IEFwaUVycm9yLmJhZFJlcXVlc3QoYEVycm9yYCk7XG4gIC8vIH1cblxufVxuXG5jb25zdCBjcmVhdGUgPSBtb25nb29zZS5Nb2RlbC5jcmVhdGU7XG5cbm1vbmdvb3NlLk1vZGVsLmNyZWF0ZSA9IGFzeW5jIGZ1bmN0aW9uIChkb2NzLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmNoZWNrRm9yRHVwbGljYXRpb25zKSB7XG4gICAgYXdhaXQgY2hlY2tGb3JUaGVEdXBsaWNhdGlvbih0aGlzLCBkb2NzLCBvcHRpb25zLmNoZWNrRm9yRHVwbGljYXRpb25zKTtcbiAgfVxuICByZXR1cm4gY3JlYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/db/index.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv/config */ \"dotenv/config\");\n/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv_config__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./db */ \"./src/db/index.js\");\n/* harmony import */ var _middleware_errorMiddleware__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./middleware/errorMiddleware */ \"./src/middleware/errorMiddleware.js\");\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes */ \"./src/routes/index.js\");\n\n\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_1___default()();\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default().json());\napp.use('/api', _routes__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\napp.use(_middleware_errorMiddleware__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\nconst PORT = process.env.PORT || 5000;\n\nasync function start() {\n  try {\n    (0,_db__WEBPACK_IMPORTED_MODULE_3__.connectToTheMongoDB)();\n    app.listen(PORT, () => {\n      console.log(`Server started at port ${PORT}`);\n    });\n  } catch (e) {\n    console.log(e);\n  }\n\n}\nstart();\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUF1QjtBQUNPO0FBQ0U7QUFDVztBQUNnQjtBQUN6Qjs7QUFFbEMsWUFBWSw4Q0FBTztBQUNuQixRQUFRLG1EQUFZO0FBQ3BCLGdCQUFnQiwrQ0FBVTtBQUMxQixRQUFRLG1FQUFlO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQSxJQUFJLHdEQUFtQjtBQUN2QjtBQUNBLDRDQUE0QyxLQUFLO0FBQ2pELEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VydmVyLy4vc3JjL2luZGV4LmpzP2I2MzUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdkb3RlbnYvY29uZmlnJztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7IGNvbm5lY3RUb1RoZU1vbmdvREIgfSBmcm9tICcuL2RiJztcbmltcG9ydCBlcnJvck1pZGRsZXdhcmUgZnJvbSAnLi9taWRkbGV3YXJlL2Vycm9yTWlkZGxld2FyZSc7XG5pbXBvcnQgbWFpblJvdXRlciBmcm9tICcuL3JvdXRlcyc7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuYXBwLnVzZSgnL2FwaScsIG1haW5Sb3V0ZXIpO1xuYXBwLnVzZShlcnJvck1pZGRsZXdhcmUpO1xuY29uc3QgUE9SVCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgNTAwMDtcblxuYXN5bmMgZnVuY3Rpb24gc3RhcnQoKSB7XG4gIHRyeSB7XG4gICAgY29ubmVjdFRvVGhlTW9uZ29EQigpO1xuICAgIGFwcC5saXN0ZW4oUE9SVCwgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYFNlcnZlciBzdGFydGVkIGF0IHBvcnQgJHtQT1JUfWApO1xuICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gIH1cblxufVxuc3RhcnQoKTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/middleware/errorMiddleware.js":
/*!*******************************************!*\
  !*** ./src/middleware/errorMiddleware.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _apiError_apiError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../apiError/apiError */ \"./src/apiError/apiError.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((err, req, res, next) => {\n  if (err instanceof _apiError_apiError__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n    return res.status(err.code).json(err.message);\n  }\n  return res.status(500).json(err.message);\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbWlkZGxld2FyZS9lcnJvck1pZGRsZXdhcmUuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBNEM7O0FBRTVDLGlFQUFlO0FBQ2YscUJBQXFCLDBEQUFRO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvbWlkZGxld2FyZS9lcnJvck1pZGRsZXdhcmUuanM/NmJhYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBpRXJyb3IgZnJvbSBcIi4uL2FwaUVycm9yL2FwaUVycm9yXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChlcnIsIHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIGlmIChlcnIgaW5zdGFuY2VvZiBBcGlFcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKGVyci5jb2RlKS5qc29uKGVyci5tZXNzYWdlKTtcbiAgfVxuICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oZXJyLm1lc3NhZ2UpO1xufTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/middleware/errorMiddleware.js\n");

/***/ }),

/***/ "./src/models/models.js":
/*!******************************!*\
  !*** ./src/models/models.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UserModel\": () => (/* binding */ UserModel)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n  username: {\n    type: String,\n    unique: [true],\n    match: [/^[a-zA-Z0-9\\.,-]{4,20}$/, \"Username does't match required pattern\"]\n  },\n\n  firstName: {\n    type: String,\n    match: [/^[a-zA-Z]+\\s?[a-zA-Z]+$/, \"First name does't match required pattern\"],\n    minlength: [2, 'First name is too short'],\n    maxlength: [20, 'First name is too long']\n  },\n\n  lastName: {\n    type: String,\n    match: [/^[a-zA-Z]+$/, \"Last name does't match required pattern\"],\n    minlength: [2, 'Last name is too short'],\n    maxlength: [20, 'Last name is too long']\n  },\n\n  email: { type: String, match: [/^[a-zA-Z0-9!#$%&'\\*\\+\\-\\/=?^_`{}|]{1,65}@([a-zA-Z0-9]+.){1,2}[a-zA-Z]{2,14}$/] }\n});\n\nconst UserModel = (0,mongoose__WEBPACK_IMPORTED_MODULE_0__.model)('User', UserSchema);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbW9kZWxzL21vZGVscy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBeUM7O0FBRXpDLHVCQUF1Qiw0Q0FBTTtBQUM3QjtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsS0FBSztBQUNuQyxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILFdBQVcsdURBQXVELEdBQUcsS0FBSyxpQkFBaUIsSUFBSSxTQUFTLEtBQUs7QUFDN0csQ0FBQzs7QUFFTSxrQkFBa0IsK0NBQUsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvbW9kZWxzL21vZGVscy5qcz9jNzg1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNjaGVtYSwgbW9kZWwgfSBmcm9tICdtb25nb29zZSc7XG5cbmNvbnN0IFVzZXJTY2hlbWEgPSBuZXcgU2NoZW1hKHtcbiAgdXNlcm5hbWU6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgdW5pcXVlOiBbdHJ1ZV0sXG4gICAgbWF0Y2g6IFsvXlthLXpBLVowLTlcXC4sLV17NCwyMH0kLywgXCJVc2VybmFtZSBkb2VzJ3QgbWF0Y2ggcmVxdWlyZWQgcGF0dGVyblwiXVxuICB9LFxuXG4gIGZpcnN0TmFtZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBtYXRjaDogWy9eW2EtekEtWl0rXFxzP1thLXpBLVpdKyQvLCBcIkZpcnN0IG5hbWUgZG9lcyd0IG1hdGNoIHJlcXVpcmVkIHBhdHRlcm5cIl0sXG4gICAgbWlubGVuZ3RoOiBbMiwgJ0ZpcnN0IG5hbWUgaXMgdG9vIHNob3J0J10sXG4gICAgbWF4bGVuZ3RoOiBbMjAsICdGaXJzdCBuYW1lIGlzIHRvbyBsb25nJ11cbiAgfSxcblxuICBsYXN0TmFtZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBtYXRjaDogWy9eW2EtekEtWl0rJC8sIFwiTGFzdCBuYW1lIGRvZXMndCBtYXRjaCByZXF1aXJlZCBwYXR0ZXJuXCJdLFxuICAgIG1pbmxlbmd0aDogWzIsICdMYXN0IG5hbWUgaXMgdG9vIHNob3J0J10sXG4gICAgbWF4bGVuZ3RoOiBbMjAsICdMYXN0IG5hbWUgaXMgdG9vIGxvbmcnXVxuICB9LFxuXG4gIGVtYWlsOiB7IHR5cGU6IFN0cmluZywgbWF0Y2g6IFsvXlthLXpBLVowLTkhIyQlJidcXCpcXCtcXC1cXC89P15fYHt9fF17MSw2NX1AKFthLXpBLVowLTldKy4pezEsMn1bYS16QS1aXXsyLDE0fSQvXSB9XG59KTtcblxuZXhwb3J0IGNvbnN0IFVzZXJNb2RlbCA9IG1vZGVsKCdVc2VyJywgVXNlclNjaGVtYSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/models/models.js\n");

/***/ }),

/***/ "./src/routes/index.js":
/*!*****************************!*\
  !*** ./src/routes/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _userRouter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./userRouter.js */ \"./src/routes/userRouter.js\");\n\n\n\nconst mainRouter = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();\nmainRouter.use('/user', _userRouter_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mainRouter);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcm91dGVzL2luZGV4LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBaUM7QUFDUTs7QUFFekMsbUJBQW1CLCtDQUFNO0FBQ3pCLHdCQUF3QixzREFBVTs7QUFFbEMsaUVBQWUsVUFBVSIsInNvdXJjZXMiOlsid2VicGFjazovL3NlcnZlci8uL3NyYy9yb3V0ZXMvaW5kZXguanM/ZTI2YyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB1c2VyUm91dGVyIGZyb20gJy4vdXNlclJvdXRlci5qcyc7XG5cbmNvbnN0IG1haW5Sb3V0ZXIgPSBSb3V0ZXIoKTtcbm1haW5Sb3V0ZXIudXNlKCcvdXNlcicsIHVzZXJSb3V0ZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBtYWluUm91dGVyOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/routes/index.js\n");

/***/ }),

/***/ "./src/routes/userRouter.js":
/*!**********************************!*\
  !*** ./src/routes/userRouter.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controller_userController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/userController.js */ \"./src/controller/userController.js\");\n\n\n\nconst userRouter = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();\nuserRouter.post('/create', _controller_userController_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createUser);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userRouter);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcm91dGVzL3VzZXJSb3V0ZXIuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFpQztBQUM0Qjs7QUFFN0QsbUJBQW1CLCtDQUFNO0FBQ3pCLDJCQUEyQixnRkFBeUI7O0FBRXBELGlFQUFlLFVBQVUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvcm91dGVzL3VzZXJSb3V0ZXIuanM/ZGVhMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB1c2VyQ29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVyL3VzZXJDb250cm9sbGVyLmpzJztcblxuY29uc3QgdXNlclJvdXRlciA9IFJvdXRlcigpO1xudXNlclJvdXRlci5wb3N0KCcvY3JlYXRlJywgdXNlckNvbnRyb2xsZXIuY3JlYXRlVXNlcik7XG5cbmV4cG9ydCBkZWZhdWx0IHVzZXJSb3V0ZXI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/routes/userRouter.js\n");

/***/ }),

/***/ "./src/service/userService.js":
/*!************************************!*\
  !*** ./src/service/userService.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _apiError_apiError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../apiError/apiError */ \"./src/apiError/apiError.js\");\n/* harmony import */ var _models_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/models */ \"./src/models/models.js\");\n\n\n\nclass UserService {\n  async createUser(username, firstName, lastName, email) {\n    for (let argValue of arguments) {\n      if (!argValue) {\n        throw _apiError_apiError__WEBPACK_IMPORTED_MODULE_0__[\"default\"].badRequest('Not enough data for the user creating');\n      }\n    }\n    const user = await _models_models__WEBPACK_IMPORTED_MODULE_1__.UserModel.create({\n      username,\n      firstName,\n      lastName,\n      email\n    }, { checkForDuplications: [\"username\", \"email\"] });\n    console.log(user);\n\n\n    return { message: \"User created successfully\" };\n  }\n\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new UserService);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmljZS91c2VyU2VydmljZS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBNEM7QUFDQzs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHFFQUFtQjtBQUNqQztBQUNBO0FBQ0EsdUJBQXVCLDREQUFnQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssSUFBSSw2Q0FBNkM7QUFDdEQ7OztBQUdBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGlFQUFlLGVBQWUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvc2VydmljZS91c2VyU2VydmljZS5qcz9kY2QzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBcGlFcnJvciBmcm9tIFwiLi4vYXBpRXJyb3IvYXBpRXJyb3JcIjtcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gXCIuLi9tb2RlbHMvbW9kZWxzXCI7XG5cbmNsYXNzIFVzZXJTZXJ2aWNlIHtcbiAgYXN5bmMgY3JlYXRlVXNlcih1c2VybmFtZSwgZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwpIHtcbiAgICBmb3IgKGxldCBhcmdWYWx1ZSBvZiBhcmd1bWVudHMpIHtcbiAgICAgIGlmICghYXJnVmFsdWUpIHtcbiAgICAgICAgdGhyb3cgQXBpRXJyb3IuYmFkUmVxdWVzdCgnTm90IGVub3VnaCBkYXRhIGZvciB0aGUgdXNlciBjcmVhdGluZycpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmNyZWF0ZSh7XG4gICAgICB1c2VybmFtZSxcbiAgICAgIGZpcnN0TmFtZSxcbiAgICAgIGxhc3ROYW1lLFxuICAgICAgZW1haWxcbiAgICB9LCB7IGNoZWNrRm9yRHVwbGljYXRpb25zOiBbXCJ1c2VybmFtZVwiLCBcImVtYWlsXCJdIH0pO1xuICAgIGNvbnNvbGUubG9nKHVzZXIpO1xuXG5cbiAgICByZXR1cm4geyBtZXNzYWdlOiBcIlVzZXIgY3JlYXRlZCBzdWNjZXNzZnVsbHlcIiB9O1xuICB9XG5cbn07XG5leHBvcnQgZGVmYXVsdCBuZXcgVXNlclNlcnZpY2U7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/service/userService.js\n");

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