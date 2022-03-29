import ApiError from "../apiError/apiError";
import { GroupModel } from "../models/models";
import createModelSearchQuery from "../utils/createModelSearchQuery";

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

  static async getGroups(searchObj) {
    let searchQuery = createModelSearchQuery(searchObj);
    const groups = await GroupModel.find(searchQuery);

    return groups;
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

  static async deleteGroup(groupId) {
    const groupToDelete = await GroupModel.findById(groupId).catch(() => {
      throw ApiError.badRequest("Incorrect group's id");
    });

    if (!groupToDelete) {
      throw ApiError.badRequest("Group you try to delete doesn't exists");
    }

    await groupToDelete.deleteOne({ _id: groupId });

    return { message: `Group deleted succesfully` };
  }

};

export default GroupService;