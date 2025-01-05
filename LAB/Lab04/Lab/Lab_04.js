// TODO3: Implement the handleButtonClick function to handle button clicks
// Log to confirm the file is loaded
console.log("Fighting!");

// Global variables
let currentInput = ""; // Store the current input string
let calculated = false; // Track if the last operation was a calculation

// Handle keyboard input (Todo 1)
function handleKeyDown(event) {
  const key = event.key;

  if (!isNaN(key) || "+-*/().".includes(key)) {
    // Pass numbers and valid operators to the button handler
    handleButtonClick(key);
  } else if (key === "Enter") {
    // Handle the enter key as "="
    handleButtonClick("=");
  } else if (key === "Backspace") {
    // Handle backspace as "C" to clear
    handleButtonClick("C");
  }
}

// Handle button clicks (Todo 3)
function handleButtonClick(value) {
  const screen = document.getElementById("screen");

  if (!screen) {
    console.error("Screen element not found!");
    return;
  }

  if (value === "C") {
    // Clear the input and reset the screen
    currentInput = "";
    screen.value = "0";
    calculated = false; // Reset calculation flag
  } else if (value === "=") {
    // Evaluate the expression
    try {
      const result = eval(currentInput); // Evaluate the math expression
      currentInput = result.toString(); // Update the input with the result
      screen.value = currentInput; // Display the result
      calculated = true; // Set calculation flag to true
    } catch (error) {
      // Handle invalid expressions
      screen.value = "Error";
      currentInput = "";
      calculated = false; // Reset calculation flag
    }
  } else {
    // If calculation was done, clear the screen for new input (number keys)
    if (calculated && !isNaN(value)) {
      currentInput = ""; // Clear the previous result if a number is pressed
      screen.value = "0"; // Reset the screen display
      calculated = false; // Reset calculation flag
    }
    if (calculated && ["(", ")"].includes(value)) {
      currentInput = ""; // Clear the previous result if a number is pressed
      if (["("].includes(value))
        screen.value = "("; // Reset the screen display
      else screen.value = "0";
      calculated = false; // Reset calculation flag
    }

    // Handle case for numbers and operators
    if (value === "." && currentInput.endsWith(".")) {
      // Prevent multiple decimal points
      return;
    }

    if (value === "0") {
      // Prevent multiple leading zeros
      if (
        currentInput.endsWith("0") &&
        !currentInput.includes("+") &&
        !currentInput.includes("-") &&
        !currentInput.includes("*") &&
        !currentInput.includes("/") &&
        !currentInput.includes("(") &&
        !currentInput.includes(".")
      ) {
        return; // Do nothing if multiple zeros are added
      }
    }

    // Handle operator after number
    if (["+", "-", "*", "/"].includes(value)) {
      if (currentInput === "" || currentInput.endsWith("+") || currentInput.endsWith("-") || currentInput.endsWith("*") || currentInput.endsWith("/")) {
        return; // Prevent consecutive operators
      }
    }

    // Append numbers or operators to the input
    if (screen.value === "0" && !isNaN(value)) {
      // Replace "0" if the first input is a number
      currentInput = value;
    } else {
      // Otherwise, concatenate the value
      currentInput += value;
    }

    // Handle "0" at the end of the input, replacing it with new number
    if (currentInput.endsWith("0") && !isNaN(value)) {
      currentInput = currentInput.slice(0, -1) + value; // Replace last "0" with new digit
    }

    // Validate input format
    currentInput = sanitizeInput(currentInput);

    screen.value = currentInput; // Update the screen
  }
}

// Function to sanitize input
function sanitizeInput(input) {
  // Remove leading zeros from each number segment
  return input.replace(/(^|[+\-*/(])0+(?=\d)/g, "$1");
}

