import UserService from "../service/userService";

class UserController {
  async createUser(req, res, next) {
    try {
      console.log(req.body);
      const { username, firstName, lastName, email } = req.body;
      const userCreationResponse = await UserService.createUser(username, firstName, lastName, email);

      return res.json(userCreationResponse);
    } catch (e) {
      next(e);
    }

  }
}
export default new UserController();