import { act, render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import axios from 'axios';
import { renderWithReduxProvider } from '../../../test/helpers/renderWith';
import GroupList from './groupList';
import GroupService from '../../../service/groupService';
import getGroupsListResponse from '../../../test/mockData/groups';

let response;

const user = UserEvent.setup();
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
      renderWithReduxProvider(<GroupList />, ['/groups']);
    });

    const wrapper = screen.getByTestId('groups-table-wrapper');
    expect(wrapper).toBeInTheDocument();
  });

  test('rendering after recieve group list data', async () => {
    GroupService.getGroups.mockReturnValue(response);
    renderWithReduxProvider(<GroupList />, ['/groups']);

    const groupsRows = await screen.findAllByTestId('group-row');
    expect(groupsRows.length).toBe(3);
  });
});
