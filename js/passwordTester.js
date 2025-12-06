const passwordInput = document.getElementById("password");
const checkBtn = document.getElementById("check-btn");
const strengthOutput = document.getElementById("strength");
const crackTimeOutput = document.getElementById("crack-time");

checkBtn.addEventListener("click", () => {
  const password = passwordInput.value;
  const entropy = calculateEntropy(password);

  // psword strength display
  if(entropy < 28) {
    strengthOutput.textContent = "very weak";
    strengthOutput.style.color = "red";
  } else if(entropy < 36) {
    strengthOutput.textContent = "weak";
    strengthOutput.style.color = "orange";
  } else if(entropy < 60) {
    strengthOutput.textContent = "okay";
    strengthOutput.style.color = "yellow";
  } else if(entropy < 128) {
    strengthOutput.textContent = "strong";
    strengthOutput.style.color = "green";
  } else {
    strengthOutput.textContent = "very Strong";
    strengthOutput.style.color = "blue";
  }

  crackTimeOutput.textContent = estimateCrackTime(entropy);
});

// ccalc shannon entropy in bits
function calculateEntropy(pw) {
  let pool = 0;
  if(/[a-z]/.test(pw)) pool += 26;
  if(/[A-Z]/.test(pw)) pool += 26;
  if(/[0-9]/.test(pw)) pool += 10;
  if(/[^A-Za-z0-9]/.test(pw)) pool += 32;
  if(pool === 0) return 0;
  return Math.log2(Math.pow(pool, pw.length));
}

// est crack time based on entropy
function estimateCrackTime(entropy) {
  const guessesPerSecond = 1e9; // 1 billion guesses a second
  const totalGuesses = Math.pow(2, entropy);
  let seconds = totalGuesses / guessesPerSecond;

  if(seconds < 60) return "less than a minute";
  if(seconds < 3600) return Math.round(seconds / 60) + " minutes";
  if(seconds < 86400) return Math.round(seconds / 3600) + " hours";
  if(seconds < 31536000) return Math.round(seconds / 86400) + " days";
  return Math.round(seconds / 31536000) + " years";
}