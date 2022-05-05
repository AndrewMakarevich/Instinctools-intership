import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../../../test/helpers/renderWith';
import EditGroupForm from './editGroupForm';

describe("Edit group form's correct", () => {
  test('render', () => {
    renderWithRouter(
      <EditGroupForm
        groupObj={{ groupName: 'FirstGroup', groupTitle: 'First' }}
      />
    );
    expect(screen.getByTestId('edit-form')).toBeInTheDocument();
    expect(screen.getAllByTestId('my-label-input').length).toBe(2);
    expect(screen.getByText('Clear changes')).toBeInTheDocument();
    expect(screen.getByTestId('submit-group-changes-btn')).toBeInTheDocument();
  });
});
