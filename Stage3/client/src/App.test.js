import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store/store';
import publicRoutes from './components/router/routes';

test('renders learn react link', async () => {
  // const history = createMemoryHistory();
  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
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
