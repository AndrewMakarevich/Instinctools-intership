import $host from '../http';
import UserGroupService from './userGroupService';

jest.mock('../http');

const groupsQueryParamsObject = {
  filterObject: {
    groupName: '',
    groupTitle: '',
  },
  page: 1,
  limit: 5,
};

const usersQueryParamsObject = {
  filterObject: {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
  },
  page: 1,
  limit: 10,
};

describe('Correct user group service', () => {
  test('getUserGroups function working', async () => {
    await UserGroupService.getUserGroups(
      'someId',
      groupsQueryParamsObject.filterObject,
      groupsQueryParamsObject.page,
      groupsQueryParamsObject.limit,
    );

    expect($host.get.mock.calls.length).toBe(1);
    expect($host.get.mock.calls[0][0]).toBe('user-group/get-groups/someId');
    expect($host.get.mock.calls[0][1].params).toEqual(groupsQueryParamsObject);
  });

  test('getGroupUsers function working', async () => {
    await UserGroupService.getGroupUsers(
      'someId',
      usersQueryParamsObject.filterObject,
      usersQueryParamsObject.page,
      usersQueryParamsObject.limit,
    );

    expect($host.get.mock.calls.length).toBe(1);
    expect($host.get.mock.calls[0][0]).toBe('user-group/get-users/someId');
    expect($host.get.mock.calls[0][1].params).toEqual(usersQueryParamsObject);
  });

  test('getGroupsUserNotParticipateIn function working', async () => {
    await UserGroupService.getGroupsUserNotParticipateIn(
      'someId',
      groupsQueryParamsObject.filterObject,
      groupsQueryParamsObject.page,
      groupsQueryParamsObject.limit,
    );

    expect($host.get.mock.calls.length).toBe(1);
    expect($host.get.mock.calls[0][0]).toBe(
      'user-group/get-groups-user-not-participate/someId',
    );
    expect($host.get.mock.calls[0][1].params).toEqual(groupsQueryParamsObject);
  });

  test('getNotGroupMembers function working', async () => {
    await UserGroupService.getNotGroupMembers(
      'someId',
      usersQueryParamsObject.filterObject,
      usersQueryParamsObject.page,
      usersQueryParamsObject.limit,
    );

    expect($host.get.mock.calls.length).toBe(1);
    expect($host.get.mock.calls[0][0]).toBe(
      'user-group/get-not-members/someId',
    );
    expect($host.get.mock.calls[0][1].params).toEqual(usersQueryParamsObject);
  });

  test('addUserToTheGroup function working', async () => {
    await UserGroupService.addUserToTheGroup('e123', 'f345');

    expect($host.post.mock.calls.length).toBe(1);
    expect($host.post.mock.calls[0][0]).toBe('user-group/add-user');
    expect($host.post.mock.calls[0][1]).toEqual({
      userId: 'e123',
      groupId: 'f345',
    });
  });

  test('deleteUserFromTheGroup function working', async () => {
    await UserGroupService.deleteUserFromTheGroup('e123', 'f345');

    expect($host.delete.mock.calls.length).toBe(1);
    expect($host.delete.mock.calls[0][0]).toBe('user-group/delete-user');
    expect($host.delete.mock.calls[0][1].params).toEqual({
      userId: 'e123',
      groupId: 'f345',
    });
  });
});
