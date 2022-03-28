import ApiError from "../apiError/apiError";
import { GroupModel } from "../models/models";

class GroupService {

  static async getGroup(paramName, paramValue) {
    if (GroupModel.schema.obj[paramName] === undefined && paramName !== "_id") {
      return null;
    }

    const group = await GroupModel.findOne({
      [paramName]: paramValue
    });

    return group;
  }

  static async createGroup(groupName, groupTitle) {
    for (let arg of arguments) {

      if (!arg) {
        throw ApiError.badRequest('Not enough data for the Group creating')
      }
    }

    await GroupModel.create([{
      groupName,
      groupTitle
    }], { checkForDuplications: ["groupName"] });

    return { message: `Group ${groupName} created successfully` };
  };

};

export default GroupService;