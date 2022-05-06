import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
import { renderWithRouter } from '../../../../test/helpers/renderWith';
import SubmitUserChangesBtn from './submitUserChangesBtn';
import UserService from '../../../../service/userService';
import { userPaths } from '../../../router/routes';

const user = userEvent.setup();

const mockedFunction = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedFunction,
}));

jest.mock('../../../../service/userService');
global.alert = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

describe('Correct submit yser changes btn', () => {
  test('render', () => {
    renderWithRouter(<SubmitUserChangesBtn />);
    expect(screen.getByTestId('submit-user-changes-btn')).toBeInTheDocument();
  });

  test('handlers executions in case username changed', async () => {
    const actualizeUserInfo = jest.fn();
    renderWithRouter(
      <SubmitUserChangesBtn
        actualizeUserInfo={actualizeUserInfo}
        initialParamsObj={{
          username: 'AndrewTheFirst',
          firstName: '',
          lastName: '',
          email: '',
        }}
        paramsToEditObj={{
          username: 'AndrewTheSecond',
          firstName: '',
          lastName: '',
          email: '',
        }}
      />,
    );
    await user.click(screen.getByTestId('submit-user-changes-btn'));
    expect(UserService.editUser.mock.calls.length).toBe(1);
    expect(useNavigate().mock.calls[0][0]).toBe(
      `${userPaths.mainPath.path}/AndrewTheSecond`,
    );
    expect(actualizeUserInfo.mock.calls.length).toBe(0);
  });

  test('handlers executions in case other params changed', async () => {
    const actualizeUserInfo = jest.fn();
    renderWithRouter(
      <SubmitUserChangesBtn
        actualizeUserInfo={actualizeUserInfo}
        initialParamsObj={{
          username: 'AndrewTheFirst',
          firstName: '',
          lastName: '',
          email: '',
        }}
        paramsToEditObj={{
          username: 'AndrewTheFirst',
          firstName: 'Andrew',
          lastName: '',
          email: '',
        }}
      />,
    );
    await user.click(screen.getByTestId('submit-user-changes-btn'));
    expect(UserService.editUser.mock.calls.length).toBe(1);
    expect(useNavigate().mock.calls.length).toBe(0);
    expect(actualizeUserInfo.mock.calls.length).toBe(1);
  });

  test('handlers executions in case of nothing to change', async () => {
    const actualizeUserInfo = jest.fn();
    renderWithRouter(
      <SubmitUserChangesBtn
        actualizeUserInfo={actualizeUserInfo}
        initialParamsObj={{
          username: 'AndrewTheFirst',
          firstName: '',
          lastName: '',
          email: '',
        }}
        paramsToEditObj={{
          username: 'AndrewTheFirst',
          firstName: '',
          lastName: '',
          email: '',
        }}
      />,
    );
    await user.click(screen.getByTestId('submit-user-changes-btn'));
    expect(alert.mock.calls.length).toBe(1);
    expect(alert.mock.calls[0][0]).toBe('Nothing to change');
  });
});
