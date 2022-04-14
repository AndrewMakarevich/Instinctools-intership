import $host from '../http';

class GroupService {
  static async getGroups(queryParams) {
    const response = await $host.get('/group/get-many', {
      params: queryParams,
    });
    return response;
  }

  static async getGroup(groupName) {
    const response = await $host.get(`/group/get/${groupName}`, {
      params: { paramName: 'groupName' },
    });

    return response;
  }

  static async editGroup(groupId, paramsToEditObj) {
    const response = await $host.put(`group/edit/${groupId}`, {
      ...paramsToEditObj,
    });

    return response;
  }
}

export default GroupService;
