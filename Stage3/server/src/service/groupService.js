const ApiError = require('../apiError/apiError');
const { GroupModel } = require('../models/models');
const checkId = require('../utils/checkId');
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
    const group = await GroupModel.create({
      groupName,
      groupTitle,
    }).catch((e) => {
      if (
        e.name === 'MongoServerError' &&
        e.code === 11000 &&
        e.message.includes('groupName')
      ) {
        throw ApiError.badRequest('Group name must be unique');
      }

      throw ApiError.badRequest(e.message);
    });

    return { message: `Group ${groupName} created successfully`, group };
  }

  static async editGroup(groupId, groupName, groupTitle) {
    checkId(groupId, 'Incorrect group id');

    const editResult = await GroupModel.updateOne(
      { _id: groupId },
      { groupName, groupTitle },
      { runValidators: true }
    ).catch((e) => {
      if (
        e.name === 'MongoServerError' &&
        e.code === 11000 &&
        e.message.includes('groupName')
      ) {
        throw ApiError.badRequest('Group name must be unique');
      }

      throw ApiError.badRequest(e.message);
    });

    if (!editResult.acknowledged) {
      throw ApiError.badRequest("Can't find data to modify user");
    }

    if (editResult.matchedCount === 0) {
      throw ApiError.badRequest("Group you try to modify doesn't exists");
    }

    if (editResult.modifiedCount === 0) {
      throw ApiError.badRequest('Nothing to change');
    }

    return { message: 'Group updated successfully' };
  }

  static async deleteGroup(groupId) {
    checkId(groupId, 'Incorrect group id');

    const deletedGroup = await GroupModel.deleteOne({ _id: groupId }).catch(
      (e) => {
        throw ApiError.badRequest(e);
      }
    );

    if (deletedGroup.deletedCount === 0) {
      throw ApiError.badRequest(
        "Group you try to delete doesn't exists or already deleted"
      );
    }

    return { message: `Group deleted succesfully` };
  }
}

module.exports = GroupService;
