import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
import { renderWithRouter } from '../../../../test/helpers/renderWith';
import SubmitGroupChangesBtn from './submitGroupChangesBtn';
import parseDataToEdit from '../../../../utils/parseDataToSend/parseDataToEdit';
import GroupService from '../../../../service/groupService';
import publicRoutes from '../../../router/routes';

const user = userEvent.setup();

global.alert = jest.fn();
const mockedUseNavigate = jest.fn();

jest.mock('../../../../utils/parseDataToSend/parseDataToEdit');
jest.mock('../../../../service/groupService');
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    ...originalModule,
    useNavigate: () => mockedUseNavigate,
  };
});

afterEach(() => {
  jest.clearAllMocks();
}, []);

describe('Correct submit changes button', () => {
  test('render', async () => {
    renderWithRouter(<SubmitGroupChangesBtn />);
    expect(screen.getByTestId('submit-group-changes-btn')).toBeInTheDocument();
  });

  test('function calls with fullfilled groupName in params to edit object', async () => {
    const actualizeGroupInfo = jest.fn();
    renderWithRouter(
      <SubmitGroupChangesBtn
        groupId={0}
        initialParams={{
          groupName: 'FirstGroup',
          groupTitle: "That's my first group",
        }}
        paramsToEditObj={{ groupName: 'SecGroup' }}
        actualizeGroupInfo={actualizeGroupInfo}
      />
    );
    parseDataToEdit.mockReturnValue({ groupName: 'SecGroup' });

    await user.click(screen.getByTestId('submit-group-changes-btn'));

    expect(parseDataToEdit.mock.calls.length).toBe(1);
    expect(GroupService.editGroup.mock.calls.length).toBe(1);
    expect(useNavigate().mock.calls.length).toBe(1);
    expect(useNavigate().mock.calls[0][0]).toBe(
      `${publicRoutes[1].path}/SecGroup`
    );
    expect(actualizeGroupInfo.mock.calls.length).toBe(0);
  });

  test('function calls with only fullfilled groupTitle in params to edit object', async () => {
    const actualizeGroupInfo = jest.fn();
    renderWithRouter(
      <SubmitGroupChangesBtn
        groupId={0}
        initialParams={{
          groupName: 'FirstGroup',
          groupTitle: "That's my first group",
        }}
        paramsToEditObj={{
          groupName: 'FirstGroup',
          groupTitle: 'Thats-changed',
        }}
        actualizeGroupInfo={actualizeGroupInfo}
      />
    );

    parseDataToEdit.mockReturnValue({ groupTitle: 'Thats-changed' });

    await user.click(screen.getByTestId('submit-group-changes-btn'));

    expect(parseDataToEdit.mock.calls.length).toBe(1);
    expect(GroupService.editGroup.mock.calls.length).toBe(1);
    expect(useNavigate().mock.calls.length).toBe(0);
    expect(actualizeGroupInfo.mock.calls.length).toBe(1);
  });

  test('throwing error', async () => {
    const actualizeGroupInfo = jest.fn();
    renderWithRouter(
      <SubmitGroupChangesBtn
        groupId={0}
        initialParams={{
          groupName: 'FirstGroup',
          groupTitle: "That's my first group",
        }}
        paramsToEditObj={{
          groupName: 'FirstGroup',
          groupTitle: 'Thats-changed',
        }}
        actualizeGroupInfo={actualizeGroupInfo}
      />
    );

    parseDataToEdit.mockReturnValue({});

    await user.click(screen.getByTestId('submit-group-changes-btn'));
    expect(alert.mock.calls.length).toBe(1);
  });
});
