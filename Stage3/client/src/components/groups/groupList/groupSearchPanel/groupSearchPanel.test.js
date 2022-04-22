import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import GroupSearchPanel from './groupSearchPanel';

let filterParams = {
  page: 2,
  limit: 2,
  filterObject: {
    groupName: 'FirstGroup',
    groupTitle: '',
  },
};

afterEach(() => {
  jest.clearAllMocks();
});

const user = userEvent.setup();

describe("Correct group's search panel", () => {
  test('render', async () => {
    render(
      <GroupSearchPanel
        paramsMap={['groupName', 'groupTitle']}
        queryParams={filterParams}
      />
    );
    expect(screen.getByTestId('search-panel')).toBeInTheDocument();
    expect(screen.getByTestId('search-panel')).toMatchSnapshot();
    expect(
      screen.getByPlaceholderText('Search by groupName')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Search by groupTitle')
    ).toBeInTheDocument();
  });

  test('sending request', async () => {
    const fetchGroups = jest.fn();
    render(
      <GroupSearchPanel
        paramsMap={['groupName', 'groupTitle']}
        queryParams={filterParams}
        fetchGroups={fetchGroups}
      />
    );
    const searchInputs = screen.getAllByTestId('search-input');
    await user.type(searchInputs[0], ' ');

    expect(fetchGroups.mock.calls.length).toBe(1);
    expect(fetchGroups.mock.calls[0][0].page).toBe(1);
  });

  test('work of clear search panel button', async () => {
    const fetchGroups = jest.fn();
    render(
      <GroupSearchPanel
        paramsMap={['groupName', 'groupTitle']}
        queryParams={filterParams}
        fetchGroups={fetchGroups}
      />
    );

    const clearPanelBtn = screen.getByTestId('clear-group-search-panel-btn');
    await user.click(clearPanelBtn);

    expect(fetchGroups.mock.calls.length).toBe(1);
    const filterObjValues = Object.values(
      fetchGroups.mock.calls[0][0].filterObject
    );
    expect(filterObjValues.some((val) => val !== '')).toBe(false);
  });
});
