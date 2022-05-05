import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PaginationLine from './paginationLine';

const user = userEvent.setup();

describe('Correct pagination line', () => {
  test('render', async () => {
    render(<PaginationLine count={15} page={1} limit={5} setPage={() => {}} />);
    const paginationButtons = await screen.getAllByTestId('pagination-btn');
    expect(screen.getByTestId('pagination-line')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-line')).toMatchSnapshot();
    expect(paginationButtons.length).toBe(5);
  });

  test('buttons click handlers working', async () => {
    const setPage = jest.fn();
    render(<PaginationLine count={15} page={1} limit={5} setPage={setPage} />);
    const paginationButtons = await screen.getAllByTestId('pagination-btn');
    await user.click(paginationButtons[3]);
    expect(setPage.mock.calls[0][0]).toBe(3);
  });
});
