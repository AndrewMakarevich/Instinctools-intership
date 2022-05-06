import $host from '../http';
import UserService from './userService';

jest.mock('../http');

describe('Correct user service', () => {
  test('getUsers function working', async () => {
    const queryParamsObject = {
      filterObject: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
      },
      page: 1,
      limit: 10,
    };

    await UserService.getUsers(
      queryParamsObject.filterObject,
      queryParamsObject.page,
      queryParamsObject.limit,
    );

    expect($host.get.mock.calls.length).toBe(1);
    expect($host.get.mock.calls[0][0]).toBe('/user/get-many');
    expect($host.get.mock.calls[0][1].params).toEqual(queryParamsObject);
  });

  test('getUser function working', async () => {
    await UserService.getUser('AndrewTheFirst');

    expect($host.get.mock.calls.length).toBe(1);
    expect($host.get.mock.calls[0][0]).toBe('/user/get/AndrewTheFirst');
    expect($host.get.mock.calls[0][1].params).toEqual({
      paramName: 'username',
    });
  });

  test('editUsers function working', async () => {
    const paramsToEditObj = { username: 'AndrewTheSecond' };
    await UserService.editUser('someId', paramsToEditObj);

    expect($host.put.mock.calls.length).toBe(1);
    expect($host.put.mock.calls[0][0]).toBe('user/edit/someId');
    expect($host.put.mock.calls[0][1]).toEqual(paramsToEditObj);
  });
});
