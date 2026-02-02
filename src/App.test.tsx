import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /runic number translator/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<App />);
    const description = screen.getByText(/translate numbers to their runic representation/i);
    expect(description).toBeInTheDocument();
  });

  it('renders input section heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /enter the number/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders display section heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /runic representation/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders input field with placeholder', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('1991');
    expect(input).toBeInTheDocument();
  });

  it('shows initial empty state message', () => {
    render(<App />);
    const message = screen.getByText(/enter the correct number \(1-9999\) to see the rune/i);
    expect(message).toBeInTheDocument();
  });

  it('updates display when valid number is entered', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: '123' } });
    
    const emptyMessage = screen.queryByText(/enter the correct number \(1-9999\) to see the rune/i);
    expect(emptyMessage).not.toBeInTheDocument();
  });

  it('has proper layout structure', () => {
    const { container } = render(<App />);
    
    const header = container.querySelector('header');
    const main = container.querySelector('main');
    
    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });

  it('renders RunicForm and RunicDisplay components', () => {
    render(<App />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    
    const display = screen.getByText(/enter the correct number \(1-9999\) to see the rune/i);
    expect(display).toBeInTheDocument();
  });

  it('maintains state when switching between valid numbers', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: '123' } });
    expect(input).toHaveValue('123');
    
    fireEvent.change(input, { target: { value: '456' } });
    expect(input).toHaveValue('456');
  });
});
