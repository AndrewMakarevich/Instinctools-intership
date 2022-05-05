import React from 'react';
import { act, screen } from '@testing-library/react';
import { renderWithReduxProvider } from '../../../test/helpers/renderWith';
import GroupsList from './groupsList';
import GroupService from '../../../service/groupService';
import getGroupsListResponse from '../../../test/mockData/groups';

let response;

jest.mock('../../../service/groupService');

beforeEach(() => {
  response = getGroupsListResponse;
});
afterEach(() => {
  jest.clearAllMocks();
});

describe("Correct Group's list", () => {
  test('render', async () => {
    await act(async () => {
      renderWithReduxProvider(
        <GroupsList
          actionsArr={[]}
          groupsArr={[]}
          getGroupsFunction={() => {}}
        />,
        ['/groups']
      );
    });
    const wrapper = screen.getByTestId('groups-list-panel');
    expect(wrapper).toBeInTheDocument();
  });

  test('rendering after recieve group list data', async () => {
    GroupService.getGroups.mockReturnValue(response);
    renderWithReduxProvider(
      <GroupsList
        actionsArr={[]}
        groupsArr={getGroupsListResponse.data.rows}
        getGroupsFunction={() => {}}
      />,
      ['/groups']
    );
    const groupsRows = await screen.findAllByTestId('table-row');
    expect(groupsRows.length).toBe(3);
  });
});
