import React from 'react';
import { act, screen } from '@testing-library/react';
import { renderWithReduxProvider } from '../../../test/helpers/renderWith';
import UsersList from './usersList';
import getUsersListResponse from '../../../test/mockData/users';

jest.mock('../../../service/userService');

afterEach(() => {
  jest.clearAllMocks();
});

describe("Correct User's list", () => {
  test('render', async () => {
    await act(async () => {
      renderWithReduxProvider(
        <UsersList
          usersArr={getUsersListResponse.data.rows}
          usersCount={getUsersListResponse.data.count}
          getUsersFunction={() => {}}
        />,
        ['/users'],
      );
    });
    expect(screen.getByTestId('users-list-panel')).toBeInTheDocument();
    const tableRows = await screen.findAllByTestId('table-row');
    expect(tableRows.length).toBe(3);
  });
});
