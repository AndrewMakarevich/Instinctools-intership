import React from 'react';
import { act, screen } from '@testing-library/react';
import { renderWithReduxProvider } from '../../../test/helpers/renderWith';
import GroupsList from './groupsList';
import getGroupsListResponse from '../../../test/mockData/groups';

jest.mock('../../../service/groupService');

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
        ['/groups'],
      );
    });
    const wrapper = screen.getByTestId('groups-list-panel');
    expect(wrapper).toBeInTheDocument();
  });

  test('rendering after recieve group list data', async () => {
    renderWithReduxProvider(
      <GroupsList
        actionsArr={[]}
        groupsArr={getGroupsListResponse.data.rows}
        getGroupsFunction={() => {}}
      />,
      ['/groups'],
    );
    const groupsRows = await screen.findAllByTestId('table-row');
    expect(groupsRows.length).toBe(3);
  });
});
