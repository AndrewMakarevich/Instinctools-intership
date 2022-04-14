const ApiError = require('../apiError/apiError');
const { GroupModel, UserModel, UsersGroupsModel } = require('../models/models');
const createModelSearchQuery = require('../utils/createModelSearchQuery');

async function checkUserAndGroup(
  userId,
  groupId,
  userErrorMessage,
  groupErrorMessage
) {
  const user = await UserModel.findById(userId).catch(() => {
    throw ApiError.badRequest("Incorrect user's id");
  });

  if (!user) {
    throw ApiError.badRequest(userErrorMessage);
  }

  const group = await GroupModel.findById(groupId).catch(() => {
    throw ApiError.badRequest("Incorrect group's id");
  });

  if (!group) {
    throw ApiError.badRequest(groupErrorMessage);
  }

  return { user, group };
}

class UserGroupService {
  static async getUserGroupConnection(userId, groupId) {
    const userGroupRecord = await UsersGroupsModel.find({ userId, groupId });

    return userGroupRecord;
  }

  static async getUsersGroups(userId, filterObject, page, limit) {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw ApiError.badRequest("User with such id doesn't edit");
    }

    let userGroupsConnections = await UsersGroupsModel.find({
      userId,
    });

    const parsedFilterObj = createModelSearchQuery(filterObject);
    const skipValue = (page - 1) * limit;

    //convert an array of user-group connections to the array of groups ids, wich have connection with the user
    userGroupsConnections = userGroupsConnections.map((connection) => {
      return String(connection.groupId);
    });

    const userGroups = await GroupModel.find({
      _id: { $in: [...userGroupsConnections] },
      ...parsedFilterObj,
    })
      .skip(skipValue || 0)
      .limit(limit || 5);

    const userGroupsCount = await GroupModel.count({
      _id: { $in: [...userGroupsConnections] },
      ...parsedFilterObj,
    });

    return { count: userGroupsCount, rows: userGroups };
  }

  static async getGroupUsers(groupId, filterObject, page, limit) {
    const group = await GroupModel.findById(groupId);

    if (!group) {
      throw ApiError.badRequest("Group with such id doesn't exists");
    }

    let userGroupConnections = await UsersGroupsModel.find({
      groupId,
    });

    if (!userGroupConnections) {
      return [];
    }

    const parsedFilterObject = createModelSearchQuery(filterObject);
    const skipValue = (page - 1) * limit;

    userGroupConnections = userGroupConnections.map((connection) => {
      return String(connection.userId);
    });

    const users = await UserModel.find({
      _id: { $in: [...userGroupConnections] },
      ...parsedFilterObject,
    })
      .skip(skipValue || 0)
      .limit(limit || 5);

    const usersCount = await UserModel.count({
      _id: { $in: [...userGroupConnections] },
      ...parsedFilterObject,
    });

    return { count: usersCount, rows: users };
  }

  static async addUserToGroup(userId, groupId) {
    const userAndGroup = await checkUserAndGroup(
      userId,
      groupId,
      "User you want add to the group, doesn't exists",
      "Group in what you want to add the User, doesn't exists"
    );

    const userGroupConnection = await UsersGroupsModel.findOne({
      userId: userAndGroup.user._id,
      groupId: userAndGroup.group._id,
    });

    if (userGroupConnection) {
      throw ApiError.badRequest('User is already in the group');
    }

    await UsersGroupsModel.create({
      userId: userAndGroup.user._id,
      groupId: userAndGroup.group._id,
    });

    return {
      message: `User ${userAndGroup.user.username} successfully added to the ${userAndGroup.group.groupName} group`,
    };
  }

  static async deleteUserFromGroup(userId, groupId) {
    const userAndGroup = await checkUserAndGroup(
      userId,
      groupId,
      "User you want to delete from the group, doesn't exists",
      "Group in what you want to delete the User, doesn't exists"
    );

    const userGroupConnection = await UsersGroupsModel.findOne({
      userId: userAndGroup.user._id,
      groupId: userAndGroup.group._id,
    });

    if (!userGroupConnection) {
      throw ApiError.badRequest(
        `Connection between ${userAndGroup.user.username}(User) and ${userAndGroup.group.groupName}(Group) doesn't exists`
      );
    }

    userGroupConnection.deleteOne({ _id: userAndGroup.user.id });

    return {
      message: `User ${userAndGroup.user.username} successfully deleted from the group ${userAndGroup.group.groupName}`,
    };
  }
}

module.exports = UserGroupService;
