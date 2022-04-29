import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import userGroupActions from '../../../../store/reducers/userGroupReducer/actions';
import { renderWithReduxProvider } from '../../../../test/helpers/renderWith';
import getGroupsListResponse from '../../../../test/mockData/groups';
import UserGroupsPanel from './userGroupsList';


const renderUserGroupsPanel = (actionsArr) =>{
  const thunkFunction = ()=>({type: userGroupActions.getUserGroups, payload: getGroupsListResponse.data});

  test('render', () => {
    renderWithReduxProvider(
    <UserGroupsPanel 
    actionsArr={actionsArr} 
    thunkFunction={thunkFunction}
    userGroupsStateArrName="userGroups" 
    userId={1}/>);
    expect(screen.getByTestId('user-groups-table')).toBeInTheDocument();
  });

  const actionButtons = await screen.findAllByTestId("group-row-action-btn");
};

describe('Correct user groups panel', () => {

});
