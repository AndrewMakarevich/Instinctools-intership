const { screen } = require('@testing-library/react');
import userEvents from '@testing-library/user-event';

const user = userEvents.setup();
const {
  renderWithReduxProvider,
} = require('../../../../test/helpers/renderWith');
const { default: GroupUsersList } = require('./groupUsersList');

describe("Correct group's users list", () => {
  test('render', async () => {
    renderWithReduxProvider(<GroupUsersList />);
    expect(screen.getByTestId('group-users-list-wrapper')).toBeInTheDocument();
  });

  test('opening group users modal', async () => {
    renderWithReduxProvider(<GroupUsersList />);
    const openModalBtn = screen.getByTestId('open-group-users-modal-btn');
    await user.click(openModalBtn);
    expect(screen.getByTestId('group-users-modal')).toBeInTheDocument();
  });
});
