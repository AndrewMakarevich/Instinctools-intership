import $host from "../http";

class GroupService {
  static async getGroups() {
    const response = await $host.get(`/group/get-many`);
    return response;
  }
};

export default GroupService;