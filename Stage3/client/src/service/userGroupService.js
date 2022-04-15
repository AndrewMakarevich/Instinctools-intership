import $host from '../http';

class UserGroupService {
  static async getUserGroups(userId, filterObject, page, limit) {
    const response = await $host.get(`user-group/get-groups/${userId}`, {
      params: {
        filterObject,
        page,
        limit,
      },
    });

    return response;
  }

  static async getGroupUsers(groupId, filterObject, page, limit) {
    const response = await $host.get(`user-group/get-users/${groupId}`, {
      params: {
        filterObject,
        page,
        limit,
      },
    });

    return response;
  }

  static async deleteUserFromTheGroup(userId, groupId) {
    const response = await $host.delete('user-group/delete-user', {
      params: {
        userId,
        groupId,
      },
    });

    return response;
  }
}

export default UserGroupService;
