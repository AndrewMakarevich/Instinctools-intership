const ApiError = require('../apiError/apiError');
const { GroupModel, UserModel, UsersGroupsModel } = require('../models/models');
const checkId = require('../utils/checkId');
const createModelSearchQuery = require('../utils/createModelSearchQuery');

class UserGroupService {
  static async getUserGroupConnection(userId, groupId) {
    const userGroupRecord = await UsersGroupsModel.find({ userId, groupId });

    return userGroupRecord;
  }

  static async getUsersGroups(userId, filterObject, page = 1, limit = 5) {
    checkId(userId, 'Incorrect user id');

    let userGroupsConnections = await UsersGroupsModel.find({
      userId,
    });

    if (!userGroupsConnections.length) {
      return { count: 0, rows: [] };
    }

    const parsedFilterObj = createModelSearchQuery(filterObject);
    const skipValue = (page - 1) * limit;

    // convert an array of user-group connections to the array of groups ids, wich have connection with the user
    userGroupsConnections = userGroupsConnections.map((connection) =>
      String(connection.groupId)
    );

    const userGroups = await GroupModel.find({
      _id: { $in: [...userGroupsConnections] },
      ...parsedFilterObj,
    })
      .skip(skipValue)
      .limit(limit);

    const userGroupsCount = await GroupModel.count({
      _id: { $in: [...userGroupsConnections] },
      ...parsedFilterObj,
    });

    return { count: userGroupsCount, rows: userGroups };
  }

  static async getGroupsUserNotParticipateIn(
    userId,
    filterObject,
    page = 1,
    limit = 5
  ) {
    await checkId(userId, 'Incorrect userId');

    const userGroupConnections = await UsersGroupsModel.find({
      userId,
    });

    const parsedFilterObj = createModelSearchQuery(filterObject);
    const skipValue = (page - 1) * limit;

    const userGroupsIds = userGroupConnections.map(
      (connection) => connection.groupId
    );

    const groups = await GroupModel.find({
      _id: { $nin: userGroupsIds },
      ...parsedFilterObj,
    })
      .skip(skipValue)
      .limit(limit);

    const groupsCount = await GroupModel.count({
      _id: { $nin: userGroupsIds },
      ...parsedFilterObj,
    });

    return { count: groupsCount, rows: groups };
  }

  static async getGroupUsers(groupId, filterObject, page = 1, limit = 5) {
    await checkId(groupId, 'Incorrect group id');

    let userGroupConnections = await UsersGroupsModel.find({
      groupId,
    });

    if (!userGroupConnections.length) {
      return { count: 0, rows: [] };
    }

    const skipValue = (page - 1) * limit;

    const parsedFilterObject = createModelSearchQuery(filterObject);

    userGroupConnections = userGroupConnections.map((connection) =>
      String(connection.userId)
    );

    const users = await UserModel.find({
      _id: { $in: [...userGroupConnections] },
      ...parsedFilterObject,
    })
      .skip(skipValue)
      .limit(limit);

    const usersCount = await UserModel.count({
      _id: { $in: [...userGroupConnections] },
      ...parsedFilterObject,
    });

    return { count: usersCount, rows: users };
  }

  static async getNotGroupMembers(groupId, filterObject, page = 1, limit = 5) {
    await checkId(groupId, 'Incorrect group id');

    let userGroupConnections = await UsersGroupsModel.find({
      groupId,
    });

    const parsedFilterObj = createModelSearchQuery(filterObject);
    const skipValue = (page - 1) * limit;

    userGroupConnections = userGroupConnections.map(
      (connection) => connection.userId
    );

    const notMembers = await UserModel.find({
      _id: { $nin: userGroupConnections },
      ...parsedFilterObj,
    })
      .skip(skipValue)
      .limit(limit);

    const notMembersCount = await UserModel.count({
      _id: { $nin: userGroupConnections },
      ...parsedFilterObj,
    });

    return { count: notMembersCount, rows: notMembers };
  }

  static async addUserToGroup(userId, groupId) {
    checkId(userId, 'Incorrect user id');
    checkId(groupId, 'Incorrect group id');

    const user = await UserModel.findById(userId);
    const group = await GroupModel.findById(groupId);

    if (!user) {
      throw ApiError.badRequest(
        "User you try to add to the group doesn't exists"
      );
    }

    if (!group) {
      throw ApiError.badRequest(
        "Group in what you try to add user doesn't exists"
      );
    }

    await UsersGroupsModel.create({
      userId,
      groupId,
    }).catch((e) => {
      if (e.code === 11000) {
        throw ApiError.badRequest('User is already a member of this group');
      }
      throw ApiError.badRequest(e.message);
    });

    return {
      message: `User successfully added to the group`,
    };
  }

  static async deleteUserFromGroup(userId, groupId) {
    checkId(userId, 'Incorrect user id');
    checkId(groupId, 'Incorrect group id');

    const deletionResult = await UsersGroupsModel.deleteOne({
      userId,
      groupId,
    });

    if (deletionResult.deletedCount === 0) {
      throw ApiError.badRequest("User's not a member of this group");
    }

    return {
      message: `User successfully deleted from the group`,
    };
  }
}

module.exports = UserGroupService;
