import UserGroupService from '../../service/userGroupService';

const deleteUserFromGroup = async (
  userId,
  groupId,
  actualizeGroupUsersList
) => {
  try {
    if (
      window.confirm('Are you sure you want to delete user fron this group?')
    ) {
      await UserGroupService.deleteUserFromTheGroup(userId, groupId);
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

export default deleteUserFromGroup;
