import UserGroupService from "../service/userGroupService";

class UserGroupController {

  static async addUserToGroup(req, res, next) {
    try {
      const { userId, groupId } = req.body;
      const response = await UserGroupService.addUserToGroup(userId, groupId);

      return res.json(response);
    } catch (e) {
      next(e);
    }
  }
}

export default UserGroupController;