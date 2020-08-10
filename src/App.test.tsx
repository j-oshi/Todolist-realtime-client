import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);

  screen.debug();
  expect(screen.getByText(/Search:/i)).toBeInTheDocument();
});


