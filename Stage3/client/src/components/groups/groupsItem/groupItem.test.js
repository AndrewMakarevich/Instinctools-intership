import { screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../../../test/helpers/renderWith';
import GroupItem from './groupItem';

const user = userEvent.setup();
const mockedFn = jest.fn();

jest.mock('react-router-dom', () => {
  const standartModule = jest.requireActual('react-router-dom');
  return {
    ...standartModule,
    useNavigate: () => mockedFn,
  };
});

afterEach(() => {
  jest.clearAllMocks();
}, []);

describe("Group's item correct", () => {
  test('render', () => {
    renderWithRouter(
      <table>
        <tbody>
          <GroupItem group={{ groupName: 'FirstGroup', groupTitle: 'First' }} />
        </tbody>
      </table>
    );

    expect(screen.getByTestId('group-row')).toBeInTheDocument();
    expect(screen.getAllByTestId('group-cell').length).toBe(2);
    expect(screen.getByText('FirstGroup')).toBeInTheDocument();
    expect(screen.getByText('First')).toBeInTheDocument();
  });

  test('navigation to the edit group page', async () => {
    renderWithRouter(
      <table>
        <tbody>
          <GroupItem group={{ groupName: 'FirstGroup', groupTitle: 'First' }} />
        </tbody>
      </table>
    );

    await user.click(screen.getByTestId('group-row'));

    expect(useNavigate().mock.calls[0][0]).toBe('FirstGroup');
  });
});
