import React from 'react';
import { act, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import userAction from '@testing-library/user-event';
import userGroupActions from '../../../../store/reducers/userGroupReducer/actions';
import { renderWithReduxProvider } from '../../../../test/helpers/renderWith';
import getUsersListResponse from '../../../../test/mockData/users';
import GroupUsersList from './groupUsersList';
import { userPaths } from '../../../router/routes';

const user = userAction.setup();

const mockedFunc = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedFunc,
}));

const thunkFunction = () => ({
  type: userGroupActions.getGroupUsers,
  payload: getUsersListResponse.data,
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderGroupUsersPanel = async (actionsArr) => {
  await act(async () => {
    await renderWithReduxProvider(
      <GroupUsersList
        groupId='1'
        thunkFunction={thunkFunction}
        groupUsersStateArrName='groupUsers'
        actionsArr={actionsArr}
      />,
    );
  });

  let actionButtons;

  if (actionsArr.length) {
    actionButtons = await screen.findAllByTestId('group-row-action-btn');
  }

  return actionButtons;
};

describe('Correct group users panel', () => {
  test('render', async () => {
    const actionButtons = await renderGroupUsersPanel([
      { header: 'delete', clickHandler: () => {} },
    ]);
    expect(screen.getByTestId('table')).toBeInTheDocument();
    expect(actionButtons.length).toBe(3);
  });

  test('row click working', async () => {
    await renderGroupUsersPanel([]);
    const rows = await screen.findAllByTestId('table-row');
    await user.click(rows[0]);
    expect(useNavigate().mock.calls[0][0]).toBe(
      `${userPaths.mainPath.path}/${getUsersListResponse.data.rows[0].username}`,
    );
  });

  test('action buttons working', async () => {
    const actionHandlerFunc = jest.fn();
    const actionButtons = await renderGroupUsersPanel([
      { header: 'delete', clickHandler: actionHandlerFunc },
    ]);
    await user.click(actionButtons[0]);
    expect(actionHandlerFunc.mock.calls.length).toBe(1);
  });
});
