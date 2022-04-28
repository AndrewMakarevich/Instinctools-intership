import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithReduxProvider } from '../../../../test/helpers/renderWith';
import GroupUsersModal from './groupUsersModal';

const user = userEvent.setup();

describe('Correct group users modal', () => {
  test('render', async () => {
    renderWithReduxProvider(
      <div id='root'>
        <GroupUsersModal />
      </div>
    );
    expect(
      screen.getByTestId('open-group-users-modal-btn')
    ).toBeInTheDocument();

    await user.click(screen.getByTestId('open-group-users-modal-btn'));
    expect(screen.getByTestId('modal-window')).toBeInTheDocument();
    expect(screen.getByTestId('group-users-table')).toBeInTheDocument();
  });
});
