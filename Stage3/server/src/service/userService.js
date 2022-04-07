const ApiError = require("../apiError/apiError.js");
const { UserModel } = require("../models/models.js");
const createModelSearchQuery = require("../utils/createModelSearchQuery.js");

class UserService {

  static async getUser(paramName, paramValue) {
    if (UserModel.schema.obj[paramName] === undefined && paramName !== "_id") {
      return null;
    }

    const user = await UserModel.findOne({
      [paramName]: paramValue
    });

    return user;
  };

  static async getUsers(filterObj, page, limit) {
    page = Number(page) || 1;
    limit = Number(limit) || 5;

    const searchQuery = createModelSearchQuery(filterObj);
    const usersCount = await UserModel.count(searchQuery);
    const usersRows = await UserModel.find(searchQuery).skip(limit * (page - 1)).limit(limit);

    return { count: usersCount, rows: usersRows };
  }

  static async createUser(username, firstName, lastName, email) {
    for (let argValue of arguments) {
      if (!argValue) {
        throw ApiError.badRequest("Not enough data for the user creating");
      }
    }

    const user = await UserModel.create([{
      username,
      firstName,
      lastName,
      email
    }], { checkForDuplications: ["username", "email", "what"] });

    return { message: "User created successfully", user };
  };

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
        email
      },
      { checkForDuplications: ["username", "email"], runValidators: true }
    );

    return { message: "User updated successfully" };
  }

  static async deleteUser(userId) {
    const userToDelete = await UserModel.findById(userId).catch(() => {
      throw ApiError.badRequest("Incorrect user's id");
    });

    if (!userToDelete) {
      throw ApiError.badRequest("User you try to delete doesn't exists");
    }
    const user = await userToDelete.deleteOne({ _id: userId });

    return { message: "User deleted successfully", user };
  }

};

module.exports = UserService;