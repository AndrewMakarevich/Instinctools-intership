import $host from '../http';

class GroupService {
  static getGroups(queryParams) {
    return $host.get('/group/get-many', {
      params: queryParams,
    });
  }

  static getGroup(groupName) {
    return $host.get(`/group/get/${groupName}`, {
      params: { paramName: 'groupName' },
    });
  }

  static editGroup(groupId, paramsToEditObj) {
    return $host.put(`group/edit/${groupId}`, {
      ...paramsToEditObj,
    });
  }
}

export default GroupService;
