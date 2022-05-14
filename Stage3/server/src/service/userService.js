const ApiError = require('../apiError/apiError');
const { UserModel } = require('../models/models');
const checkId = require('../utils/checkId');
const createModelSearchQuery = require('../utils/createModelSearchQuery');

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
