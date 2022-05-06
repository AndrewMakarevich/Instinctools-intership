import $host from '../http';
import GroupService from './groupService';

jest.mock('../http');

describe('Correct group service', () => {
  test('getGroups function working', async () => {
    const queryParams = {
      filterObject: {
        groupName: '',
        groupTitle: '',
      },
      page: 1,
      limit: 5,
    };

    await GroupService.getGroups(queryParams);

    expect($host.get.mock.calls.length).toBe(1);
    expect($host.get.mock.calls[0][0]).toBe('/group/get-many');
    expect($host.get.mock.calls[0][1].params).toEqual(queryParams);
  });

  test('getGroup function working', async () => {
    await GroupService.getGroup('FirstGroup');

    expect($host.get.mock.calls.length).toBe(1);
    expect($host.get.mock.calls[0][0]).toBe('/group/get/FirstGroup');
    expect($host.get.mock.calls[0][1].params).toEqual({
      paramName: 'groupName',
    });
  });

  test('editGroup function working', async () => {
    const paramsToEditObj = { groupName: 'SecondGroup' };
    await GroupService.editGroup('someId', paramsToEditObj);

    expect($host.put.mock.calls.length).toBe(1);
    expect($host.put.mock.calls[0][0]).toBe('group/edit/someId');
    expect($host.put.mock.calls[0][1]).toEqual(paramsToEditObj);
  });
});
