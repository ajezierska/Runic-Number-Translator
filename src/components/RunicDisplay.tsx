import { RunicObject } from '../types/rune.types';
import { downloadSVG, generateRuneSVG } from '../utils/svgGenerator';


export function RunicDisplay({
  runicObject,
}: { runicObject: RunicObject }) {
  const isEmpty = runicObject.runicLineNumbers.length === 0;

  const svgString = generateRuneSVG(runicObject.runicLineNumbers);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white border-2 border-purple-200 rounded-lg p-6 shadow-lg flex justify-center items-center h-48">
        {isEmpty ? <span className='text-purple-700'>Enter the correct number (1-9999) to see the rune</span> :
          <div
            dangerouslySetInnerHTML={{ __html: svgString }}
            className="w-full max-w-[300px] flex justify-center items-center"
            aria-label={`Runic representation of number ${runicObject.inputValue}`}
          />
        }
        <button
          onClick={() => downloadSVG(svgString, runicObject.inputValue)}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-md disabled:opacity-50"
          disabled={isEmpty}
        >
          📥 Download SVG
        </button>
      </div>
    </div>
  );
}
