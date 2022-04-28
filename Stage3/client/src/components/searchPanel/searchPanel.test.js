import { render, screen } from '@testing-library/react';
import SearchPanel from './searchPanel';

describe('Correct search panel', () => {
  test('render', () => {
    render(
      <SearchPanel
        queryParams={{
          page: 1,
          limit: 2,
          filterObject: {
            groupName: '',
            groupTitle: '',
          },
        }}
        paramsMap={['groupName', 'groupTitle']}
      />
    );
    expect(screen.getByTestId('search-panel')).toBeInTheDocument();
    expect(screen.getByTestId('search-panel')).toMatchSnapshot();
  });
});
