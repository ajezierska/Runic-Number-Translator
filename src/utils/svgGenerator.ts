import { RunicLineNumber } from '../types/rune.types';
import { RUNIC_LINES, SVG_CONFIG } from '../constants/runicLines';


export function generateRuneSVG(runicLineNumbers: RunicLineNumber[]): string {
    const lines = runicLineNumbers
        .map(lineNumber => {
            const line = RUNIC_LINES[lineNumber];
            if (!line) {
                console.warn(`Line number ${lineNumber} not found in RUNIC_LINES`);
                return '';
            }
            return `<line key="${line.number}" x1="${line.x1}" y1="${line.y1}" x2="${line.x2}" y2="${line.y2}" />`;
        })

    return `<svg
                viewBox="${SVG_CONFIG.viewBox}"
                xmlns="http://www.w3.org/2000/svg"
                width="${SVG_CONFIG.width}"
                height="${SVG_CONFIG.height}"
            >
                <g
                    stroke="${SVG_CONFIG.strokeColor}"
                    stroke-width="${SVG_CONFIG.strokeWidth}"
                    stroke-linecap="${SVG_CONFIG.strokeLinecap}"
                >
                    ${lines}
                </g>
            </svg>`;
}
