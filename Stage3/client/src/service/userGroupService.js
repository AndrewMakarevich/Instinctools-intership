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
}

export default UserGroupService;
