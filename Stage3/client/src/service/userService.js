import $host from "../http";

class UserService {
  static async getUsers(queryParams) {
    const response = await $host.get(`/user/get-many`, { params: queryParams });
    return response;
  };
}

export default UserService;