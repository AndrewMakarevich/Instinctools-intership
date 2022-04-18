import $host from '../http';

class UserService {
  static async getUsers(filterObject, page, limit) {
    const response = await $host.get('/user/get-many', {
      params: { filterObject, page, limit },
    });

    return response;
  }

  static async getUser(username) {
    const response = await $host.get(`/user/get/${username}`, {
      params: { paramName: 'username' },
    });

    return response;
  }

  static async editUser(userId, paramsToEditObj) {
    const response = await $host.put(`user/edit/${userId}`, {
      ...paramsToEditObj,
    });

    return response;
  }
}

export default UserService;
