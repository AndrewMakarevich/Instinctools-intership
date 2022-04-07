import $host from "../http";

class UserService {
  static async getUsers() {
    const response = await $host.get(`/user/get-many`);
    return response;
  };
}

export default UserService;