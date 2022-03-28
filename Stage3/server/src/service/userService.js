import ApiError from "../apiError/apiError";
import { UserModel } from "../models/models";

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

  static async getUsers() {

  }

  static async createUser(username, firstName, lastName, email) {
    for (let argValue of arguments) {

      if (!argValue) {
        throw ApiError.badRequest('Not enough data for the user creating');
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

};
export default UserService;