import { act, render, screen } from '@testing-library/react';
import axios from 'axios';
import { renderWithReduxProvider } from '../../../test/helpers/renderWith';
import GroupList from './groupList';
import GroupService from '../../../service/groupService';
import getGroupsListResponse from '../../../test/mockData/groups';

jest.mock('../../../service/groupService');

let response;

beforeEach(() => {
  response = getGroupsListResponse;
});
afterEach(() => {
  jest.clearAllMocks();
});

describe("Correct Group's list", () => {
  test('render', () => {
    // renderWithReduxProvider(<GroupList />, ['/groups']);
    // const wrapper = await screen.findByTestId('groups-table-wrapper');
    // expect(wrapper).toBeInTheDocument();
  });

  test('rendering after recieve group list data', async () => {
    GroupService.getGroups.mockReturnValue(response);
    renderWithReduxProvider(<GroupList />, ['/groups']);
    const groupsRows = await screen.findAllByTestId('group-row');

    expect(groupsRows.length).toBe(3);
  });
});
