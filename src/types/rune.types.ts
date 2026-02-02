export interface RunicLine {
  number: RunicLineNumber;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: 'horizontal' | 'vertical' | 'diagonal';
}

export type RunicLineNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25;

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Position = 'units' | 'tens' | 'hundreds' | 'thousands';

export type DigitToLinesMap = Record<Digit, RunicLineNumber[]>;

export interface ConversionResult {
  number: number;
  runicLineNumbers: RunicLineNumber[];
}

export interface RunicObject {
  svgString: string;
  inputValue: number;
}
