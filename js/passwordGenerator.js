const lengthInput = document.getElementById("length");
const uppercaseCheckbox = document.getElementById("include-uppercase");
const lowercaseCheckbox = document.getElementById("include-lowercase");
const numbersCheckbox = document.getElementById("include-numbers");
const symbolsCheckbox = document.getElementById("include-symbols");
const generateBtn = document.getElementById("generate-btn");
const passwordOutput = document.getElementById("password-output");
const copyBtn = document.getElementById("copy-btn");

generateBtn.addEventListener("click", () => {
  const length = parseInt(lengthInput.value);
  const includeUpper = uppercaseCheckbox.checked;
  const includeLower = lowercaseCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;
  const includeSymbols = symbolsCheckbox.checked;

  const password = generatePassword(length, includeUpper, includeLower, includeNumbers, includeSymbols);
  passwordOutput.textContent = password;
});

copyBtn.addEventListener("click", () => {
  const password = passwordOutput.textContent;
  if(password && password !== "-") {
    navigator.clipboard.writeText(password);
    alert("password copied to clipboard");
  }
});

function generatePassword(length, upper, lower, numbers, symbols) {
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  let charset = "";
  if(upper) charset += upperChars;
  if(lower) charset += lowerChars;
  if(numbers) charset += numberChars;
  if(symbols) charset += symbolChars;

  if(charset === "") return "";

  // ensure at least one of each selected
  let password = [];
  if(upper) password.push(randomChar(upperChars));
  if(lower) password.push(randomChar(lowerChars));
  if(numbers) password.push(randomChar(numberChars));
  if(symbols) password.push(randomChar(symbolChars));

  while(password.length < length) {
    password.push(randomChar(charset));
  }

  // shuffle to prevent prediction
  password = shuffleArray(password);
  return password.join("");
}

function randomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function shuffleArray(array) {
  for(let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}