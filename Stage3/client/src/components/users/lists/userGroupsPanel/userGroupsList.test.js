import React from 'react';
import { act, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userGroupActions from '../../../../store/reducers/userGroupReducer/actions';
import { renderWithReduxProvider } from '../../../../test/helpers/renderWith';
import getGroupsListResponse from '../../../../test/mockData/groups';
import UserGroupsPanel from './userGroupsList';

const renderUserGroupsList = async (actionsArr = []) => {
  const thunkFunction = () => ({
    type: userGroupActions.getUserGroups,
    payload: getGroupsListResponse.data,
  });

  await act(async () => {
    await renderWithReduxProvider(
      <UserGroupsPanel
        actionsArr={actionsArr}
        thunkFunction={thunkFunction}
        userGroupsStateArrName='userGroups'
        userId='1'
      />,
    );
  });

  expect(screen.getByTestId('groups-list-panel')).toBeInTheDocument();

  let actionButtons = [];

  if (actionsArr.length) {
    actionButtons = await screen.findAllByTestId('group-row-action-btn');
  }
  return actionButtons;
};

describe('Correct user groups panel', () => {
  test('render', async () => {
    await renderUserGroupsList();
  });
});
