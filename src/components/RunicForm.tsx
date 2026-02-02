import { useState, ChangeEvent } from 'react';

interface RunicFormProps {
  onNumberSubmit: (number: number) => void;
}

export function RunicForm({ onNumberSubmit}: RunicFormProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const validateInputInformation = (value: string): string => {
    if(value === '') return '';

    const num = Number(value);
    if (num === 0 ||  num > 9999) {
      return 'Enter correct number: 1-9999'
    }
    return '';
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // block everything except numbers
    let newValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
    
    // 2. block 0 as first number
    if (newValue.startsWith('0') && newValue.length > 1) {
      newValue = newValue.slice(0, 1);
    }
    
    // 3. block > 9999
    if (newValue.length > 4 || Number(newValue) > 9999) {
      newValue = newValue.slice(0, -1);
    }

    setInputValue(newValue);
    
    const error = validateInputInformation(newValue);
    if (error === '' && newValue !== '') {
      onNumberSubmit(Number(newValue));
    } else {
      onNumberSubmit(0); 
    }
  };

  const error = validateInputInformation(inputValue);

  return (
    <div className="w-full max-w-md h-[80px]">
    <input
      aria-label="Enter the number"
      id="runic-input"
      type="text"
      value={inputValue}
      onChange={handleChange}
      placeholder="1991"
      maxLength={4}
      inputMode="numeric"
      className={`
        focus:outline-none w-full py-2 px-3 text-gray-700 border rounded-lg focus:ring-2 focus:ring-purple-500
        ${error ? 'border-red-500' : 'border-gray-300'}
      `}
    />
    {error && (
      <p className="text-red-500 text-xs italic mt-2">{error}</p>
    )}
  </div>
  );
}
