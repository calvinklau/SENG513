let computeFlag = false;

window.addEventListener("load", function() {
    initializeBtnListeners();
});

function initializeBtnListeners() {
    let buttons = document.getElementsByTagName("button");
    for (let btn of buttons) {
        btn.onclick = function() {
            processClick(btn.innerText);
        }
    }
}

function processClick(input) {
    let resultElement = document.getElementById("result");
    let historyElement = document.getElementById("history");
    switch (input) {
        case "CE":
            if (resultElement.value[resultElement.value.length - 1] === " ") {
                // Delete operator and associated space chars
                resultElement.value = resultElement.value.substring(0, resultElement.value.length - 3);
            } else if (resultElement.value === "0"){
                // Ignore if input equals 0
                break;
            } else if (resultElement.value.length === 1 || resultElement.value === "Infinity") {
                // Change input to 0 when deleting last character that is not zero
                resultElement.value = "0";
            } else {
                // Delete rightmost character
                resultElement.value = resultElement.value.substring(0, resultElement.value.length - 1);
            }
            break;
        case "=":
            processInput();
            break;
        case ".":
            if (resultElement.value.indexOf(".") !== -1) {
                break;
            } else {
                resultElement.value += input;
            }
            break;
        case "0":
            if (resultElement.value === "0") {
                break;
            } else {
                resultElement.value += input;
            }
            break;
        case "/":
        case "x":
        case "-":
        case "+":
            if (resultElement.value[resultElement.value.length - 1] === " ") {
                if (resultElement.value[resultElement.value.length - 2] === input) {
                    break;
                } else {
                    resultElement.value = resultElement.value.substring(0, resultElement.value.length - 2) + input + " ";
                }
            } else {
                resultElement.value += " " + input + " ";
            }
            break;
        case "(":
        case ")":
            resultElement.value += " " + input + " ";
            break;
        default:
            if (resultElement.value === "0") {
                resultElement.value = input;
            } else if (historyElement.value !== " " && Number(resultElement.value) > 0 &&
                        computeFlag === true) {
                resultElement.value = input;
                computeFlag = false;
            } else {
                resultElement.value += input;
            }
            break;
    }
}

function processInput() {
    let resultElement = document.getElementById("result");
    let historyElement = document.getElementById("history");


    // let processedArray = calculate(resultElement.value);
    let val = calculate(resultElement.value);

    if (val === false) {
        historyElement.innerText = resultElement.value + " =ERROR";
        return;
    } else {
        computeFlag = true;
        historyElement.innerText = resultElement.value + " =";
        resultElement.value = val.toString();
    }
}

function calculate(inputString) {
    let inputArray = inputString.split(" ");

    if (inputArray.length === 1) {
        return inputArray[0];
    }

    let result = 0;
    for (let i=0; i<inputArray.length; i++) {
        if (isNaN(result)) {
            return false;
        }

        switch (inputArray[i]) {
            case "/":
                result = Number(inputArray[i-1]) / Number(inputArray[i+1]);
                break;
            case "x":
                result = Number(inputArray[i-1]) * Number(inputArray[i+1]);
                break;
            case "-":
                result = Number(inputArray[i-1]) - Number(inputArray[i+1]);
                break;
            case "+":
                result = Number(inputArray[i-1]) + Number(inputArray[i+1]);
                break;
        }
    }

    return result;
}
