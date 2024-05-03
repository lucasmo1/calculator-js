const display = document.querySelector('.display-content');
const displayOperation = document.querySelector('.operation');
const clearButton = document.getElementById('clear-button');
const deleteButton = document.getElementById('delete-button');
const calcButtons = document.querySelectorAll('.calc-button');
const equalButton = document.querySelector('#equal-button');
const operatorButtons = document.querySelectorAll('.operator-button');

const operators = ['+', '-', 'x', '÷'];

let value1, value2, operator;

// This function controls the addition of content to display, based on some conditions.
function appendToDisplay(input) {
    if (display.textContent == 'impossible operation') {
        display.textContent = '';
    }
    if ((operators.includes(input)) && (display.textContent == 0)) {
        return;
    }
    input && display.textContent == "0" ? display.textContent = '' : ''; 
    input == '.' && display.textContent == 0 ? display.textContent = '0' : '';
    if (input == '.' && display.textContent.includes('.')) {
        return;
    }
    display.textContent += input;
}

function deleteValue() {
    display.textContent = display.textContent.slice(0, -1);
    display.textContent == '' ? display.textContent = '0' : '';
}

function clearDisplay() {
    display.textContent = '0';
    displayOperation.textContent = '';
    value1 = 0;
    value2 = 0;
    operator = '';
}

function equalResult() {
    if ((value1) && (operator)) {
        let result;
        value2 = parseFloat(display.textContent);
        let operation = value1 + operator + value2;

        switch(operator) {
            case '+':
                result = value1+value2;
                break;
            case '-':
                result = value1-value2;
                break;
            case 'x':
                result = value1*value2;
                break;
            case '÷':
                result = value1/value2;
                value2 == 0 ? result = 'impossible operation' : '';
                break;
            default:
                result = parseFloat(display.textContent);
            
        };
        console.table(`valor 1: ${value1}, valor 2: ${value2}, operação: ${operation}, resultado: ${result}`);
        displayOperation.textContent = `${operation}=`;
        display.textContent = result;
        value2 = 0;
        operator = '';
    } else {
        displayOperation.textContent = `${display.textContent}=`;
        value2 = 0;
    }
}

calcButtons.forEach(button => {
    if (button.value) {
        button.addEventListener('click', () => {
            appendToDisplay(button.value)}
        );
    };
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!operator){
            value1 = parseFloat(display.textContent);
            operator = button.value;
            displayOperation.textContent = display.textContent;
            display.textContent = '0';
        };
    }
);
});

clearButton.onclick = clearDisplay;

deleteButton.onclick = deleteValue;

equalButton.onclick = equalResult;
