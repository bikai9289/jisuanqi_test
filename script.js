document.addEventListener('DOMContentLoaded', (event) => {
    let display = document.getElementById('display');
    let currentOperand = '';
    let previousOperand = '';
    let operation = undefined;

    function appendNumber(number) {
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand = currentOperand.toString() + number.toString();
        updateDisplay();
    }

    function chooseOperation(op) {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        operation = op;
        previousOperand = currentOperand;
        currentOperand = '';
        updateDisplay();
    }

    function compute() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        currentOperand = computation;
        operation = undefined;
        previousOperand = '';
        updateDisplay(true);
    }

    function clearDisplay() {
        currentOperand = '';
        previousOperand = '';
        operation = undefined;
        updateDisplay();
    }

    function resetCalculator() {
        currentOperand = '';
        previousOperand = '';
        operation = undefined;
        display.value = '';
    }

    function updateDisplay(isResult = false) {
        if (isResult) {
            display.value = currentOperand;
        } else {
            display.value = previousOperand + (operation || '') + currentOperand;
        }
    }

    // Expose functions to global scope
    window.appendNumber = appendNumber;
    window.chooseOperation = chooseOperation;
    window.compute = compute;
    window.clearDisplay = clearDisplay;
    window.resetCalculator = resetCalculator;
});