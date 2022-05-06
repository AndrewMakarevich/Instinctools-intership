// import React from 'react';
// import { act, render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { Provider } from 'react-redux';
// import { MemoryRouter } from 'react-router-dom';
// import App from './App';
// import store from './store/store';
// import publicRoutes, { groupPaths } from './components/router/routes';

jest.mock('./service/groupService');
jest.mock('./service/userService');

test('renders learn react link', async () => {
  // const user = userEvent.setup();
  // await act(async () => {
  //   await render(
  //     <MemoryRouter>
  //       <Provider store={store}>
  //         <App />
  //       </Provider>
  //     </MemoryRouter>,
  //   );
  // });
  // // Groups link
  // await user.click(
  //   screen.getByTestId(`nav-bar-${groupPaths.mainPath.name}-link`),
  // );
  // const groupsListWrapper = screen.getByTestId('groups-list-wrapper');
  // const groupsListPanel = screen.getByTestId('groups-list-panel');
  // const groupsTable = screen.getByTestId('table');
  // expect(groupsListWrapper).toBeInTheDocument();
  // expect(groupsListPanel).toBeInTheDocument();
  // expect(groupsTable).toBeInTheDocument();
  // // Users link
  // await user.click(screen.getByTestId(`nav-bar-${publicRoutes[0].name}-link`));
  // const usersListWrapper = screen.getByTestId('users-list-wrapper');
  // const usersListPanel = screen.getByTestId('users-list-panel');
  // const usersTable = screen.getByTestId('table');
  // expect(usersListWrapper).toBeInTheDocument();
  // expect(usersListPanel).toBeInTheDocument();
  // expect(usersTable).toBeInTheDocument();
});
