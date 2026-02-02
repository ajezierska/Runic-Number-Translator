import { useState } from 'react';
import { RunicForm } from './components/RunicForm';
import { RunicDisplay } from './components/RunicDisplay';
import { convertNumberToRune } from './utils/runicConverter';
import { RunicLineNumber } from './types/rune.types';

function App() {
  const [runicLineNumbers, setRunicLineNumbers] = useState<RunicLineNumber[]>([]);

  const handleNumberSubmit = (number: number) => {
    const result = number ? convertNumberToRune(number).runicLineNumbers : [];
    setRunicLineNumbers(result);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-2">
            Runic Number Translator
          </h1>
          <p className="text-purple-700">
            Translate numbers to their runic representation (1 - 9999)
          </p>
        </header>

        <main className="grid md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">
              Enter the number
            </h2>
            <RunicForm onNumberSubmit={handleNumberSubmit} />
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">
              Runic representation
            </h2>
            <RunicDisplay
              runicLineNumbers={runicLineNumbers}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
