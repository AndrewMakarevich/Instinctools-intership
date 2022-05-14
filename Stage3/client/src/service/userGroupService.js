import $host from '../http';

class UserGroupService {
  static getUserGroups(userId, filterObject, page, limit) {
    return $host.get(`user-group/get-groups/${userId}`, {
      params: {
        filterObject,
        page,
        limit,
      },
    });
  }

  static getGroupUsers(groupId, filterObject, page, limit) {
    return $host.get(`user-group/get-users/${groupId}`, {
      params: {
        filterObject,
        page,
        limit,
      },
    });
  }

  static getGroupsUserNotParticipateIn(userId, filterObject, page, limit) {
    return $host.get(`user-group/get-groups-user-not-participate/${userId}`, {
      params: {
        filterObject,
        page,
        limit,
      },
    });
  }

  static getNotGroupMembers(groupId, filterObject, page, limit) {
    return $host.get(`user-group/get-not-members/${groupId}`, {
      params: {
        filterObject,
        page,
        limit,
      },
    });
  }

  static addUserToTheGroup(userId, groupId) {
    return $host.post('user-group/add-user', {
      userId,
      groupId,
    });
  }

  static deleteUserFromTheGroup(userId, groupId) {
    return $host.delete('user-group/delete-user', {
      params: {
        userId,
        groupId,
      },
    });
  }
}

export default UserGroupService;
