const ApiError = require('../apiError/apiError');
const { GroupModel } = require('../models/models');
const createModelSearchQuery = require('../utils/createModelSearchQuery');

class GroupService {
  static async getGroup(paramName, paramValue) {
    if (GroupModel.schema.obj[paramName] === undefined && paramName !== '_id') {
      return null;
    }

    const group = await GroupModel.findOne({
      [paramName]: paramValue,
    });

    return group;
  }

  static async getGroups(searchObj, pageNum, limitNum) {
    const page = Number(pageNum) || 1;
    const limit = Number(limitNum) || 5;

    const searchQuery = createModelSearchQuery(searchObj);
    const groupsCount = await GroupModel.count(searchQuery);
    const groupsRows = await GroupModel.find(searchQuery)
      .skip(limit * (page - 1))
      .limit(limit);

    return { count: groupsCount, rows: groupsRows };
  }

  static async createGroup(groupName, groupTitle) {
    for (const arg of arguments) {
      if (!arg) {
        throw ApiError.badRequest('Not enough data for the Group creating');
      }
    }

    const group = await GroupModel.create(
      [
        {
          groupName,
          groupTitle,
        },
      ],
      { checkForDuplications: ['groupName'] }
    );

    return { message: `Group ${groupName} created successfully`, group };
  }

  static async editGroup(groupId, groupName, groupTitle) {
    const groupToEdit = await GroupModel.findById(groupId).catch(() => {
      throw ApiError.badRequest("Incorrect group's id");
    });

    if (!groupToEdit) {
      throw ApiError.badRequest("Group you try to edit doesn't exists");
    }

    await GroupModel.updateOne(
      { _id: groupId },
      { groupName, groupTitle },
      { checkForDuplications: ['groupName'], runValidators: true }
    );

    return { message: 'Group updated successfully' };
  }

  static async deleteGroup(groupId) {
    const groupToDelete = await GroupModel.findById(groupId).catch(() => {
      throw ApiError.badRequest("Incorrect group's id");
    });

    if (!groupToDelete) {
      throw ApiError.badRequest("Group you try to delete doesn't exists");
    }

    const deletedGroup = await groupToDelete.deleteOne({ _id: groupId });

    return { message: `Group deleted succesfully`, group: deletedGroup };
  }
}

module.exports = GroupService;
