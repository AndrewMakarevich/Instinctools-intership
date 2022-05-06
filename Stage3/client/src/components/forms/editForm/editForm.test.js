import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditForm from './editForm';

const user = userEvent.setup();

const emptyUserObj = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
};

const fullfilledUserObj = {
  username: 'Guts',
  firstName: 'Andrei',
  lastName: 'Makarevich',
  email: 'andreimakarevich@mail.ru',
};

describe('Correct edit form', () => {
  test('render', async () => {
    render(
      <EditForm
        essenceName='User'
        initialParamValues={emptyUserObj}
        newParamValues={fullfilledUserObj}
        setNewParamValues={() => {}}
      />,
    );
    expect(screen.getByTestId('edit-form')).toBeInTheDocument();
    expect(screen.getAllByTestId('my-label-input').length).toBe(4);
  });

  test('clear changes button working', async () => {
    const setNewParams = jest.fn();
    render(
      <EditForm
        essenceName='User'
        initialParamValues={emptyUserObj}
        newParamValues={fullfilledUserObj}
        setNewParamValues={setNewParams}
      />,
    );
    await user.click(screen.getByTestId('clear-changes-btn'));
    expect(setNewParams.mock.calls[0][0]).toEqual(emptyUserObj);
  });
});
