import $host from '../http';

class UserService {
  static getUsers(filterObject, page, limit) {
    return $host.get('/user/get-many', {
      params: { filterObject, page, limit },
    });
  }

  static getUser(username) {
    return $host.get(`/user/get/${username}`, {
      params: { paramName: 'username' },
    });
  }

  static editUser(userId, paramsToEditObj) {
    return $host.put(`user/edit/${userId}`, {
      ...paramsToEditObj,
    });
  }
}

export default UserService;
