import $host from '../http';

class GroupService {
  static async getGroups(queryParams) {
    const response = await $host.get('/group/get-many', {
      params: queryParams,
    });
    return response;
  }
}

export default GroupService;
