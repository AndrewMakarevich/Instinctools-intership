import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../../../test/helpers/renderWith';
import EditUserForm from './editUserForm';

const userObj = {
  username: 'AndrewTheFirst',
  firstName: 'Andrew',
  lastName: 'Makarevich',
  email: 'andrei1@mail.ru',
};

describe('Correct edit user form', () => {
  test('render', () => {
    renderWithRouter(<EditUserForm userObj={userObj} />);
    expect(screen.getByTestId('edit-form')).toBeInTheDocument();
    expect(screen.getByTestId('edit-form')).toMatchSnapshot();
  });
});
