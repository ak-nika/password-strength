const passwordInput = document.getElementById("password");
const resultText = document.querySelector("p");
const copy = document.getElementById("copy");
const bar = document.getElementById("bar");
const colors = {
  veryWeak: "#ff6b6b",
  weak: "#ffa726",
  moderate: "#ffd54f",
  strong: "#81c784",
  veryStrong: "#388e3c",
};

copy.disabled = true;

passwordInput.addEventListener("input", (e) => {
  const input = e.target.value;
  const veryWeak = { length: 1, types: 1 };
  const weak = { length: 6, types: 1 };
  const moderate = { length: 8, types: 2 };
  const strong = { length: 10, types: 3 };
  const veryStrong = { length: 12, types: 4 };

  // Initialize score
  let score = 0;

  // Check length of password
  const length = input.length;
  if (length >= veryStrong.length) score += 5;
  else if (length >= strong.length) score += 4;
  else if (length >= moderate.length) score += 3;
  else if (length >= weak.length) score += 2;
  else if (length >= veryWeak.length) score += 1;

  // Check for character types
  const hasLower = /[a-z]/.test(input);
  const hasUpper = /[A-Z]/.test(input);
  const hasNumber = /[0-9]/.test(input);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(input);

  const typesCount = [hasLower, hasUpper, hasNumber, hasSpecial].filter(
    Boolean
  ).length;
  score += typesCount;

  // Determine password strength
  if (score >= 8) {
    bar.style.width = "100%";
    bar.style.backgroundColor = colors.veryStrong;
    resultText.style.color = colors.veryStrong;
    resultText.innerText = "Very Strong";
    copy.disabled = false;
  } else if (score >= 6) {
    bar.style.width = "75%";
    bar.style.backgroundColor = colors.strong;
    resultText.style.color = colors.strong;
    resultText.innerText = "Strong";
    copy.disabled = false;
  } else if (score >= 4) {
    bar.style.width = "50%";
    bar.style.backgroundColor = colors.moderate;
    resultText.style.color = colors.moderate;
    resultText.innerText = "Moderate";
    copy.disabled = false;
  } else if (score >= 3) {
    bar.style.width = "25%";
    bar.style.backgroundColor = colors.weak;
    resultText.style.color = colors.weak;
    resultText.innerText = "Weak";
    copy.disabled = true;
  } else {
    bar.style.width = "10%";
    bar.style.backgroundColor = colors.veryWeak;
    resultText.style.color = colors.veryWeak;
    resultText.innerText = "Very Weak";
    copy.disabled = true;
  }
});

copy.addEventListener("click", () => {
  navigator.clipboard
    .writeText(passwordInput.value)
    .then(
      () =>
        (copy.innerHTML =
          'Copied <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff"><path d="M389-267 195-460l51-52 143 143 325-324 51 51-376 375Z"/></svg>')
    );

  setTimeout(() => {
    copy.innerText = "Copy";
  }, 3000);
});
