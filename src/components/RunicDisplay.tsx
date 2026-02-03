import { RunicObject } from '../types/rune.types';

export function RunicDisplay({ runicObject }: { runicObject: RunicObject }) {
  const isEmpty = runicObject.inputValue === 0;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white border-2 border-purple-200 rounded-lg p-6 shadow-lg flex justify-center items-center h-48">
        {isEmpty ? (
          <span className="text-purple-700">Enter the correct number (1-9999) to see the rune</span>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: runicObject.svgString }}
            className="w-full max-w-[300px] flex justify-center items-center"
            aria-label={`Runic representation of number ${runicObject.inputValue}`}
          />
        )}
      </div>
    </div>
  );
}
