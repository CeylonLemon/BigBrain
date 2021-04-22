import React from 'react';
import { render, screen } from '@testing-library/react';
import App11 from './App11';

test('renders learn react link', () => {
  render(<App11 />);
  const linkElement = screen.getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});
