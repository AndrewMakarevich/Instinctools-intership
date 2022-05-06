import React from 'react';
import { act, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import {
  renderWithRouter,
  renderWithAppRouter,
} from '../../test/helpers/renderWith';
import BreadCrumb from './breadCrumb';
import NavBar from '../navBar/navBar';
import UserService from '../../service/userService';
import GroupService from '../../service/groupService';
import getGroupsListResponse from '../../test/mockData/groups';
import getUsersListResponse from '../../test/mockData/users';
import { groupPaths, userPaths } from '../router/routes';

jest.mock('../../service/userService');
jest.mock('../../service/groupService');

const user = UserEvent.setup();

async function checkBreadCrumbLinks(
  routeName,
  nestedRouteName,
  expectedElementTestId,
) {
  expect(screen.getByTestId(`crumb-${routeName}-link`)).toBeInTheDocument();
  expect(
    screen.getByTestId(`crumb-${nestedRouteName}-link`),
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
    'Bread crumb: component final version',
  );
});

describe("Bread crumb's correct", () => {
  test('values changes while routing between main public routes', async () => {
    renderWithRouter(
      <>
        <NavBar />
        <BreadCrumb />
      </>,
    );
    // Checking bread crumb behaviour while routing on main public routes: /users and /groups
    await user.click(
      screen.getByTestId(`nav-bar-${groupPaths.mainPath.name}-link`),
    );
    expect(
      screen.getByTestId(`crumb-${groupPaths.mainPath.name}-link`),
    ).toBeInTheDocument();

    await user.click(
      screen.getByTestId(`nav-bar-${userPaths.mainPath.name}-link`),
    );
    expect(
      screen.getByTestId(`crumb-${userPaths.mainPath.name}-link`),
    ).toBeInTheDocument();
  });

  test('state in nested Users route', async () => {
    UserService.getUsers.mockReturnValue(getUsersListResponse);
    UserService.getUser.mockReturnValue({
      data: getUsersListResponse.data.rows[0],
    });
    await act(async () => {
      await renderWithAppRouter(<BreadCrumb />, [
        `${userPaths.mainPath.path}/AndrewTheFirst`,
      ]);
    });

    await checkBreadCrumbLinks('Users', 'AndrewTheFirst', 'users-list-wrapper');
  });

  test('state in nested Groups route', async () => {
    GroupService.getGroups.mockReturnValue(getGroupsListResponse);
    GroupService.getGroup.mockReturnValue({
      data: getGroupsListResponse.data.rows[0],
    });
    renderWithAppRouter(<BreadCrumb />, [
      `${groupPaths.mainPath.path}/FirstGroup`,
    ]);

    await checkBreadCrumbLinks('Groups', 'FirstGroup', 'groups-list-wrapper');
  });
});
