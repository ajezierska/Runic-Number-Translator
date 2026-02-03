import { Digit, RunicLineNumber, ConversionResult } from '../types/rune.types';
import { getRunicLineNumbersForDigit, getAllRunicLinesNumbers } from './lineMapper';

export function convertNumberToRune(number: number): ConversionResult {
  const digits = splitNumberIntoDigits(number);

  let lineNumberArrays: RunicLineNumber[] = [];

  if (digits.thousands !== null) {
    lineNumberArrays = [...lineNumberArrays, ...getRunicLineNumbersForDigit(digits.thousands, 'thousands')];
  }
  if (digits.hundreds !== null) {
    lineNumberArrays = [...lineNumberArrays, ...getRunicLineNumbersForDigit(digits.hundreds, 'hundreds')];
  }
  if (digits.tens !== null) {
    lineNumberArrays = [...lineNumberArrays, ...getRunicLineNumbersForDigit(digits.tens, 'tens')];
  }
  if (digits.units !== null) {
    lineNumberArrays = [...lineNumberArrays, ...getRunicLineNumbersForDigit(digits.units, 'units')];
  }

  return {
    number,
    runicLineNumbers: getAllRunicLinesNumbers(lineNumberArrays),
  };
}

export function splitNumberIntoDigits(number: number): {
  thousands: Digit | null;
  hundreds: Digit | null;
  tens: Digit | null;
  units: Digit | null;
} {
  const numStr = number.toString().padStart(4, '0');
  const thousands = number >= 1000 ? (parseInt(numStr[0]) as Digit) : null;
  const hundreds = number >= 100 ? (parseInt(numStr[1]) as Digit) : null;
  const tens = number >= 10 ? (parseInt(numStr[2]) as Digit) : null;
  const units = parseInt(numStr[3]) as Digit;

  return { thousands, hundreds, tens, units };
}
