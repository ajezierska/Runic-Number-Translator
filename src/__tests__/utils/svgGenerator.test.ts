import { generateRuneSVG } from '../../utils/svgGenerator';
import { RunicLineNumber } from '../../types/rune.types';
import { describe, it, expect } from 'vitest';

describe('svgGenerator', () => {
  it('generates valid SVG string', () => {
    const lines: RunicLineNumber[] = [10, 13, 16, 2];
    const svg = generateRuneSVG(lines);
    
    expect(svg).toMatch(/^<svg/);
    expect(svg).toMatch(/viewBox="-5 -5 70 100"/);
    expect(svg).toMatch(/stroke="#4c1d95"/);
    expect(svg).toContain('x1="30" y1="0" x2="30" y2="30"'); // line 10
  });

  it('contains all required lines', () => {
    const lines: RunicLineNumber[] = [1, 10];
    const svg = generateRuneSVG(lines);
    expect(svg).toContain('x1="0" y1="0" x2="30" y2="0"');  // line 1
    expect(svg).toContain('x1="30" y1="0" x2="30" y2="30"'); // line 10
  });

  it('generates SVG with correct viewBox dimensions', () => {
    const lines: RunicLineNumber[] = [10, 13, 16];
    const svg = generateRuneSVG(lines);
    
    expect(svg).toContain('viewBox="-5 -5 70 100"');
    expect(svg).toContain('width="70"');
    expect(svg).toContain('height="100"');
  });

  it('includes stroke styling', () => {
    const lines: RunicLineNumber[] = [10];
    const svg = generateRuneSVG(lines);
    
    expect(svg).toContain('stroke="#4c1d95"');
    expect(svg).toContain('stroke-width="4"');
    expect(svg).toContain('stroke-linecap="round"');
  });

  it('generates correct number of line elements', () => {
    const lines: RunicLineNumber[] = [1, 2, 3, 10, 13];
    const svg = generateRuneSVG(lines);
    
    const lineMatches = svg.match(/<line/g);
    expect(lineMatches?.length).toBe(5);
  });

  it('handles empty array', () => {
    const lines: RunicLineNumber[] = [];
    const svg = generateRuneSVG(lines);
    
    expect(svg).toMatch(/^<svg/);
    expect(svg).toContain('</svg>');
  });

  it('generates SVG with all base lines', () => {
    const lines: RunicLineNumber[] = [10, 13, 16];
    const svg = generateRuneSVG(lines);
    
    expect(svg).toContain('x1="30" y1="0" x2="30" y2="30"');   // line 10
    expect(svg).toContain('x1="30" y1="30" x2="30" y2="60"');  // line 13
    expect(svg).toContain('x1="30" y1="60" x2="30" y2="90"');  // line 16
  });

  it('generates complex rune with multiple lines', () => {
    const lines: RunicLineNumber[] = [1, 2, 7, 8, 9, 17, 10, 13, 16];
    const svg = generateRuneSVG(lines);
    
    const lineMatches = svg.match(/<line/g);
    expect(lineMatches?.length).toBe(9);
  });

  it('includes xmlns attribute', () => {
    const lines: RunicLineNumber[] = [10];
    const svg = generateRuneSVG(lines);
    
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
  });

  it('wraps lines in a group element', () => {
    const lines: RunicLineNumber[] = [10, 13];
    const svg = generateRuneSVG(lines);
    
    expect(svg).toContain('<g');
    expect(svg).toContain('</g>');
  });

  it('generates diagonal lines correctly', () => {
    const lines: RunicLineNumber[] = [18, 19]; // diagonal lines
    const svg = generateRuneSVG(lines);
    
    expect(svg).toContain('x1="0" y1="0" x2="30" y2="30"');   // line 18
    expect(svg).toContain('x1="30" y1="0" x2="0" y2="30"');   // line 19
  });

  it('generates horizontal lines correctly', () => {
    const lines: RunicLineNumber[] = [1, 2];
    const svg = generateRuneSVG(lines);
    
    expect(svg).toContain('x1="0" y1="0" x2="30" y2="0"');    // line 1
    expect(svg).toContain('x1="30" y1="0" x2="60" y2="0"');   // line 2
  });
});
