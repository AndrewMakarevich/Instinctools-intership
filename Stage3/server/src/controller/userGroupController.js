const UserGroupService = require('../service/userGroupService');

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
      next(e);
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
