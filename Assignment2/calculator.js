window.addEventListener("load", function() {
    initializeBtnListeners();
    initializeClearListener();
});

function initializeBtnListeners() {
    let buttons = document.getElementsByTagName("button");
    for (let btn of buttons) {
        btn.onclick = function() {
            processClick(btn.innerText);
        }
    }
}

function initializeClearListener() {
    // resultString.addEventListener("ValueChange")
}

function processClick(input) {
    let resultElement = document.getElementById("result");
    switch (input) {
        case "C":
            if (resultElement.value === "0") {
                break;
            } else {
                resultElement.value = "0";
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
            resultElement.value += " " + input + " ";
            break;
        default:
            if (resultElement.value === "0") {
                resultElement.value = input;
            } else {
                resultElement.value += input;
            }

            if (input !== "C" && resultElement.value.length > 1) {
                document.getElementById("clear").innerText = "CE";
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
