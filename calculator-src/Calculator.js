import React, {useState, useEffect} from 'react';

import './calculator.css';

import {memoryButtons, calculatorButtons, isOperator, isFunction} from './buttons';

const Calculator = () => {
	const [number, setNumber] = useState('0');
	const [decimalUsed, setDecimalUsed] = useState(false);
	const [functionUsed, setFunctionUsed] = useState(false);
	const [showingResult, setShowingResult] = useState(false);
	const [operator, setOperator] = useState('');
	const [stackNumber, setStackNumber] = useState('');
	const [history, setHistory] = useState([]);

	const handleNumpadClick = (numberText) => {
		if(functionUsed)
			setHistory(history.slice(0, history.length - 1));
		if(numberText === '.') {
			if(decimalUsed) return;
			setNumber(number + '.');
		}
		else if(number === '0' || functionUsed)
			setNumber(numberText);
		else
			setNumber(number + numberText);
		setFunctionUsed(false);
		setShowingResult(false);
	}

	const handleOperatorClick = (operationText) => {
		if(operationText === '=') {
			if(!operator)
				setNumber(number);
			else {
				const result = performOperation();
				if(!result) return;
				setNumber(result);
			}
			setHistory([]);
			setStackNumber('');
			setOperator('');
			setShowingResult(false);
		}
		else {
			if(!operator)
				setStackNumber(number);
			else {
				const result = performOperation();
				if(!result) return;
				setStackNumber(result);
			}
			if(functionUsed)
				setHistory([...history, operationText]);
			else
				setHistory([...history, number, operationText]);
			setNumber('0');
			setOperator(operationText);
			setShowingResult(true);
		}
		setFunctionUsed(false);
	}

	const handleFunctionClick = (functionText) => {
		let functionName;
		if(functionText === '1/x')
			functionName = 'reciproc';
		if(functionText === 'x²')
			functionName = 'squared';
		if(functionText === '√')
			functionName = 'sqrt';
		const result = performFunction(functionText);
		if(!result)
			return;
		setNumber(result);
		if(functionUsed)
			setHistory(history.map((hist, index) => {
				if(index === history.length - 1)
					return functionName + '(' + hist + ')';
				return hist;
			}))
		else
			setHistory([...history, functionName + '(' + number + ')']);
		setFunctionUsed(true);
	}

	const performOperation = () => {
		const a = Number(stackNumber), b = Number(number);
		let result;
		if(operator === '+')
			result = a + b;
		else if(operator === '-')
			result = a - b;
		else if(operator === 'x')
			result = a * b;
		else if(operator === '÷') {
			if(b === 0) {
				flushStates(true);
				return false;
			}
			result = a / b;
		}
		result = String(result);
		return result;
	}

	const performFunction = (mathFunction) => {
		const a = Number(number);
		let result;
		if(mathFunction === '1/x') {
			if(a === 0) {
				flushStates(true);
				return false;
			}
			result = 1 / a;
		}
		else if(mathFunction === 'x²')
			result = a * a;
		else if(mathFunction === '√') {
			if(a < 0) {
				flushStates(true);
				return false;
			}
			result = Math.sqrt(a);
		}
		result = String(result);
		return result;
	}

	const flushStates = (error) => {
		setNumber(error ? 'Error' : '0');
		setHistory([]);
		setOperator('');
		setFunctionUsed(false);
		setShowingResult(false);
		setStackNumber('');
		setTimeout(() => {
			setNumber('0');
		}, 300);
	}

	const backspace = () => {
		if(showingResult)
			setShowingResult(false);
		if(number === '0')
			return;
		if((number.length === 1) || (number.length === 2 && number[0] === '-')) 
			setNumber('0');
		else
			setNumber(number.substring(0, number.length - 1));
	}

	const handleClick = (buttonText) => {
		if(!isNaN(buttonText) || buttonText === '.')
			handleNumpadClick(buttonText);
		else if(buttonText === 'C' || buttonText === 'CE')
			flushStates();
		else if(buttonText === '+/-')
			setNumber(String(0 - Number(number)));
		else if(isOperator(buttonText)) 
			handleOperatorClick(buttonText); 
		else if(isFunction(buttonText))
			handleFunctionClick(buttonText);
		else if(buttonText.type === 'i') 
			backspace();
	}

	useEffect(() => {
		if(number.includes('.'))
			setDecimalUsed(true);
		else
			setDecimalUsed(false);
		if(number === 'Infinity')
			flushStates('Error');
	}, [number])

	return (
		<div className="app">
	        <div className="calculator-body">
	            <nav className="nav">
	                <div className="hamburger">
	                    <a className="hamburger-a"><i className="fas fa-bars"></i></a>
	                </div>
	                <h2 className="h2">Standard</h2>
	                <div className="history-button">
	                    <a className="history-a"><i className="fas fa-history"></i></a>
	                </div>
	            </nav>
	            <div className="result">
	                <pre className="hist">
	                	<span>
	                		{history.map(hist => ' ' + hist)}
	                	</span>
	                </pre>
	                <h1>
	                	{showingResult ? stackNumber : number}
	                </h1>
	            </div>
	            <div className="mbuttons">
	                {
	                	memoryButtons.map(mbutton => {
	                		return (
	                			<button 
	                				key={mbutton.id} 
	                				className='mbutton' 
	                				title={mbutton.title}
	                				>
	                				{mbutton.text}
                				</button>	
                			);
	                	})
                	}
	            </div>
	            <div className="calcbuttons">
	                {
	                	calculatorButtons.map(cbutton => {
	                		return (
	                			<button 
	                				key={cbutton.id} 
	                				className={cbutton.classname || `button`} 
	                				title={cbutton.title}
	                				onClick={()=>handleClick(cbutton.text)}
	                				>
	                				{cbutton.text}
                				</button>	
                			);
	                	})	
                	}
	            </div>
	        </div>
    	</div>	
	);
}

export default Calculator;