"use strict";

// Get all relevant DOM elements
var input = document.getElementById("input"),
    buttons = document.querySelectorAll(".row div"),
    resultButton = document.getElementById("result"),
    clearButton = document.getElementById("clear");

// Track result display state
var resultDisplayed = false;

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener("click", function(e) {
        var buttonValue = e.target.innerHTML;
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        // Clear button functionality
        if (buttonValue === "C") {
            input.innerHTML = "";
            resultDisplayed = false;
            return;
        }

        // Toggle sign functionality (±)
        if (buttonValue === "±") {
            if (currentString !== "") {
                if (currentString.charAt(0) === "-") {
                    input.innerHTML = currentString.substring(1);
                } else {
                    input.innerHTML = "-" + currentString;
                }
            }
            return;
        }

        // Percentage functionality (%)
        if (buttonValue === "%") {
            if (currentString !== "") {
                input.innerHTML = parseFloat(currentString) / 100;
                resultDisplayed = true;
            }
            return;
        }

        // Equal button functionality
        if (buttonValue === "=") {
            if (currentString === "") return;

            // Convert operator symbols to JS-friendly syntax
            var formattedString = currentString.replace(/×/g, "*").replace(/÷/g, "/");

            try {
                // Evaluate the expression
                input.innerHTML = eval(formattedString);
                resultDisplayed = true;
            } catch (error) {
                input.innerHTML = "Error";
                resultDisplayed = true;
            }
            return;
        }

        // Prevent multiple consecutive operators
        if (["+", "-", "×", "÷"].includes(buttonValue)) {
            if (["+", "-", "×", "÷"].includes(lastChar)) {
                input.innerHTML = currentString.slice(0, -1) + buttonValue;
                return;
            }
        }

        // Reset input if result is displayed and number clicked
        if (resultDisplayed && !["+", "-", "×", "÷"].includes(buttonValue)) {
            input.innerHTML = buttonValue;
            resultDisplayed = false;
            return;
        }

        // Append clicked button value to input
        input.innerHTML += buttonValue;
    });
});
