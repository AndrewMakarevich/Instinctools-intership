const ApiError = require("../apiError/apiError.js");
const { GroupModel, UserModel, UsersGroupsModel } = require("../models/models.js");

async function checkUserAndGroup(userId, groupId, userErrorMessage, groupErrorMessage) {
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
  static async addUserToGroup(userId, groupId) {
    const userAndGroup = await checkUserAndGroup(
      userId,
      groupId,
      "User you want add to the group, doesn't exists",
      "Group in what you want to add the User, doesn't exists")

    const userGroupConnection = await UsersGroupsModel.findOne({
      userId: userAndGroup.user._id,
      groupId: userAndGroup.group._id
    });

    if (userGroupConnection) {
      throw ApiError.badRequest("User is already in the group");
    }

    await UsersGroupsModel.create({
      userId: userAndGroup.user._id,
      groupId: userAndGroup.group._id
    });

    return { message: `User ${userAndGroup.user.username} successfully added to the ${userAndGroup.group.groupName} group` };
  };

  static async deleteUserFromGroup(userId, groupId) {
    const userAndGroup = await checkUserAndGroup(userId,
      groupId,
      "User you want to delete from the group, doesn't exists",
      "Group in what you want to delete the User, doesn't exists",
    );

    const userGroupConnection = await UsersGroupsModel.findOne({
      userId: userAndGroup.user._id,
      groupId: userAndGroup.group._id
    });

    if (!userGroupConnection) {
      throw ApiError.badRequest(`Connection between ${userAndGroup.user.username}(User) and ${userAndGroup.group.groupName}(Group) doesn't exists`);
    }

    userGroupConnection.deleteOne({ _id: userAndGroup.user.id });

    return { message: `User ${userAndGroup.user.username} successfully deleted from the group ${userAndGroup.group.groupName}` };
  };
};

module.exports = UserGroupService;