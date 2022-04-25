import { screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import { renderWithReduxProvider } from '../../../../test/helpers/renderWith';
import GroupUsersList from './groupUsersList';
import UserGroupService from '../../../../service/userGroupService';
import getGroupsListResponse from '../../../../test/mockData/groups';
import { getGroupUsersThunk } from '../../../../store/reducers/userGroupReducer/actionCreator';
import userGroupActions from '../../../../store/reducers/userGroupReducer/actions';
const user = userEvents.setup();

let response;
jest.mock('../../../../store/reducers/userGroupReducer/actionCreator');

beforeEach(() => {
  response = getGroupsListResponse;
});
afterEach(() => {
  jest.clearAllMocks();
});

describe("Correct group's users list", () => {
  test('render', async () => {
    renderWithReduxProvider(<GroupUsersList />);
    expect(screen.getByTestId('group-users-list-wrapper')).toBeInTheDocument();
  });

  test('opening group users modal', async () => {
    getGroupUsersThunk.mockReturnValue((dispatch) =>
      dispatch({ type: userGroupActions.getUserGroups, payload: response.data })
    );
    renderWithReduxProvider(<GroupUsersList />);
    const openModalBtn = screen.getByTestId('open-group-users-modal-btn');
    await user.click(openModalBtn);
    expect(await screen.findByTestId('group-users-modal')).toBeInTheDocument();
    screen.debug();
  });
});
