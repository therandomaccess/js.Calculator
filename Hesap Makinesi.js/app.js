const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayvalue = '0';
let firstvalue = null;
let operator = null;
let waitingsecondvalue = false;

updatedisplay();
function updatedisplay() {
    display.value = displayvalue;
}


keys.addEventListener("click", function (e) {
    const element = e.target;

    if (!element.matches('button'))
        return;
    if (element.classList.contains('operator')) {
        handleoperator(element.value);
        updatedisplay();    

        return;
    }
    if (element.classList.contains('decimal')) {
        inputdecimal();
        updatedisplay();
        return;
    }
    if (element.classList.contains('clear')) {

        clear();
        updatedisplay();
        return;
    }
    inputnumber(element.value);
    updatedisplay();


})

function inputnumber(num) {
    if (waitingsecondvalue) {
        displayvalue = num;
        waitingsecondvalue = false;
    }
    else {
        displayvalue = displayvalue === '0' ? num : displayvalue + num;

    }
}
function inputdecimal() {
    if (!displayvalue.includes('.')) {
        displayvalue += '.';

    }
}
function clear() {
    displayvalue = '0';
}

function handleoperator(nextoperator) {
    const value = parseFloat(displayvalue);
    if (waitingsecondvalue && operator) 
    {
        operator=nextoperator;
        return;
    }  
    if (firstvalue === null) {
        firstvalue = value;

    }
    else if (operator) {
        const result = calculate(firstvalue, value,operator);
        displayvalue = String(result);
        firstvalue = result;


    }
    waitingsecondvalue = true
    operator = nextoperator;
}
function calculate(first, second, operator) {
    if (operator === '+') {
        return first + second;
    } else if (operator === '-') {
        return first - second;
    } else if (operator === '*') {
        return first * second
    } else if (operator === '/') {
        return first / second;
    }

    return second;
}