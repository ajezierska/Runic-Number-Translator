import { generateRuneSVG, downloadSVG } from '../../utils/svgGenerator';
import { RunicLineNumber, RunicObject } from '../../types/rune.types';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

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

describe('downloadSVG', () => {
  let createObjectURLMock: ReturnType<typeof vi.fn>;
  let revokeObjectURLMock: ReturnType<typeof vi.fn>;
  let appendChildSpy: ReturnType<typeof vi.spyOn>;
  let removeChildSpy: ReturnType<typeof vi.spyOn>;
  let clickSpy: ReturnType<typeof vi.fn>;
  let blobConstructorSpy: ReturnType<typeof vi.fn>;
  let originalBlob: typeof Blob;

  beforeEach(() => {
    // Save original Blob
    originalBlob = global.Blob;

    // Mock Blob constructor as a class
    blobConstructorSpy = vi.fn();
    global.Blob = class MockBlob extends originalBlob {
      constructor(content: BlobPart[], options?: BlobPropertyBag) {
        super(content, options);
        blobConstructorSpy(content, options as BlobPropertyBag);
      }
    } as any;

    // Mock URL methods
    createObjectURLMock = vi.fn(() => 'blob:mock-url');
    revokeObjectURLMock = vi.fn();
    global.URL.createObjectURL = createObjectURLMock as unknown as (blob: Blob) => string;
    global.URL.revokeObjectURL = revokeObjectURLMock as unknown as () => void;

    // Mock DOM methods
    appendChildSpy = vi.spyOn(document.body, 'appendChild');
    removeChildSpy = vi.spyOn(document.body, 'removeChild');
    clickSpy = vi.fn();

    // Mock createElement to return element with click method
    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      const element = originalCreateElement(tagName);
      if (tagName === 'a') {
        element.click = clickSpy as unknown as () => void;
      }
      return element;
    });
  });

  afterEach(() => {
    // Restore original Blob
    global.Blob = originalBlob as unknown as typeof Blob;
    vi.restoreAllMocks();
  });

  it('creates a blob with correct SVG content', () => {
    const runicObject: RunicObject = {
      inputValue: 123,
      svgString: '<svg>test</svg>'
    };

    downloadSVG(runicObject);

    expect(blobConstructorSpy).toHaveBeenCalledWith(
      ['<svg>test</svg>'],
      { type: 'image/svg+xml;charset=utf-8' }
    );
  });

  it('creates object URL from blob', () => {
    const runicObject: RunicObject = {
      inputValue: 5,
      svgString: '<svg>test</svg>'
    };

    downloadSVG(runicObject);

    expect(createObjectURLMock).toHaveBeenCalledTimes(1);
  });

  it('creates download link with correct attributes', () => {
    const runicObject: RunicObject = {
      inputValue: 42,
      svgString: '<svg>test</svg>'
    };

    downloadSVG(runicObject);

    // Check if link was created and appended
    expect(appendChildSpy).toHaveBeenCalledTimes(1);
    const linkElement = appendChildSpy.mock.calls[0][0] as HTMLAnchorElement;
    
    expect(linkElement.tagName).toBe('A');
    expect(linkElement.href).toBe('blob:mock-url');
    expect(linkElement.download).toBe('runa-42-lines.svg');
  });

  it('triggers download by clicking the link', () => {
    const runicObject: RunicObject = {
      inputValue: 999,
      svgString: '<svg>test</svg>'
    };

    downloadSVG(runicObject);

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('removes link from DOM after download', () => {
    const runicObject: RunicObject = {
      inputValue: 1,
      svgString: '<svg>test</svg>'
    };

    downloadSVG(runicObject);

    expect(removeChildSpy).toHaveBeenCalledTimes(1);
    const removedElement = removeChildSpy.mock.calls[0][0];
    expect(removedElement).toBeInstanceOf(HTMLAnchorElement);
  });

  it('revokes object URL after download', () => {
    const runicObject: RunicObject = {
      inputValue: 7,
      svgString: '<svg>test</svg>'
    };

    downloadSVG(runicObject);

    expect(revokeObjectURLMock).toHaveBeenCalledTimes(1);
    expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:mock-url');
  });

  it('generates correct filename for different input values', () => {
    const testCases = [
      { inputValue: 1, expectedFilename: 'runa-1-lines.svg' },
      { inputValue: 9999, expectedFilename: 'runa-9999-lines.svg' },
      { inputValue: 42, expectedFilename: 'runa-42-lines.svg' },
    ];

    testCases.forEach(({ inputValue, expectedFilename }) => {
      const runicObject: RunicObject = {
        inputValue,
        svgString: '<svg>test</svg>'
      };

      downloadSVG(runicObject);

      const linkElement = appendChildSpy.mock.calls[appendChildSpy.mock.calls.length - 1][0] as HTMLAnchorElement;
      expect(linkElement.download).toBe(expectedFilename);
    });
  });

  it('handles complex SVG content', () => {
    const complexSVG = `<svg viewBox="-5 -5 70 100" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#4c1d95" stroke-width="4">
        <line x1="30" y1="0" x2="30" y2="30" />
        <line x1="30" y1="30" x2="30" y2="60" />
      </g>
    </svg>`;

    const runicObject: RunicObject = {
      inputValue: 100,
      svgString: complexSVG
    };

    downloadSVG(runicObject);

    expect(blobConstructorSpy).toHaveBeenCalledWith(
      [complexSVG],
      { type: 'image/svg+xml;charset=utf-8' }
    );
    expect(clickSpy).toHaveBeenCalled();
  });

  it('completes download sequence in correct order', () => {
    const runicObject: RunicObject = {
      inputValue: 5,
      svgString: '<svg>test</svg>'
    };

    const callOrder: string[] = [];

    createObjectURLMock.mockImplementation(() => {
      callOrder.push('createObjectURL');
      return 'blob:mock-url';
    });

    appendChildSpy.mockImplementation((node) => {
      callOrder.push('appendChild');
      return node;
    });

    clickSpy.mockImplementation(() => {
      callOrder.push('click');
    });

    removeChildSpy.mockImplementation((node) => {
      callOrder.push('removeChild');
      return node;
    });

    revokeObjectURLMock.mockImplementation(() => {
      callOrder.push('revokeObjectURL');
    });

    downloadSVG(runicObject);

    expect(callOrder).toEqual([
      'createObjectURL',
      'appendChild',
      'click',
      'removeChild',
      'revokeObjectURL'
    ]);
  });
});
