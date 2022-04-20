import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import renderWithRouterAndReduxProvider from '../../test/helpers/renderWithRouterAndReduxProvider';
import BreadCrumb from './breadCrumb';
import NavBar from '../navBar/navBar';
import publicRoutes from '../router/routes';

const user = UserEvent.setup();

async function checkBreadCrumbLinks(
  routeName,
  nestedRouteName,
  expectedElementTestId
) {
  expect(screen.getByTestId(`crumb-${routeName}-link`)).toBeInTheDocument();
  expect(
    screen.getByTestId(`crumb-${nestedRouteName}-link`)
  ).toBeInTheDocument();

  await user.click(screen.getByTestId(`crumb-${routeName}-link`));

  expect(screen.getByTestId(`crumb-${routeName}-link`)).toBeInTheDocument();
  expect(screen.queryByTestId(`crumb-${nestedRouteName}-link`)).toBeNull();
  expect(screen.getByTestId(expectedElementTestId)).toBeInTheDocument();
}

test('Bread crumb renders correctly', async () => {
  renderWithRouterAndReduxProvider(<BreadCrumb />);
  const breadCrumbComponent = screen.getByTestId('bread-crumb');

  expect(breadCrumbComponent).toBeInTheDocument();
  expect(breadCrumbComponent).toMatchSnapshot(
    'Bread crumb: component final version'
  );
});

describe('Bread crumb state check while routing', () => {
  test('Bread crumb values changes correctly while routing between main public routes', async () => {
    renderWithRouterAndReduxProvider(
      <>
        <NavBar />
        <BreadCrumb />
      </>
    );

    // Checking bread crumb behaviuor while routing on main public routes: /users and /groups
    for (let publicRoute of publicRoutes) {
      await user.click(screen.getByTestId(`nav-bar-${publicRoute.name}-link`));
      expect(
        screen.getByTestId(`crumb-${publicRoute.name}-link`)
      ).toBeInTheDocument();
    }
  });

  test('Bread crumb correct state in nested Users route', async () => {
    renderWithRouterAndReduxProvider(<BreadCrumb />, [
      `${publicRoutes[0].path}/AndrewTheFirst`,
    ]);

    await checkBreadCrumbLinks(
      publicRoutes[0].name,
      'AndrewTheFirst',
      'users-list-wrapper'
    );
  });

  test('Bread crumb correct state in nested Groups route', async () => {
    renderWithRouterAndReduxProvider(<BreadCrumb />, [
      `${publicRoutes[1].path}/FirstGroup`,
    ]);

    await checkBreadCrumbLinks(
      publicRoutes[1].name,
      'FirstGroup',
      'groups-list-wrapper'
    );
  });
});
