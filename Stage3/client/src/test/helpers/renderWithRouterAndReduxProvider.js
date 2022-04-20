import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import store from '../../store/store';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from '../../components/router/appRouter';

function renderWithRouterAndReduxProvider(children, initialEntires = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntires}>
      <Provider store={store}>
        <AppRouter />
        {children}
      </Provider>
    </MemoryRouter>
  );
}

export default renderWithRouterAndReduxProvider;
