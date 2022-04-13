/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apiError/apiError.js":
/*!**********************************!*\
  !*** ./src/apiError/apiError.js ***!
  \**********************************/
/***/ ((module) => {

class ApiError extends Error {
  constructor(code, message) {
    super();
    this.code = code;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError(400, message);
  }
}

module.exports = ApiError;


/***/ }),

/***/ "./src/controller/groupController.js":
/*!*******************************************!*\
  !*** ./src/controller/groupController.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const GroupService = __webpack_require__(/*! ../service/groupService */ "./src/service/groupService.js");

class GroupController {
  static async getGroup(req, res, next) {
    try {
      const groupsParamValueToFind = req.params.paramValue;
      const groupsParamNameToFind = req.query.paramName;

      console.log(groupsParamNameToFind);
      console.log(groupsParamValueToFind);

      const response = await GroupService.getGroup(
        groupsParamNameToFind,
        groupsParamValueToFind
      );

      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }

  static async getGroups(req, res, next) {
    try {
      const { filterObject, page, limit } = req.query;
      const response = await GroupService.getGroups(filterObject, page, limit);

      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }

  static async createGroup(req, res, next) {
    try {
      const { groupName, groupTitle } = req.body;
      const response = await GroupService.createGroup(groupName, groupTitle);

      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }

  static async editGroup(req, res, next) {
    try {
      const { id } = req.params;
      const { groupName, groupTitle } = req.body;
      const response = await GroupService.editGroup(id, groupName, groupTitle);

      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }

  static async deleteGroup(req, res, next) {
    try {
      const { id } = req.params;
      const response = await GroupService.deleteGroup(id);

      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = GroupController;


/***/ }),

/***/ "./src/controller/userController.js":
/*!******************************************!*\
  !*** ./src/controller/userController.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const UserService = __webpack_require__(/*! ../service/userService */ "./src/service/userService.js");

class UserController {
  static async getUser(req, res, next) {
    try {
      const usersParamValueToFind = req.params.paramValue;
      const usersParamNameToFind = req.query.paramName;

      const response = await UserService.getUser(
        usersParamNameToFind,
        usersParamValueToFind
      );

      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }

  static async getUsers(req, res, next) {
    try {
      const { filterObject, page, limit } = req.query;
      const response = await UserService.getUsers(filterObject, page, limit);

      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }

  static async createUser(req, res, next) {
    try {
      const { username, firstName, lastName, email } = req.body;
      const userCreationResponse = await UserService.createUser(
        username,
        firstName,
        lastName,
        email
      );

      return res.json(userCreationResponse);
    } catch (e) {
      return next(e);
    }
  }

  static async editUser(req, res, next) {
    try {
      const { id } = req.params;
      const { username, firstName, lastName, email } = req.body;
      const response = await UserService.editUser(
        id,
        username,
        firstName,
        lastName,
        email
      );

      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const response = await UserService.deleteUser(id);

      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = UserController;


/***/ }),

/***/ "./src/controller/userGroupController.js":
/*!***********************************************!*\
  !*** ./src/controller/userGroupController.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const UserGroupService = __webpack_require__(/*! ../service/userGroupService */ "./src/service/userGroupService.js");

class UserGroupController {
  static async getuserGroups(req, res, next) {
    try {
      const { userId } = req.params;
      const response = await UserGroupService.getUsersGroups(userId);

      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  static async addUserToGroup(req, res, next) {
    try {
      const { userId, groupId } = req.body;
      const response = await UserGroupService.addUserToGroup(userId, groupId);

      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }

  static async deleteUserFromGroup(req, res, next) {
    try {
      const { userId, groupId } = req.query;
      const response = await UserGroupService.deleteUserFromGroup(
        userId,
        groupId
      );

      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = UserGroupController;


/***/ }),

/***/ "./src/db/index.js":
/*!*************************!*\
  !*** ./src/db/index.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");
const ApiError = __webpack_require__(/*! ../apiError/apiError */ "./src/apiError/apiError.js");

function connectToTheMongoDB() {
  mongoose.connect('mongodb://localhost:27017/admin-panel-test-task', () => {
    console.log('Connected to the mongoDB');
  });
}

async function checkForTheDuplication(Model, document, fieldsToCheck) {
  async function findDuplicate(documentObj, paramName) {
    const duplicate = await Model.findOne({
      [paramName]: documentObj[paramName],
    });

    if (duplicate) {
      throw ApiError.badRequest(
        `${paramName} for ${Model.collection.name} must be unique`
      );
    }
  }

  for (const fieldVal of fieldsToCheck) {
    if (!Model.schema.obj[fieldVal]) {
      continue;
    }

    if (Array.isArray(document)) {
      for (const docVal of document) {
        await findDuplicate(docVal, fieldVal);
      }
    }

    await findDuplicate(document, fieldVal);
  }
}

function expandMongooseMethods() {
  // OVERWRITE mongoose.Model.create method

  const createRef = mongoose.Model.create;

  mongoose.Model.create = async function (docs, options, callback) {
    if (options && options.checkForDuplications) {
      await checkForTheDuplication(this, docs, options.checkForDuplications);
    }

    return createRef.apply(this, arguments);
  };

  // OVERWRITE mongoose.Model.updateOne method

  const updateRef = mongoose.Model.updateOne;

  mongoose.Model.updateOne = async function (
    filter,
    update,
    options,
    callback
  ) {
    if (options && options.checkForDuplications) {
      await checkForTheDuplication(this, update, options.checkForDuplications);
    }

    return updateRef.apply(this, arguments);
  };
}

expandMongooseMethods();

module.exports = { connectToTheMongoDB, expandMongooseMethods };


/***/ }),

/***/ "./src/middleware/errorMiddleware.js":
/*!*******************************************!*\
  !*** ./src/middleware/errorMiddleware.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ApiError = __webpack_require__(/*! ../apiError/apiError */ "./src/apiError/apiError.js");

module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.code).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
};


/***/ }),

/***/ "./src/models/models.js":
/*!******************************!*\
  !*** ./src/models/models.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { Schema, model } = __webpack_require__(/*! mongoose */ "mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    match: [
      /^[a-zA-Z0-9\.,-]{4,20}$/,
      "Username does't match required pattern",
    ],
  },

  firstName: {
    type: String,
    match: [
      /^[a-zA-Z]+\s?[a-zA-Z]+$/,
      "First name does't match required pattern",
    ],
    minlength: [2, 'First name is too short'],
    maxlength: [20, 'First name is too long'],
  },

  lastName: {
    type: String,
    match: [/^[a-zA-Z]+$/, "Last name does't match required pattern"],
    minlength: [2, 'Last name is too short'],
    maxlength: [20, 'Last name is too long'],
  },

  email: {
    type: String,
    unique: true,
    match: [
      /^[a-zA-Z0-9!#$%&'\*\+\-\/=?^_`{}|]{1,65}@([a-zA-Z0-9]+.){1,2}[a-zA-Z]{2,14}$/,
    ],
  },
});

