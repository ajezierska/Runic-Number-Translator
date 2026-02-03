import { RunicLine, RunicLineNumber } from '../types/rune.types';

/**
* Definitions of all 25 runic lines with their SVG coordinates.
* based on the image in helpers/runic-base-model.png
*
* Grid structure:
* ┌─────────┬─────────┐ y=0
* |         |         |   
* ├─────────┼─────────┤ y=30
* |         |         |    
* ├─────────┼─────────┤ y=60
* |         |         |   
* └─────────┴─────────┘ y=90
*  x=0     x=30     x=60
*
* Lines:
* - 1-8: horizontal
* - 9-17: vertical
* - 18-25: diagonal
*
* ViewBox: 0 0 60 90
*/


//Array of all 25 runic lines
export const RUNIC_LINES: Record<RunicLineNumber, RunicLine> = {
    // HORIZONTAL LINES (1-8)
    1: { number: 1, x1: 0, y1: 0, x2: 30, y2: 0, type: 'horizontal' }, // Top left
    2: { number: 2, x1: 30, y1: 0, x2: 60, y2: 0, type: 'horizontal' }, // Top right
    3: { number: 3, x1: 0, y1: 30, x2: 30, y2: 30, type: 'horizontal' }, // Middle left upper
    4: { number: 4, x1: 30, y1: 30, x2: 60, y2: 30, type: 'horizontal' }, // Middle right upper
    5: { number: 5, x1: 0, y1: 60, x2: 30, y2: 60, type: 'horizontal' }, // Middle left lower
    6: { number: 6, x1: 30, y1: 60, x2: 60, y2: 60, type: 'horizontal' }, // Middle right lower
    7: { number: 7, x1: 0, y1: 90, x2: 30, y2: 90, type: 'horizontal' }, // Bottom left
    8: { number: 8, x1: 30, y1: 90, x2: 60, y2: 90, type: 'horizontal' }, // Bottom right


    // VERTICAL LINES (9-17)
    9: { number: 9, x1: 0, y1: 0, x2: 0, y2: 30, type: 'vertical' }, // Left upper
    10: { number: 10, x1: 30, y1: 0, x2: 30, y2: 30, type: 'vertical' }, // Center upper (ALWAYS present)
    11: { number: 11, x1: 60, y1: 0, x2: 60, y2: 30, type: 'vertical' }, // Right upper
    12: { number: 12, x1: 0, y1: 30, x2: 0, y2: 60, type: 'vertical' }, // Left middle
    13: { number: 13, x1: 30, y1: 30, x2: 30, y2: 60, type: 'vertical' }, // Center middle (ALWAYS present)
    14: { number: 14, x1: 60, y1: 30, x2: 60, y2: 60, type: 'vertical' }, // Right middle
    15: { number: 15, x1: 0, y1: 60, x2: 0, y2: 90, type: 'vertical' }, // Left lower
    16: { number: 16, x1: 30, y1: 60, x2: 30, y2: 90, type: 'vertical' }, // Center lower (ALWAYS present)
    17: { number: 17, x1: 60, y1: 60, x2: 60, y2: 90, type: 'vertical' }, // Right lower


    // DIAGONAL LINES (18-25)
    18: { number: 18, x1: 0, y1: 0, x2: 30, y2: 30, type: 'diagonal' }, // Left upper NW-SE
    19: { number: 19, x1: 30, y1: 0, x2: 0, y2: 30, type: 'diagonal' }, // Left upper NE-SW
    20: { number: 20, x1: 30, y1: 0, x2: 60, y2: 30, type: 'diagonal' }, // Right upper NW-SE
    21: { number: 21, x1: 60, y1: 0, x2: 30, y2: 30, type: 'diagonal' }, // Right upper NE-SW
    22: { number: 22, x1: 0, y1: 60, x2: 30, y2: 90, type: 'diagonal' }, // Left lower NW-SE
    23: { number: 23, x1: 30, y1: 60, x2: 0, y2: 90, type: 'diagonal' }, // Left lower NE-SW
    24: { number: 24, x1: 30, y1: 60, x2: 60, y2: 90, type: 'diagonal' }, // Right lower NW-SE
    25: { number: 25, x1: 60, y1: 60, x2: 30, y2: 90, type: 'diagonal' }, // Right lower NE-SW
};

//Lines that are always present in every rune (base)
export const BASE_RUNIC_LINES: RunicLineNumber[] = [10, 13, 16];

// SVG viewBox dimensions
export const SVG_CONFIG = {
    width: 70,
    height: 100,
    viewBox: '-5 -5 70 100', // viewBox + margins
    strokeWidth: 4,
    strokeColor: '#4c1d95',
    strokeLinecap: 'round' as const,
};

