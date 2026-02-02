import { RunicLineNumber } from '../types/rune.types';
import { generateRuneSVG } from '../utils/svgGenerator';

interface RunicDisplayProps {
  runicLineNumbers: RunicLineNumber[];
}

export function RunicDisplay({
  runicLineNumbers,
}: RunicDisplayProps) {
  const isEmpty = runicLineNumbers.length === 0;

  const svgString = generateRuneSVG(runicLineNumbers);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white border-2 border-purple-200 rounded-lg p-6 shadow-lg flex justify-center items-center h-48">
        {isEmpty ? <span className='text-purple-700'>Enter the correct number (1-9999) to see the rune</span> :
          <div
            dangerouslySetInnerHTML={{ __html: svgString }}
            className="w-full max-w-[300px] flex justify-center items-center"
            aria-label="Runic representation of entered number"
          />
        }
      </div>
    </div>
  );
}
