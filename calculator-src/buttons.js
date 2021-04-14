import React from 'react';

export const memoryButtons = [
	{
		id:1,
		title: 'Clear all memory',
		text: 'MC'
	},
	{
		id:2,
		title: 'Memory recall',
		text: 'MR'
	},
	{
		id:3,
		title: 'Memory add',
		text: 'M+'
	},
	{
		id:4,
		title: 'Memory subtract',
		text: 'M-'
	},
	{
		id:5,
		title: 'Memory store',
		text: 'MS'
	},
	{
		id:6,
		title: 'Memory',
		text: 'M'
	},
]

export const calculatorButtons = [
	{
		id:1,
		title: 'Percentage',
		text: '%',
	},
	{
		id:2,
		title: 'Clear Everything',
		text: 'CE',
	},
	{
		id:3,
		title: 'Clear',
		text: 'C',
	},
	{
		id:4,
		title: 'Backspace',
		text: <i className="fas fa-backspace"></i>,
	},	
	{
		id:5,
		title: 'Divide by x',
		text: '1/x',
	},
	{
		id:6,
		title: 'Square of x',
		text: 'x²',
	},
	{
		id:7,
		title: 'Root of x',
		text: '√',
	},
	{
		id:8,
		title: 'Divide',
		text: '÷',
	},
	{
		id:9,
		title: 'Seven',
		text: '7',
		classname: 'button numpad',
	},
	{
		id:10,
		title: 'Eight',
		text: '8',
		classname: 'button numpad',
	},
	{
		id:11,
		title: 'Nine',
		text: '9',
		classname: 'button numpad',
	},
	{
		id:12,
		title: 'Multiply',
		text: 'x',
	},
	{
		id:13,
		title: 'Four',
		text: '4',
		classname: 'button numpad',
	},
	{
		id:14,
		title: 'Five',
		text: '5',
		classname: 'button numpad',
	},
	{
		id:15,
		title: 'Six',
		text: '6',
		classname: 'button numpad',
	},
	{
		id:16,
		title: 'Subtract',
		text: '-',
	},
	{
		id:17,
		title: 'One',
		text: '1',
		classname: 'button numpad',
	},
	{
		id:18,
		title: 'Two',
		text: '2',
		classname: 'button numpad',
	},
	{
		id:19,
		title: 'Three',
		text: '3',
		classname: 'button numpad',
	},
	{
		id:20,
		title: 'Add',
		text: '+',
	},
	{
		id:21,
		title: 'PlusMinus',
		text: '+/-',
		classname: 'button numpad',
	},
	{
		id:22,
		title: 'Zero',
		text: '0',
		classname: 'button numpad',
	},
	{
		id:23,
		title: 'Decimal',
		text: '.',
		classname: 'button numpad',
	},
	{
		id:24,
		title: 'Equal',
		text: '=',
		classname: 'button equals',
	},
]

export const isOperator = (character) => {
	return (
		character === '+' ||
		character === '-' ||
		character === 'x' ||
		character === '÷' ||
		character === '=' 
	);
}

export const isFunction = (character) => {
	return (
		character === '1/x' ||
		character === 'x²' ||
		character === '√'
	);
}