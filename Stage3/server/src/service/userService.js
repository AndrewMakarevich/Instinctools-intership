import ApiError from "../apiError/apiError";
import { UserModel } from "../models/models";
import createModelSearchQuery from "../utils/createModelSearchQuery";

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

  static async getUsers(filterObj) {
    const searchQuery = createModelSearchQuery(filterObj);
    const users = await UserModel.find(searchQuery);

    return users;
  }

  static async createUser(username, firstName, lastName, email) {
    for (let argValue of arguments) {
      if (!argValue) {
        throw ApiError.badRequest("Not enough data for the user creating");
      }
    }

    await UserModel.create([{
      username,
      firstName,
      lastName,
      email
    }], { checkForDuplications: ["username", "email", "what"] });

    return { message: "User created successfully" };
  };

  static async deleteUser(userId) {
    const userToDelete = await UserModel.findById(userId).catch(() => {
      throw ApiError.badRequest("Incorrect user's id");
    });

    if (!userToDelete) {
      throw ApiError.badRequest("User you try to delete doesn't exists");
    }
    userToDelete.deleteOne({ _id: userId });

    return { message: "User deleted successfully" };
  }

};
export default UserService;