const GroupSchema = new Schema({
  groupName: {
    type: String,
    unique: true,
    match: [
      /^[a-zA-Z0-9.-]{4,20}$/,
      "Group's name doesn't match required pattern",
    ],
  },

  groupTitle: {
    type: String,
    match: [
      /^[a-zA-Z0-9.-]{6,20}$/,
      "Group's title doesn't match required pattern",
    ],
  },
});

const UsersGroupsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  groupId: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
  },
});

const UserModel = model('User', UserSchema);
const GroupModel = model('Group', GroupSchema);
const UsersGroupsModel = model('UsersGroups', UsersGroupsSchema);

module.exports = {
  UserModel,
  GroupModel,
  UsersGroupsModel,
};


/***/ }),

/***/ "./src/routes/groupRouter.js":
/*!***********************************!*\
  !*** ./src/routes/groupRouter.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { Router } = __webpack_require__(/*! express */ "express");
const GroupController = __webpack_require__(/*! ../controller/groupController */ "./src/controller/groupController.js");

const groupRouter = new Router();

groupRouter.get('/get/:paramValue', GroupController.getGroup);
groupRouter.get('/get-many', GroupController.getGroups);
groupRouter.post('/create', GroupController.createGroup);
groupRouter.put('/edit/:id', GroupController.editGroup);
groupRouter.delete('/delete/:id', GroupController.deleteGroup);

module.exports = groupRouter;


/***/ }),

/***/ "./src/routes/index.js":
/*!*****************************!*\
  !*** ./src/routes/index.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { Router } = __webpack_require__(/*! express */ "express");
