import { act, screen } from '@testing-library/react';
import {
  renderWithRouter,
  renderWithReduxProvider,
} from '../../../test/helpers/renderWith';
import UserService from '../../../service/userService';
import UsersList from './usersList';
import getUsersListResponse from '../../../test/mockData/users';

jest.mock('../../../service/userService');

let response;

beforeEach(() => {
  response = getUsersListResponse;
});
afterEach(() => {
  jest.clearAllMocks();
});

describe("Correct User's list", () => {
  test('render', async () => {
    // await act(async () => {
    //   renderWithReduxProvider(<UserList />, ['/users']);
    // });
    // expect(screen.getByTestId('users-table-wrapper')).toBeInTheDocument();
  });

  test('correct redering after recieving user list data', async () => {
    // UserService.getUsers.mockReturnValue(response);
    // renderWithReduxProvider(<UserList />);
    // const usersRows = await screen.findAllByTestId('user-row');
    // expect(usersRows.length).toBe(3);
  });
});
