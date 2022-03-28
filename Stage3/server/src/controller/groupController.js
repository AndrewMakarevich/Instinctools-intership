import GroupService from "../service/groupService";

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

  static async createGroup(req, res, next) {
    try {
      const { groupName, groupTitle } = req.body;
      const response = await GroupService.createGroup(groupName, groupTitle);

      return res.json(response);
    } catch (e) {
      next(e);
    }
  };

}

export default GroupController;