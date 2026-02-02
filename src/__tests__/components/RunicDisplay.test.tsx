import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { RunicDisplay } from '../../components/RunicDisplay';
import { RunicLineNumber } from '../../types/rune.types';
import { generateRuneSVG } from '../../utils/svgGenerator';

describe('RunicDisplay', () => {
  it('renders SVG when runic line numbers are provided', () => {
    const lines: RunicLineNumber[] = [10, 13, 16];
    const svgString = generateRuneSVG(lines);
    const { container } = render(<RunicDisplay runicObject={{svgString, inputValue: 10}} />);
    
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('displays message when no lines are provided', () => {
    const { getByText } = render(<RunicDisplay runicObject={{svgString: '', inputValue: 0}} />);
    
    expect(getByText('Enter the correct number (1-9999) to see the rune')).toBeInTheDocument();
  });

  it('renders SVG with correct structure', () => {
    const lines: RunicLineNumber[] = [10, 13, 16, 2];
    const svgString = generateRuneSVG(lines);
    const { container } = render(<RunicDisplay runicObject={{svgString, inputValue: 10}} />);
    
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '-5 -5 70 100');
    expect(svg).toHaveAttribute('width', '70');
    expect(svg).toHaveAttribute('height', '100');
  });

  it('contains correct number of lines in SVG', () => {
    const lines: RunicLineNumber[] = [10, 13, 16, 1, 2];
    const svgString = generateRuneSVG(lines);
    const { container } = render(<RunicDisplay runicObject={{svgString, inputValue: 10}} />);
    
    const svg = container.querySelector('svg');
    const svgContent = svg?.innerHTML || '';
    
    // Should contain 5 line elements
    const lineMatches = svgContent.match(/<line/g);
    expect(lineMatches?.length).toBe(5);
  });

  it('has correct CSS classes', () => {
    const lines: RunicLineNumber[] = [10, 13, 16];
    const svgString = generateRuneSVG(lines);
    const { container } = render(<RunicDisplay runicObject={{svgString, inputValue: 10}} />);
    
    const displayContainer = container.querySelector('.bg-white.border-2.border-purple-200');
    expect(displayContainer).toBeInTheDocument();
  });

  it('has aria-label for accessibility', () => {
    const lines: RunicLineNumber[] = [10, 13, 16];
    const svgString = generateRuneSVG(lines);
    const { container } = render(<RunicDisplay runicObject={{svgString, inputValue: 10}} />);
    
    const svgContainer = container.querySelector('[aria-label="Runic representation of number 10"]');
    expect(svgContainer).toBeInTheDocument();
  });

  it('renders complex rune with multiple lines', () => {
    const lines: RunicLineNumber[] = [1, 2, 7, 8, 9, 17, 10, 13, 16];
    const svgString = generateRuneSVG(lines);
    const { container } = render(<RunicDisplay runicObject={{svgString, inputValue: 10}} />);
    
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    
    const svgContent = svg?.innerHTML || '';
    const lineMatches = svgContent.match(/<line/g);
    expect(lineMatches?.length).toBe(9);
  });
});
