const GroupService = require("../service/groupService.js");

class GroupController {

  static async getGroup(req, res, next) {
    try {
      const groupsParamValueToFind = req.params.paramValue;
      const groupsParamNameToFind = req.query.paramName;

      console.log(groupsParamNameToFind);
      console.log(groupsParamValueToFind);

      const response = await GroupService.getGroup(groupsParamNameToFind, groupsParamValueToFind);

      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  static async getGroups(req, res, next) {
    try {
      const { filterObject, page, limit } = req.query;
      const response = await GroupService.getGroups(filterObject, page, limit);

      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  static async createGroup(req, res, next) {
    try {
      const { groupName, groupTitle } = req.body;
      const response = await GroupService.createGroup(groupName, groupTitle);

      return res.json(response);
    } catch (e) {
      next(e);
    }
  };

  static async editGroup(req, res, next) {
    try {
      const { id } = req.params;
      const { groupName, groupTitle } = req.body;
      const response = await GroupService.editGroup(id, groupName, groupTitle);

      return res.json(response);
    } catch (e) {
      next(e);
    }
  };

  static async deleteGroup(req, res, next) {
    try {
      const { id } = req.params;
      const response = await GroupService.deleteGroup(id);

      return res.json(response);
    } catch (e) {
      next(e);
    }
  };

}

module.exports = GroupController;