const groupRouter = __webpack_require__(/*! ./groupRouter */ "./src/routes/groupRouter.js");
const userGroupRouter = __webpack_require__(/*! ./userGroupRouter */ "./src/routes/userGroupRouter.js");
const userRouter = __webpack_require__(/*! ./userRouter */ "./src/routes/userRouter.js");

const mainRouter = new Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/group', groupRouter);
mainRouter.use('/user-group', userGroupRouter);

module.exports = mainRouter;


/***/ }),

/***/ "./src/routes/userGroupRouter.js":
/*!***************************************!*\
  !*** ./src/routes/userGroupRouter.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { Router } = __webpack_require__(/*! express */ "express");
const UserGroupController = __webpack_require__(/*! ../controller/userGroupController */ "./src/controller/userGroupController.js");

const userGroupRouter = new Router();

userGroupRouter.get('/get-groups/:userId', UserGroupController.getuserGroups);
userGroupRouter.post('/add-user', UserGroupController.addUserToGroup);
userGroupRouter.delete('/delete-user', UserGroupController.deleteUserFromGroup);

module.exports = userGroupRouter;


/***/ }),

/***/ "./src/routes/userRouter.js":
/*!**********************************!*\
  !*** ./src/routes/userRouter.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { Router } = __webpack_require__(/*! express */ "express");
const UserController = __webpack_require__(/*! ../controller/userController */ "./src/controller/userController.js");

const userRouter = new Router();

userRouter.get('/get/:paramValue', UserController.getUser);
userRouter.get('/get-many', UserController.getUsers);
userRouter.post('/create', UserController.createUser);
userRouter.put('/edit/:id', UserController.editUser);
userRouter.delete('/delete/:id', UserController.deleteUser);

module.exports = userRouter;


/***/ }),

/***/ "./src/service/groupService.js":
/*!*************************************!*\
  !*** ./src/service/groupService.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ApiError = __webpack_require__(/*! ../apiError/apiError */ "./src/apiError/apiError.js");
const { GroupModel } = __webpack_require__(/*! ../models/models */ "./src/models/models.js");
const createModelSearchQuery = __webpack_require__(/*! ../utils/createModelSearchQuery */ "./src/utils/createModelSearchQuery.js");

class GroupService {
  static async getGroup(paramName, paramValue) {
    if (GroupModel.schema.obj[paramName] === undefined && paramName !== '_id') {
      return null;
    }

    const group = await GroupModel.findOne({
      [paramName]: paramValue,
    });

    return group;
  }

  static async getGroups(searchObj, pageNum, limitNum) {
    const page = Number(pageNum) || 1;
    const limit = Number(limitNum) || 5;

    const searchQuery = createModelSearchQuery(searchObj);
    const groupsCount = await GroupModel.count(searchQuery);
    const groupsRows = await GroupModel.find(searchQuery)
      .skip(limit * (page - 1))
      .limit(limit);

    return { count: groupsCount, rows: groupsRows };
  }

  static async createGroup(groupName, groupTitle) {
    for (const arg of arguments) {
      if (!arg) {
        throw ApiError.badRequest('Not enough data for the Group creating');
      }
    }

    const group = await GroupModel.create(
      [
        {
          groupName,
          groupTitle,
        },
      ],
      { checkForDuplications: ['groupName'] }
    );

    return { message: `Group ${groupName} created successfully`, group };
  }

  static async editGroup(groupId, groupName, groupTitle) {
    const groupToEdit = await GroupModel.findById(groupId).catch(() => {
      throw ApiError.badRequest("Incorrect group's id");
    });

    if (!groupToEdit) {
      throw ApiError.badRequest("Group you try to edit doesn't exists");
    }

    await GroupModel.updateOne(
      { _id: groupId },
      { groupName, groupTitle },
      { checkForDuplications: ['groupName'], runValidators: true }
    );

    return { message: 'Group updated successfully' };
  }

  static async deleteGroup(groupId) {
    const groupToDelete = await GroupModel.findById(groupId).catch(() => {
      throw ApiError.badRequest("Incorrect group's id");
    });

    if (!groupToDelete) {
      throw ApiError.badRequest("Group you try to delete doesn't exists");
    }

    const deletedGroup = await groupToDelete.deleteOne({ _id: groupId });

    return { message: `Group deleted succesfully`, group: deletedGroup };
  }
}

