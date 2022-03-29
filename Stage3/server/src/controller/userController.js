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

  static async getUsers(req, res, next) {
    try {
      const { filterObject, page, limit } = req.query;
      const response = await UserService.getUsers(filterObject, page, limit);

      return res.json(response);
    } catch (e) {
      next(e);
    }
  };

  static async createUser(req, res, next) {
    try {
      const { username, firstName, lastName, email } = req.body;
      const userCreationResponse = await UserService.createUser(username, firstName, lastName, email);

      return res.json(userCreationResponse);
    } catch (e) {
      next(e);
    }
  };

  static async editUser(req, res, next) {
    try {
      const { id } = req.params;
      const { username, firstName, lastName, email } = req.body;
      const response = await UserService.editUser(id, username, firstName, lastName, email);

      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const response = await UserService.deleteUser(id);

      return res.json(response);
    } catch (e) {
      next(e);
    }
  };

}
export default UserController;