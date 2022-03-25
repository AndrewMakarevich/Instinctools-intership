import ApiError from "../apiError/apiError";
import { UserModel } from "../models/models";

class UserService {
  async createUser(username, firstName, lastName, email) {
    for (let argValue of arguments) {
      if (!argValue) {
        throw ApiError.badRequest('Not enough data for the user creating');
      }
    }
    const user = await UserModel.create({
      username,
      firstName,
      lastName,
      email
    }, { checkForDuplications: ["username", "email"] });
    console.log(user);


    return { message: "User created successfully" };
  }

};
export default new UserService;