module.exports = GroupService;


/***/ }),

/***/ "./src/service/userGroupService.js":
/*!*****************************************!*\
  !*** ./src/service/userGroupService.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ApiError = __webpack_require__(/*! ../apiError/apiError */ "./src/apiError/apiError.js");
const { GroupModel, UserModel, UsersGroupsModel } = __webpack_require__(/*! ../models/models */ "./src/models/models.js");

async function checkUserAndGroup(
  userId,
  groupId,
  userErrorMessage,
  groupErrorMessage
) {
  const user = await UserModel.findById(userId).catch(() => {
    throw ApiError.badRequest("Incorrect user's id");
  });

  if (!user) {
    throw ApiError.badRequest(userErrorMessage);
  }

  const group = await GroupModel.findById(groupId).catch(() => {
    throw ApiError.badRequest("Incorrect group's id");
  });

  if (!group) {
    throw ApiError.badRequest(groupErrorMessage);
  }

  return { user, group };
}

class UserGroupService {
  static async getUserGroupConnection(userId, groupId) {
    const userGroupRecord = await UsersGroupsModel.find({ userId, groupId });

    return userGroupRecord;
  }

  static async getUsersGroups(userId) {
    const user = await UserModel.findOne({ id: userId });

    if (!user) {
      throw ApiError.badRequest("User with such id doesn't edit");
    }

    let userGroupsConnections = await UsersGroupsModel.find({
      userId,
    });

    //convert an array of user-group connections to the array of groups ids, wich have connection with the user
    userGroupsConnections = userGroupsConnections.map((connection) => {
      connection = String(connection.groupId);
      return connection;
    });

    const userGroups = await GroupModel.find({
      _id: { $in: [...userGroupsConnections] },
    });

    return userGroups;
  }

  static async addUserToGroup(userId, groupId) {
    const userAndGroup = await checkUserAndGroup(
      userId,
      groupId,
      "User you want add to the group, doesn't exists",
      "Group in what you want to add the User, doesn't exists"
    );

    const userGroupConnection = await UsersGroupsModel.findOne({
      userId: userAndGroup.user._id,
      groupId: userAndGroup.group._id,
    });

    if (userGroupConnection) {
      throw ApiError.badRequest('User is already in the group');
    }

    await UsersGroupsModel.create({
      userId: userAndGroup.user._id,
      groupId: userAndGroup.group._id,
    });

    return {
      message: `User ${userAndGroup.user.username} successfully added to the ${userAndGroup.group.groupName} group`,
    };
  }

  static async deleteUserFromGroup(userId, groupId) {
    const userAndGroup = await checkUserAndGroup(
      userId,
      groupId,
      "User you want to delete from the group, doesn't exists",
      "Group in what you want to delete the User, doesn't exists"
    );

    const userGroupConnection = await UsersGroupsModel.findOne({
      userId: userAndGroup.user._id,
      groupId: userAndGroup.group._id,
    });

    if (!userGroupConnection) {
      throw ApiError.badRequest(
        `Connection between ${userAndGroup.user.username}(User) and ${userAndGroup.group.groupName}(Group) doesn't exists`
      );
    }

    userGroupConnection.deleteOne({ _id: userAndGroup.user.id });

    return {
      message: `User ${userAndGroup.user.username} successfully deleted from the group ${userAndGroup.group.groupName}`,
    };
  }
}

module.exports = UserGroupService;


/***/ }),

/***/ "./src/service/userService.js":
/*!************************************!*\
  !*** ./src/service/userService.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ApiError = __webpack_require__(/*! ../apiError/apiError */ "./src/apiError/apiError.js");
const { UserModel } = __webpack_require__(/*! ../models/models */ "./src/models/models.js");
const createModelSearchQuery = __webpack_require__(/*! ../utils/createModelSearchQuery */ "./src/utils/createModelSearchQuery.js");

class UserService {
  static async getUser(paramName, paramValue) {
    if (UserModel.schema.obj[paramName] === undefined && paramName !== '_id') {
      return null;
    }

    const user = await UserModel.findOne({
      [paramName]: paramValue,
    });

    return user;
  }

