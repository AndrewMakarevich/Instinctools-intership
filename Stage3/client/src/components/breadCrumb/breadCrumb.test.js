import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import {
  renderWithRouter,
  renderWithAppRouter,
} from '../../test/helpers/renderWith';
import BreadCrumb from './breadCrumb';
import NavBar from '../navBar/navBar';
import publicRoutes from '../router/routes';
import UserService from '../../service/userService';
import GroupService from '../../service/groupService';
import getGroupsListResponse from '../../test/mockData/groups';
import getUsersListResponse from '../../test/mockData/users';

jest.mock('../../service/userService');
jest.mock('../../service/groupService');

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

afterEach(() => {
  jest.clearAllMocks();
});

test('Bread crumb renders correctly', async () => {
  renderWithRouter(<BreadCrumb />);
  const breadCrumbComponent = screen.getByTestId('bread-crumb');

  expect(breadCrumbComponent).toBeInTheDocument();
  expect(breadCrumbComponent).toMatchSnapshot(
    'Bread crumb: component final version'
  );
});

describe('Bread crumb state check while routing', () => {
  test('Bread crumb values changes correctly while routing between main public routes', async () => {
    renderWithRouter(
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
    UserService.getUsers.mockReturnValue(getUsersListResponse);
    renderWithAppRouter(<BreadCrumb />, [
      `${publicRoutes[0].path}/AndrewTheFirst`,
    ]);

    await checkBreadCrumbLinks(
      publicRoutes[0].name,
      'AndrewTheFirst',
      'users-list-wrapper'
    );
  });

  test('Bread crumb correct state in nested Groups route', async () => {
    GroupService.getGroups.mockReturnValue(getGroupsListResponse);
    renderWithAppRouter(<BreadCrumb />, [`${publicRoutes[1].path}/FirstGroup`]);
    await checkBreadCrumbLinks(
      publicRoutes[1].name,
      'FirstGroup',
      'groups-list-wrapper'
    );
  });
});
