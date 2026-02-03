import { useState } from 'react';
import { RunicForm } from './components/RunicForm';
import { RunicDisplay } from './components/RunicDisplay';
import { convertNumberToRune } from './utils/runicConverter';
import { RunicObject } from './types/rune.types';
import { downloadSVG, generateRuneSVG } from './utils/svgGenerator';

function App() {
  const [runicObject, setRunicObject] = useState<RunicObject>({ svgString: '', inputValue: 0 });

  const handleNumberSubmit = (number: number) => {
    const result = number ? convertNumberToRune(number).runicLineNumbers : [];
    const svgString = generateRuneSVG(result);
    setRunicObject({ svgString: svgString, inputValue: number });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-2">Runic Number Translator</h1>
          <p className="text-purple-700">Translate numbers to their runic representation (1 - 9999)</p>
        </header>

        <main className="grid md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col items-center h-full">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">Enter the number</h2>
            <RunicForm onNumberSubmit={handleNumberSubmit} />

            <button
              onClick={() => downloadSVG(runicObject)}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-md disabled:opacity-50"
              disabled={!runicObject.inputValue}
            >
              📥 Download SVG
            </button>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">Runic representation</h2>
            <RunicDisplay runicObject={runicObject} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