  static async getUsers(filterObj, pageNum, limitNum) {
    const page = Number(pageNum) || 1;
    const limit = Number(limitNum) || 5;

    const searchQuery = createModelSearchQuery(filterObj);
    const usersCount = await UserModel.count(searchQuery);
    const usersRows = await UserModel.find(searchQuery)
      .skip(limit * (page - 1))
      .limit(limit);

    return { count: usersCount, rows: usersRows };
  }

  static async createUser(username, firstName, lastName, email) {
    for (const argValue of arguments) {
      if (!argValue) {
        throw ApiError.badRequest('Not enough data for the user creating');
      }
    }

    const user = await UserModel.create(
      [
        {
          username,
          firstName,
          lastName,
          email,
        },
      ],
      { checkForDuplications: ['username', 'email', 'what'] }
    );

    return { message: 'User created successfully', user };
  }

  static async editUser(userId, username, firstName, lastName, email) {
    const userToEdit = await UserModel.findById(userId).catch(() => {
      throw ApiError.badRequest("Incorrect user's id");
    });

    if (!userToEdit) {
      throw ApiError.badRequest("User you try to edit doesn't exists");
    }

    await UserModel.updateOne(
      { _id: userId },
      {
        username,
        firstName,
        lastName,
        email,
      },
      { checkForDuplications: ['username', 'email'], runValidators: true }
    );

    return { message: 'User updated successfully' };
  }

  static async deleteUser(userId) {
    const userToDelete = await UserModel.findById(userId).catch(() => {
      throw ApiError.badRequest("Incorrect user's id");
    });

    if (!userToDelete) {
      throw ApiError.badRequest("User you try to delete doesn't exists");
    }
    const user = await userToDelete.deleteOne({ _id: userId });

    return { message: 'User deleted successfully', user };
  }
}

module.exports = UserService;


/***/ }),

/***/ "./src/utils/createModelSearchQuery.js":
/*!*********************************************!*\
  !*** ./src/utils/createModelSearchQuery.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ApiError = __webpack_require__(/*! ../apiError/apiError */ "./src/apiError/apiError.js");

function createModelSearchQuery(obj) {
  if (!obj) {
    return {};
  }

  let parsedObj;
  if (obj) {
    try {
      parsedObj = JSON.parse(obj);
    } catch (e) {
      throw ApiError.badRequest(e);
    }
  }

  const finalObject = {};

  function fillFinalObject(mockObj, paramName = '') {
    for (const objKey in mockObj) {
      if (!Object.prototype.hasOwnProperty.call(mockObj, objKey)) {
        continue;
      }

      if (typeof mockObj[objKey] === 'object') {
        const newParamName = paramName.length
          ? `${paramName}.${objKey}`
          : objKey;

        return fillFinalObject(mockObj[objKey], newParamName);
      }

      const finalObjectParamName = paramName.length
        ? `${paramName}.${objKey}`
        : objKey;
      const numberRange = mockObj[objKey].split('|');

      if (numberRange.length !== 2) {
        finalObject[finalObjectParamName] = { $regex: mockObj[objKey] };
      } else {
        if (Number(numberRange[0])) {
          finalObject[finalObjectParamName] = {
            ...finalObject[finalObjectParamName],
            $gte: numberRange[0],
          };
        }

        if (Number(numberRange[1])) {
          finalObject[finalObjectParamName] = {
            ...finalObject[finalObjectParamName],
            $lte: numberRange[1],
          };
        }
      }
    }
  }

  fillFinalObject(parsedObj);

  return finalObject;
}

module.exports = createModelSearchQuery;


/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__webpack_require__(/*! dotenv */ "dotenv").config)();
const express = __webpack_require__(/*! express */ "express");
const cors = __webpack_require__(/*! cors */ "cors");
const { connectToTheMongoDB } = __webpack_require__(/*! ./db */ "./src/db/index.js");
const errorMiddleware = __webpack_require__(/*! ./middleware/errorMiddleware */ "./src/middleware/errorMiddleware.js");
const mainRouter = __webpack_require__(/*! ./routes */ "./src/routes/index.js");

const app = express();
app.use(
  cors({
    origin: process.env.FRONT_APP_LINK,
  })
);
app.use(express.json());
app.use('/api', mainRouter);
app.use(errorMiddleware);
const PORT = process.env.PORT || 5000;

async function start() {
  try {
    connectToTheMongoDB();
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
start();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map