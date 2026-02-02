import { getRunicLineNumbersForDigit, getAllRunicLinesNumbers } from '../../utils/lineMapper';
import { Position, RunicLineNumber } from '../../types/rune.types';
import { describe, it, expect } from 'vitest';

describe('lineMapper', () => {
  describe('getRunicLineNumbersForDigit', () => {
    it.each([
      ['units 0', 'units', 0, []],
      ['units 1', 'units', 1, [2]],
      ['units 2', 'units', 2, [4]],
      ['units 3', 'units', 3, [20]],
      ['units 9', 'units', 9, [2, 4, 11]],
    ])('digit %s returns correct lines', (_, position, digit, expected) => {
      const lines = getRunicLineNumbersForDigit(digit as any, position as Position);
      expect(lines).toEqual(expected);
    });

    it.each([
      ['tens 0', 'tens', 0, []],
      ['tens 1', 'tens', 1, [1]],
      ['tens 3', 'tens', 3, [19]],
      ['tens 9', 'tens', 9, [1, 3, 9]],
    ])('digit %s returns correct lines', (_, position, digit, expected) => {
      const lines = getRunicLineNumbersForDigit(digit as any, position as Position);
      expect(lines).toEqual(expected);
    });

    it.each([
      ['hundreds 0', 'hundreds', 0, []],
      ['hundreds 1', 'hundreds', 1, [8]],
      ['hundreds 2', 'hundreds', 2, [6]],
      ['hundreds 9', 'hundreds', 9, [8, 6, 17]],
    ])('digit %s returns correct lines', (_, position, digit, expected) => {
      const lines = getRunicLineNumbersForDigit(digit as any, position as Position);
      expect(lines).toEqual(expected);
    });

    it.each([
      ['thousands 0', 'thousands', 0, []],
      ['thousands 1', 'thousands', 1, [7]],
      ['thousands 4', 'thousands', 4, [23]],
      ['thousands 9', 'thousands', 9, [7, 5, 15]],
    ])('digit %s returns correct lines', (_, position, digit, expected) => {
      const lines = getRunicLineNumbersForDigit(digit as any, position as Position);
      expect(lines).toEqual(expected);
    });

    it('returns correct lines for all units digits', () => {
      expect(getRunicLineNumbersForDigit(0, 'units')).toEqual([]);
      expect(getRunicLineNumbersForDigit(1, 'units')).toEqual([2]);
      expect(getRunicLineNumbersForDigit(2, 'units')).toEqual([4]);
      expect(getRunicLineNumbersForDigit(3, 'units')).toEqual([20]);
      expect(getRunicLineNumbersForDigit(4, 'units')).toEqual([21]);
      expect(getRunicLineNumbersForDigit(5, 'units')).toEqual([2, 21]);
      expect(getRunicLineNumbersForDigit(6, 'units')).toEqual([11]);
      expect(getRunicLineNumbersForDigit(7, 'units')).toEqual([2, 11]);
      expect(getRunicLineNumbersForDigit(8, 'units')).toEqual([4, 11]);
      expect(getRunicLineNumbersForDigit(9, 'units')).toEqual([2, 4, 11]);
    });

    it('returns correct lines for all tens digits', () => {
      expect(getRunicLineNumbersForDigit(0, 'tens')).toEqual([]);
      expect(getRunicLineNumbersForDigit(1, 'tens')).toEqual([1]);
      expect(getRunicLineNumbersForDigit(2, 'tens')).toEqual([3]);
      expect(getRunicLineNumbersForDigit(3, 'tens')).toEqual([19]);
      expect(getRunicLineNumbersForDigit(4, 'tens')).toEqual([18]);
      expect(getRunicLineNumbersForDigit(5, 'tens')).toEqual([1, 18]);
      expect(getRunicLineNumbersForDigit(6, 'tens')).toEqual([9]);
      expect(getRunicLineNumbersForDigit(7, 'tens')).toEqual([1, 9]);
      expect(getRunicLineNumbersForDigit(8, 'tens')).toEqual([3, 9]);
      expect(getRunicLineNumbersForDigit(9, 'tens')).toEqual([1, 3, 9]);
    });

    it('returns correct lines for all hundreds digits', () => {
      expect(getRunicLineNumbersForDigit(0, 'hundreds')).toEqual([]);
      expect(getRunicLineNumbersForDigit(1, 'hundreds')).toEqual([8]);
      expect(getRunicLineNumbersForDigit(2, 'hundreds')).toEqual([6]);
      expect(getRunicLineNumbersForDigit(3, 'hundreds')).toEqual([25]);
      expect(getRunicLineNumbersForDigit(4, 'hundreds')).toEqual([24]);
      expect(getRunicLineNumbersForDigit(5, 'hundreds')).toEqual([8, 24]);
      expect(getRunicLineNumbersForDigit(6, 'hundreds')).toEqual([17]);
      expect(getRunicLineNumbersForDigit(7, 'hundreds')).toEqual([8, 17]);
      expect(getRunicLineNumbersForDigit(8, 'hundreds')).toEqual([6, 17]);
      expect(getRunicLineNumbersForDigit(9, 'hundreds')).toEqual([8, 6, 17]);
    });

    it('returns correct lines for all thousands digits', () => {
      expect(getRunicLineNumbersForDigit(0, 'thousands')).toEqual([]);
      expect(getRunicLineNumbersForDigit(1, 'thousands')).toEqual([7]);
      expect(getRunicLineNumbersForDigit(2, 'thousands')).toEqual([5]);
      expect(getRunicLineNumbersForDigit(3, 'thousands')).toEqual([22]);
      expect(getRunicLineNumbersForDigit(4, 'thousands')).toEqual([23]);
      expect(getRunicLineNumbersForDigit(5, 'thousands')).toEqual([7, 23]);
      expect(getRunicLineNumbersForDigit(6, 'thousands')).toEqual([15]);
      expect(getRunicLineNumbersForDigit(7, 'thousands')).toEqual([7, 15]);
      expect(getRunicLineNumbersForDigit(8, 'thousands')).toEqual([5, 15]);
      expect(getRunicLineNumbersForDigit(9, 'thousands')).toEqual([7, 5, 15]);
    });
  });

  describe('getAllRunicLinesNumbers', () => {
    it('includes base lines (10, 13, 16)', () => {
      const result = getAllRunicLinesNumbers([]);
      expect(result).toEqual([10, 13, 16]);
    });

    it('combines base lines with additional lines', () => {
      const additionalLines: RunicLineNumber[] = [1, 2];
      const result = getAllRunicLinesNumbers(additionalLines);
      
      expect(result).toContain(10);
      expect(result).toContain(13);
      expect(result).toContain(16);
      expect(result).toContain(1);
      expect(result).toContain(2);
    });

    it('preserves order: base lines first, then additional', () => {
      const additionalLines: RunicLineNumber[] = [7, 8];
      const result = getAllRunicLinesNumbers(additionalLines);
      
      expect(result[0]).toBe(10);
      expect(result[1]).toBe(13);
      expect(result[2]).toBe(16);
      expect(result[3]).toBe(7);
      expect(result[4]).toBe(8);
    });

    it('handles multiple additional lines', () => {
      const additionalLines: RunicLineNumber[] = [1, 2, 3, 4, 5];
      const result = getAllRunicLinesNumbers(additionalLines);
      
      expect(result.length).toBe(8); // 3 base + 5 additional
    });
  });
});
