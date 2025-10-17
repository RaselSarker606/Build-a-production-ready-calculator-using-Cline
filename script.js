const resultInput = document.getElementById('result');

function insert(char) {
    // Prevent multiple operators in a row
    const lastChar = resultInput.value.slice(-1);
    const operators = ['+', '-', '*', '/'];
    if (operators.includes(lastChar) && operators.includes(char)) {
        return;
    }
    // Prevent leading operator
    if (resultInput.value === '' && operators.includes(char)) {
        if (char === '-' || char === '+') {
             resultInput.value += char;
        }
        return;
    }
    resultInput.value += char;
}

function clearScreen() {
    resultInput.value = '';
}

function deleteLast() {
    resultInput.value = resultInput.value.slice(0, -1);
}

function calculate() {
    const expression = resultInput.value;
    if (!expression) {
        return;
    }

    try {
        // A safer way to evaluate expressions than eval()
        const calculateResult = new Function('return ' + expression);
        const result = calculateResult();

        if (isNaN(result) || !isFinite(result)) {
            resultInput.value = 'Error';
        } else {
            resultInput.value = result;
        }
    } catch (error) {
        resultInput.value = 'Error';
    }
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        insert(key);
    } else if (key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
        insert(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault(); // prevent form submission
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key.toLowerCase() === 'c') {
        clearScreen();
    }
});
