import $host from '../http';

class UserService {
  static async getUsers(queryParams) {
    const response = await $host.get('/user/get-many', { params: queryParams });

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
