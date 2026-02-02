import { describe, it, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RunicForm } from '../../components/RunicForm';

describe('RunicForm', () => {
  it('calls onNumberSubmit with valid numbers', () => {
    const onSubmit = vi.fn();
    render(<RunicForm onNumberSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '1991' }
    });
    
    expect(onSubmit).toHaveBeenCalledWith(1991);
  });

  it('blocks letters and special characters', () => {
    const onSubmit = vi.fn();
    render(<RunicForm onNumberSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'abc' } });
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(onSubmit).toHaveBeenCalledWith(0);
  });

  it('blocks numbers greater than 9999', () => {
    const onSubmit = vi.fn();
    render(<RunicForm onNumberSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '12345' } });
    expect(screen.getByRole('textbox')).toHaveValue('1234');
  });

  it('calls onNumberSubmit(0) for value 0', () => {
    const onSubmit = vi.fn();
    render(<RunicForm onNumberSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '0' } });
    expect(onSubmit).toHaveBeenCalledWith(0);
  });

  it('blocks 0 as first digit in multi-digit numbers', () => {
    const onSubmit = vi.fn();
    render(<RunicForm onNumberSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '01' } });
    expect(screen.getByRole('textbox')).toHaveValue('0');
  });

  it('accepts boundary values: 1 and 9999', () => {
    const onSubmit = vi.fn();
    const { rerender } = render(<RunicForm onNumberSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '1' } });
    expect(onSubmit).toHaveBeenCalledWith(1);
    
    onSubmit.mockClear();
    rerender(<RunicForm onNumberSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '9999' } });
    expect(onSubmit).toHaveBeenCalledWith(9999);
  });

  it('displays error message for value 0', () => {
    const onSubmit = vi.fn();
    render(<RunicForm onNumberSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '0' } });
    expect(screen.getByText('Enter correct number: 1-9999')).toBeInTheDocument();
  });

  it('clears error message after entering valid value', () => {
    const onSubmit = vi.fn();
    render(<RunicForm onNumberSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '0' } });
    expect(screen.getByText('Enter correct number: 1-9999')).toBeInTheDocument();
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '5' } });
    expect(screen.queryByText('Enter correct number: 1-9999')).not.toBeInTheDocument();
  });

  it('accepts only digits up to length 4', () => {
    const onSubmit = vi.fn();
    render(<RunicForm onNumberSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '123abc456' } });
    expect(screen.getByRole('textbox')).toHaveValue('1234');
  });

  it('has correct input attributes', () => {
    const onSubmit = vi.fn();
    render(<RunicForm onNumberSubmit={onSubmit} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('maxLength', '4');
    expect(input).toHaveAttribute('inputMode', 'numeric');
    expect(input).toHaveAttribute('placeholder', '1991');
  });

  it('handles empty input correctly', () => {
    const onSubmit = vi.fn();
    render(<RunicForm onNumberSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '123' } });
    expect(onSubmit).toHaveBeenCalledWith(123);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(onSubmit).toHaveBeenLastCalledWith(0);
  });

  it('updates value on multiple sequential changes', () => {
    const onSubmit = vi.fn();
    render(<RunicForm onNumberSubmit={onSubmit} />);
    
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: '1' } });
    expect(onSubmit).toHaveBeenLastCalledWith(1);
    
    fireEvent.change(input, { target: { value: '12' } });
    expect(onSubmit).toHaveBeenLastCalledWith(12);
    
    fireEvent.change(input, { target: { value: '123' } });
    expect(onSubmit).toHaveBeenLastCalledWith(123);
  });
});
