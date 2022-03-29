import ApiError from "../apiError/apiError";
import { GroupModel, UserModel, UsersGroupsModel } from "../models/models";

class UserGroupService {
  static async addUserToGroup(userId, groupId) {
    if (!userId || !groupId) {
      throw ApiError.badRequest("Not enough data");
    }

    const userToAdd = await UserModel.findById(userId).catch(() => {
      throw ApiError.badRequest("Incorrect user's id");
    });

    if (!userToAdd) {
      throw ApiError.badRequest("User you want add to the group doesn't exists");
    }

    const group = await GroupModel.findById(groupId).catch(() => {
      throw ApiError.badRequest("Incorrect group's id");
    });

    if (!group) {
      throw ApiError.badRequest("Group in what you want to add the User doesn't exists");
    }

    const userGroupConnection = await UsersGroupsModel.findOne({
      userId: userToAdd._id,
      groupId: group._id
    });

    if (userGroupConnection) {
      throw ApiError.badRequest("User is already in the group");
    }

    await UsersGroupsModel.create({
      userId: userToAdd._id,
      groupId: group._id
    });

    return { message: `User ${userToAdd.username} successfully added to the ${group.groupName} group` };
  }
};

export default UserGroupService;