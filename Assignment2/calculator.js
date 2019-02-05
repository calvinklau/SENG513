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
    switch (input) {
        case "CE":
            if (resultElement.value[resultElement.value.length - 1] === " ") {
                // Delete operator and associated space chars
                resultElement.value = resultElement.value.substring(0, resultElement.value.length - 3);
            } else if (resultElement.value === "0"){
                // Ignore if input equals 0
                break;
            } else if (resultElement.value.length === 1) {
                // Change input to 0 when deleting last character that is not zero
                resultElement.value = "0";
            } else {
                // Delete rightmost character
                resultElement.value = resultElement.value.substring(0, resultElement.value.length - 1);
            }
            break;
        case "=":
            calculate();
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
        default:
            if (resultElement.value === "0") {
                resultElement.value = input;
            } else {
                resultElement.value += input;
            }
            break;
    }
}

function calculate() {
    let resultElement = document.getElementById("result");
    let historyElement = document.getElementById("history");


    let inputArray = resultElement.value.split(" ");
    console.log (inputArray);

    historyElement.innerText = resultElement.value;
    resultElement.value = "0";
}
