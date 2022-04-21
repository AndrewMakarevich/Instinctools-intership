import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import store from './store/store';
import publicRoutes from './components/router/routes';
import GroupService from './service/groupService';
import UserService from './service/userService';

jest.mock('./service/groupService');
jest.mock('./service/userService');

test('renders learn react link', async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );

  //Groups link
  await user.click(screen.getByTestId(`nav-bar-${publicRoutes[1].name}-link`));

  const groupsListWrapper = screen.getByTestId('groups-list-wrapper');
  const groupsTableWrapper = screen.getByTestId('groups-table-wrapper');
  const groupsTable = screen.getByTestId('groups-table');

  expect(groupsListWrapper).toBeInTheDocument();
  expect(groupsTableWrapper).toBeInTheDocument();
  expect(groupsTable).toBeInTheDocument();

  //Users link
  await user.click(screen.getByTestId(`nav-bar-${publicRoutes[0].name}-link`));

  const usersListWrapper = screen.getByTestId('users-list-wrapper');
  const usersTableWrapper = screen.getByTestId('users-table-wrapper');
  const usersTable = screen.getByTestId('users-table');

  expect(usersListWrapper).toBeInTheDocument();
  expect(usersTableWrapper).toBeInTheDocument();
  expect(usersTable).toBeInTheDocument();
});
