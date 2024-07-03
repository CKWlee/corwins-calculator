import React, { useState } from 'react';
import './App.css';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);

    const handleButtonClick = (value) => {
        setInput(prevInput => prevInput + value);
    };

    const handleClear = () => {
        setInput('');
    };

    const handleBackspace = () => {
        setInput(prevInput => prevInput.slice(0, -1));
    };

    const handleCalculate = () => {
        try {
            const calculate = new Function('return ' + input);
            const result = calculate().toString();
            setInput(result);
            setHistory(prevHistory => [...prevHistory, { input, result }]);
        } catch (error) {
            setInput('Error');
        }
    };

    const handleKeyDown = (event) => {
        const { key } = event;
        if ((/[0-9]/).test(key)) {
            handleButtonClick(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            handleButtonClick(key);
        } else if (key === '.') {
            handleButtonClick(key);
        } else if (key === 'Enter') {
            handleCalculate();
        } else if (key === 'Backspace') {
            handleBackspace();
        }
    };

    return (
        <div className="calculator" tabIndex="0" onKeyDown={handleKeyDown}>
            <div className="calculator-screen">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="0"
                    readOnly
                />
            </div>
            <div className="calculator-keys">
                <button onClick={handleClear} className="all-clear">
                    AC
                </button>
                <button onClick={handleBackspace} className="backspace">
                    &#x232b;
                </button>
                <button onClick={() => handleButtonClick('7')}>7</button>
                <button onClick={() => handleButtonClick('8')}>8</button>
                <button onClick={() => handleButtonClick('9')}>9</button>
                <button onClick={() => handleButtonClick('/')}>/</button>
                <button onClick={() => handleButtonClick('4')}>4</button>
                <button onClick={() => handleButtonClick('5')}>5</button>
                <button onClick={() => handleButtonClick('6')}>6</button>
                <button onClick={() => handleButtonClick('*')}>*</button>
                <button onClick={() => handleButtonClick('1')}>1</button>
                <button onClick={() => handleButtonClick('2')}>2</button>
                <button onClick={() => handleButtonClick('3')}>3</button>
                <button onClick={() => handleButtonClick('-')}>-</button>
                <button onClick={() => handleButtonClick('0')}>0</button>
                <button onClick={() => handleButtonClick('.')}>.</button>
                <button onClick={() => handleButtonClick('+')}>+</button>
                <button onClick={handleCalculate} className="equal-sign">
                    =
                </button>
            </div>
            <div className="history">
                <h2>History</h2>
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>
                            {item.input} = {item.result}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Calculator;
