import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import store from '../../store/store';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from '../../components/router/appRouter';

export function renderWithRouter(children, initialEntires = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntires}>{children}</MemoryRouter>
  );
}

export function renderWithReduxProvider(children, initialEntires = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntires}>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>
  );
}

export function renderWithAppRouter(children, initialEntires = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntires}>
      <Provider store={store}>
        <AppRouter />
        {children}
      </Provider>
    </MemoryRouter>
  );
}
