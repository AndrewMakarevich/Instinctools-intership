import { render, screen } from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import BreadCrumb from './breadCrumb';
import AppRouter from '../router/appRouter';
import { BrowserRouter } from 'react-router-dom';

test('Bread crumb renders correctly', () => {
  render(
    <BrowserRouter>
      <BreadCrumb />
    </BrowserRouter>
  );
  const breadCrumbComponent = screen.getByTestId('bread-crumb');
  expect(breadCrumbComponent).toBeInTheDocument();
  expect(breadCrumbComponent).toMatchSnapshot(
    'Bread crumb: component final version'
  );
});
