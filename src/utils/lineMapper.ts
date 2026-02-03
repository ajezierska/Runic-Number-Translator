import { Digit, RunicLineNumber, Position, DigitToLinesMap } from '../types/rune.types';
import { BASE_RUNIC_LINES } from '../constants/runicLines';

/**
 * The system is based on runic line numbers (helpers/runic-base-model.png),
 * where each digit has its own unique combination of lines.
 */

// Mapping of digits 0-9 in UNITS position to line numbers

export const UNITS_MAP: DigitToLinesMap = {
  0: [],
  1: [2],
  2: [4],
  3: [20],
  4: [21],
  5: [2, 21],
  6: [11],
  7: [2, 11],
  8: [4, 11],
  9: [2, 4, 11],
};

// Mapping of digits 0-9 in TENS position to line numbers

export const TENS_MAP: DigitToLinesMap = {
  0: [],
  1: [1],
  2: [3],
  3: [19],
  4: [18],
  5: [1, 18],
  6: [9],
  7: [1, 9],
  8: [3, 9],
  9: [1, 3, 9],
};

// Mapping of digits 0-9 in HUNDREDS position to line numbers

export const HUNDREDS_MAP: DigitToLinesMap = {
  0: [],
  1: [8],
  2: [6],
  3: [25],
  4: [24],
  5: [8, 24],
  6: [17],
  7: [8, 17],
  8: [6, 17],
  9: [8, 6, 17],
};

// Mapping of digits 0-9 in THOUSANDS position to line numbers

export const THOUSANDS_MAP: DigitToLinesMap = {
  0: [],
  1: [7],
  2: [5],
  3: [22],
  4: [23],
  5: [7, 23],
  6: [15],
  7: [7, 15],
  8: [5, 15],
  9: [7, 5, 15],
};

export function getRunicLineNumbersForDigit(digit: Digit, position: Position): RunicLineNumber[] {
  const map = getMapForPosition(position);
  return map[digit];
}

function getMapForPosition(position: Position): DigitToLinesMap {
  switch (position) {
    case 'units':
      return UNITS_MAP;
    case 'tens':
      return TENS_MAP;
    case 'hundreds':
      return HUNDREDS_MAP;
    case 'thousands':
      return THOUSANDS_MAP;
  }
}

export function getAllRunicLinesNumbers(runicLineNumbers: RunicLineNumber[]): RunicLineNumber[] {
  return [...BASE_RUNIC_LINES, ...runicLineNumbers];
}
