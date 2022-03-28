import { UserModel } from "../models/models";
import UserService from "../service/userService";

class UserController {

  static async getUser(req, res, next) {
    try {
      const usersParamValueToFind = req.params.paramValue;
      const usersParamNameToFind = req.query.paramName;

      const response = await UserService.getUser(usersParamNameToFind, usersParamValueToFind);

      return res.json(response);
    } catch (e) {
      next(e);
    }
  };

  static async createUser(req, res, next) {
    try {
      console.log(req.body);
      const { username, firstName, lastName, email } = req.body;
      const userCreationResponse = await UserService.createUser(username, firstName, lastName, email);

      return res.json(userCreationResponse);
    } catch (e) {
      next(e);
    }
  };

}
export default UserController;