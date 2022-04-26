const ApiError = require('../apiError/apiError');
const { GroupModel, UserModel, UsersGroupsModel } = require('../models/models');
const createModelSearchQuery = require('../utils/createModelSearchQuery');

async function checkUser(userId, userErrorMessage) {
  const user = await UserModel.findById(userId).catch(() => {
    throw ApiError.badRequest("Incorrect user's id");
  });

  if (!user) {
    throw ApiError.badRequest(userErrorMessage);
  }

  return user;
}

async function checkGroup(groupId, groupErrorMessage) {
  const group = await GroupModel.findById(groupId).catch(() => {
    throw ApiError.badRequest("Incorrect group's id");
  });

  if (!group) {
    throw ApiError.badRequest(groupErrorMessage);
  }

  return group;
}

async function checkUserAndGroup(
  userId,
  groupId,
  userErrorMessage,
  groupErrorMessage
) {
  const user = await checkUser(userId, userErrorMessage);
  const group = await checkGroup(groupId, groupErrorMessage);

  return { user, group };
}

class UserGroupService {
  static async getUserGroupConnection(userId, groupId) {
    const userGroupRecord = await UsersGroupsModel.find({ userId, groupId });

    return userGroupRecord;
  }

  static async getUsersGroups(userId, filterObject, page, limit) {
    await checkUser(userId, "User with such id doesn't exists");

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
    await checkGroup(groupId, "Group with such id doesn't exists");

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

  static async getNotGroupMembers(groupId, filterObject, page, limit) {
    await checkGroup(groupId, "Group with such id doesn't exists");

    let userGroupConnections = await UsersGroupsModel.find({
      groupId,
    });

    if (!userGroupConnections) {
      const allUsers = UserModel.find();
      return allUsers;
    }

    const parsedFilterObj = createModelSearchQuery(filterObject);
    const skipValue = (page - 1) * limit;

    userGroupConnections = userGroupConnections.map(
      (connection) => connection.userId
    );
    const notMembers = await UserModel.find({
      _id: { $nin: userGroupConnections },
      ...parsedFilterObj,
    })
      .skip(skipValue || 0)
      .limit(limit || 5);

    const notMembersCount = await UserModel.count({
      _id: { $nin: userGroupConnections },
      ...parsedFilterObj,
    });

    return { count: notMembersCount, rows: notMembers };
  }

  static async getGroupsUserNotParticipateIn(
    userId,
    filterObject,
    page,
    limit
  ) {
    await checkUser(userId, "User with such id doesn't exists");

    let userGroupConnections = await UsersGroupsModel.find({
      userId,
    });

    if (!userGroupConnections) {
      const allGroups = GroupModel.find();
      return allGroups;
    }

    const userGroupsIds = userGroupConnections.map(
      (connection) => connection.groupId
    );

    const parsedFilterObj = createModelSearchQuery(filterObject);
    const skipValue = (page - 1) * limit;

    const groups = await GroupModel.find({
      _id: { $nin: userGroupsIds },
      ...parsedFilterObj,
    })
      .skip(skipValue || 0)
      .limit(limit || 5);

    const groupsCount = await GroupModel.count({
      _id: { $nin: userGroupsIds },
      ...parsedFilterObj,
    });

    return { count: groupsCount, rows: groups };
  }

  static async addUserToGroup(userId, groupId) {
    console.log(userId, groupId);
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
