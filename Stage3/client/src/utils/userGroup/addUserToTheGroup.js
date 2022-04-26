import UserGroupService from '../../service/userGroupService';

const addUserToTheGroup = async (userId, groupId, actualizeGroupUsersList) => {
  try {
    if (window.confirm(`Are you sure you want to add user to this group?`)) {
      await UserGroupService.addUserToTheGroup(userId, groupId);
      await actualizeGroupUsersList();
    }
  } catch (e) {
    if (e.isAxiosError) {
      alert(e.response.data.message);
      return;
    }

    alert(e.message);
  }
};

export default addUserToTheGroup;
