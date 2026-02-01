import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /runic number translator/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<App />);
    const description = screen.getByText(/convert decimal numbers/i);
    expect(description).toBeInTheDocument();
  });
});
