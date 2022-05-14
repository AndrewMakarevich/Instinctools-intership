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
  static async getUserGroups(req, res, next) {
    try {
      const { userId } = req.params;
      const { filterObject, page, limit } = req.query;
      const response = await UserGroupService.getUsersGroups(
        userId,
        filterObject,
        page,
        limit
      );

      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }

  static async getGroupUsers(req, res, next) {
    try {
      const { groupId } = req.params;
      const { filterObject, page, limit } = req.query;
      const response = await UserGroupService.getGroupUsers(
        groupId,
        filterObject,
        page,
        limit
      );

      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }

  static async getNotGroupMembers(req, res, next) {
    try {
      const { groupId } = req.params;
      const { filterObject, page, limit } = req.query;
      const response = await UserGroupService.getNotGroupMembers(
        groupId,
        filterObject,
        page,
        limit
      );

      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }

  static async getGroupsUserNotParticipateIn(req, res, next) {
    try {
      const { userId } = req.params;
      const { filterObject, page, limit } = req.query;

      const response = await UserGroupService.getGroupsUserNotParticipateIn(
        userId,
        filterObject,
        page,
        limit
      );

      return res.json(response);
    } catch (e) {
      return next(e);
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
  const checkForDuplicates = [];
  for (const fieldVal of fieldsToCheck) {
    if (!Model.schema.obj[fieldVal]) {
      continue;
    }

    if (Array.isArray(document)) {
      for (const docVal of document) {
        checkForDuplicates.push(findDuplicate(docVal, fieldVal));
      }
      continue;
    }

    checkForDuplicates.push(findDuplicate(document, fieldVal));
  }
  await Promise.all(checkForDuplicates);
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

UsersGroupsSchema.index({ userId: 1, groupId: 1 }, { unique: true });

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

userGroupRouter.get('/get-groups/:userId', UserGroupController.getUserGroups);
userGroupRouter.get('/get-users/:groupId', UserGroupController.getGroupUsers);
userGroupRouter.get(
  '/get-not-members/:groupId',
  UserGroupController.getNotGroupMembers
);
userGroupRouter.get(
  '/get-groups-user-not-participate/:userId',
  UserGroupController.getGroupsUserNotParticipateIn
);
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
const checkId = __webpack_require__(/*! ../utils/checkId */ "./src/utils/checkId.js");
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
    const group = await GroupModel.create({
      groupName,
      groupTitle,
    }).catch((e) => {
      if (
        e.name === 'MongoServerError' &&
        e.code === 11000 &&
        e.message.includes('groupName')
      ) {
        throw ApiError.badRequest('Group name must be unique');
      }

      throw ApiError.badRequest(e.message);
    });

    return { message: `Group ${groupName} created successfully`, group };
  }

  static async editGroup(groupId, groupName, groupTitle) {
    checkId(groupId, 'Incorrect group id');

    const editResult = await GroupModel.updateOne(
      { _id: groupId },
      { groupName, groupTitle },
      { runValidators: true }
    ).catch((e) => {
      if (
        e.name === 'MongoServerError' &&
        e.code === 11000 &&
        e.message.includes('groupName')
      ) {
        throw ApiError.badRequest('Group name must be unique');
      }

      throw ApiError.badRequest(e.message);
    });

    if (!editResult.acknowledged) {
      throw ApiError.badRequest("Can't find data to modify user");
    }

    if (editResult.matchedCount === 0) {
      throw ApiError.badRequest("Group you try to modify doesn't exists");
    }

    if (editResult.modifiedCount === 0) {
      throw ApiError.badRequest('Nothing to change');
    }

    return { message: 'Group updated successfully' };
  }

  static async deleteGroup(groupId) {
    checkId(groupId, 'Incorrect group id');

    const deletedGroup = await GroupModel.deleteOne({ _id: groupId }).catch(
      (e) => {
        throw ApiError.badRequest(e);
      }
    );

    if (deletedGroup.deletedCount === 0) {
      throw ApiError.badRequest(
        "Group you try to delete doesn't exists or already deleted"
      );
    }

    return { message: `Group deleted succesfully` };
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
const checkId = __webpack_require__(/*! ../utils/checkId */ "./src/utils/checkId.js");
const createModelSearchQuery = __webpack_require__(/*! ../utils/createModelSearchQuery */ "./src/utils/createModelSearchQuery.js");

class UserGroupService {
  static async getUserGroupConnection(userId, groupId) {
    const userGroupRecord = await UsersGroupsModel.find({ userId, groupId });

    return userGroupRecord;
  }

  static async getUsersGroups(userId, filterObject, page = 1, limit = 5) {
    checkId(userId, 'Incorrect user id');

    let userGroupsConnections = await UsersGroupsModel.find({
      userId,
    });

    if (!userGroupsConnections.length) {
      return { count: 0, rows: [] };
    }

    const parsedFilterObj = createModelSearchQuery(filterObject);
    const skipValue = (page - 1) * limit;

    // convert an array of user-group connections to the array of groups ids, wich have connection with the user
    userGroupsConnections = userGroupsConnections.map((connection) =>
      String(connection.groupId)
    );

    const userGroups = await GroupModel.find({
      _id: { $in: [...userGroupsConnections] },
      ...parsedFilterObj,
    })
      .skip(skipValue)
      .limit(limit);

    const userGroupsCount = await GroupModel.count({
      _id: { $in: [...userGroupsConnections] },
      ...parsedFilterObj,
    });

    return { count: userGroupsCount, rows: userGroups };
  }

  static async getGroupsUserNotParticipateIn(
    userId,
    filterObject,
    page = 1,
    limit = 5
  ) {
    await checkId(userId, 'Incorrect userId');

    const userGroupConnections = await UsersGroupsModel.find({
      userId,
    });

    const parsedFilterObj = createModelSearchQuery(filterObject);
    const skipValue = (page - 1) * limit;

    const userGroupsIds = userGroupConnections.map(
      (connection) => connection.groupId
    );

    const groups = await GroupModel.find({
      _id: { $nin: userGroupsIds },
      ...parsedFilterObj,
    })
      .skip(skipValue)
      .limit(limit);

    const groupsCount = await GroupModel.count({
      _id: { $nin: userGroupsIds },
      ...parsedFilterObj,
    });

    return { count: groupsCount, rows: groups };
  }

  static async getGroupUsers(groupId, filterObject, page = 1, limit = 5) {
    await checkId(groupId, 'Incorrect group id');

    let userGroupConnections = await UsersGroupsModel.find({
      groupId,
    });

    if (!userGroupConnections.length) {
      return { count: 0, rows: [] };
    }

    const skipValue = (page - 1) * limit;

    const parsedFilterObject = createModelSearchQuery(filterObject);

    userGroupConnections = userGroupConnections.map((connection) =>
      String(connection.userId)
    );

    const users = await UserModel.find({
      _id: { $in: [...userGroupConnections] },
      ...parsedFilterObject,
    })
      .skip(skipValue)
      .limit(limit);

    const usersCount = await UserModel.count({
      _id: { $in: [...userGroupConnections] },
      ...parsedFilterObject,
    });

    return { count: usersCount, rows: users };
  }

  static async getNotGroupMembers(groupId, filterObject, page = 1, limit = 5) {
    await checkId(groupId, 'Incorrect group id');

    let userGroupConnections = await UsersGroupsModel.find({
      groupId,
    });

    const parsedFilterObj = createModelSearchQuery(filterObject);
    const skipValue = (page - 1) * limit;

    userGroupConnections = userGroupConnections.map(
      (connection) => connection.userId
    );

    const notMembers = await UserModel.find({
      _id: { $nin: userGroupConnections },
      ...parsedFilterObj,
    })
      .skip(skipValue)
      .limit(limit);

    const notMembersCount = await UserModel.count({
      _id: { $nin: userGroupConnections },
      ...parsedFilterObj,
    });

    return { count: notMembersCount, rows: notMembers };
  }

  static async addUserToGroup(userId, groupId) {
    checkId(userId, 'Incorrect user id');
    checkId(groupId, 'Incorrect group id');

    const user = await UserModel.findById(userId);
    const group = await GroupModel.findById(groupId);

    if (!user) {
      throw ApiError.badRequest(
        "User you try to add to the group doesn't exists"
      );
    }

    if (!group) {
      throw ApiError.badRequest(
        "Group in what you try to add user doesn't exists"
      );
    }

    await UsersGroupsModel.create({
      userId,
      groupId,
    }).catch((e) => {
      if (e.code === 11000) {
        throw ApiError.badRequest('User is already a member of this group');
      }
      throw ApiError.badRequest(e.message);
    });

    return {
      message: `User successfully added to the group`,
    };
  }

  static async deleteUserFromGroup(userId, groupId) {
    checkId(userId, 'Incorrect user id');
    checkId(groupId, 'Incorrect group id');

    const deletionResult = await UsersGroupsModel.deleteOne({
      userId,
      groupId,
    });

    if (deletionResult.deletedCount === 0) {
      throw ApiError.badRequest("User's not a member of this group");
    }

    return {
      message: `User successfully deleted from the group`,
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
const checkId = __webpack_require__(/*! ../utils/checkId */ "./src/utils/checkId.js");
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

  static async getUsers(filterObj, page = 1, limit = 5) {
    const searchQuery = createModelSearchQuery(filterObj);
    const usersCount = await UserModel.count(searchQuery);
    const usersRows = await UserModel.find(searchQuery)
      .skip(limit * (page - 1))
      .limit(limit);

    return { count: usersCount, rows: usersRows };
  }

  static async createUser(username, firstName, lastName, email) {
    const user = await UserModel.create({
      username,
      firstName,
      lastName,
      email,
    }).catch((e) => {
      if (e.name === 'MongoServerError' && e.code === 11000) {
        if (e.message.includes('username')) {
          throw ApiError.badRequest('Username must be unique');
        }

        if (e.message.includes('email')) {
          throw ApiError.badRequest('Email must be unique');
        }
      }
      throw ApiError.badRequest(e.message);
    });

    return { message: 'User created successfully', user };
  }

  static async editUser(userId, username, firstName, lastName, email) {
    checkId(userId, 'Incorrect user id');

    const updateResult = await UserModel.updateOne(
      { _id: userId },
      {
        username,
        firstName,
        lastName,
        email,
      },
      { runValidators: true }
    ).catch((e) => {
      if (e.name === 'MongoServerError' && e.code === 11000) {
        if (e.message.includes('username')) {
          throw ApiError.badRequest('Username must be unique');
        }

        if (e.message.includes('email')) {
          throw ApiError.badRequest('Email must be unique');
        }
      }
      throw ApiError.badRequest(e.message);
    });

    if (!updateResult.acknowledged) {
      throw ApiError.badRequest("Can't find data to modify user");
    }

    if (updateResult.matchedCount === 0) {
      throw ApiError.badRequest("User you try to modify, doesn't exists");
    }

    if (updateResult.modifiedCount === 0) {
      throw ApiError.badRequest('Nothing to change');
    }

    return { message: updateResult };
  }

  static async deleteUser(userId) {
    checkId(userId, 'Incorrect user id');
    const deletionReault = await UserModel.deleteOne({ _id: userId });

    if (deletionReault.deletedCount === 0) {
      throw ApiError.badRequest(
        "User you try to delete doesn't exists or already deleted"
      );
    }

    return { message: 'User deleted successfully' };
  }
}

module.exports = UserService;


/***/ }),

/***/ "./src/utils/checkId.js":
/*!******************************!*\
  !*** ./src/utils/checkId.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ApiError = __webpack_require__(/*! ../apiError/apiError */ "./src/apiError/apiError.js");

function checkId(id, errorMessage) {
  if (!/^[a-fA-F0-9]{24}$/.test(id)) {
    throw ApiError.badRequest(errorMessage);
  }
}

module.exports = checkId;


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
    Object.keys(mockObj).forEach((objKey) => {
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
        finalObject[finalObjectParamName] = {
          $regex: mockObj[objKey],
          $options: 'gi',
        };
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
    });
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
    origin: [process.env.FRONT_APP_LINK, 'http://localhost'],
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