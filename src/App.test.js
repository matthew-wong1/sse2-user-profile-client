import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
jest.mock('./App')
jest.mock('axios');

// Test for the /signup route
test('renders the signup form', () => {
  render(
    <MemoryRouter initialEntries={['/signup']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/password/i)).toBeInTheDocument();
});

// Test for the /user-profile route
test('renders the user profile', () => {
  render(
    <MemoryRouter initialEntries={['/user-profile']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/User Information/i)).toBeInTheDocument();
});