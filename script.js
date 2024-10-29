const passwordInput = document.getElementById("password");
const resultText = document.querySelector("p");
const copy = document.getElementById("copy");
const bar = document.getElementById("bar");
const icon = document.getElementById("icon");
const tooltip = document.getElementById("tooltip");

const colors = {
  veryWeak: "#ff6b6b",
  weak: "#ffa726",
  moderate: "#ffd54f",
  strong: "#81c784",
  veryStrong: "#388e3c",
  default: "#333333",
};

copy.disabled = true;

// List of common weak passwords
const weakPasswords = [
  "password",
  "password123",
  "password1",
  "password12",
  "password1234",
  "password12345",
  "123456",
  "12345678",
  "qwerty",
  "abc123",
  "111111",
  "123123",
  "admin",
  "letmein",
  "welcome",
];

passwordInput.addEventListener("input", (e) => {
  const input = e.target.value;

  // Check if input contains spaces or is a weak password
  if (/\s/.test(input)) {
    resultText.innerText = "No spaces allowed in password";
    resultText.style.color = colors.veryWeak;
    bar.style.width = "10%";
    bar.style.backgroundColor = colors.veryWeak;
    copy.disabled = true;
    return;
  } else if (weakPasswords.includes(input.toLowerCase())) {
    resultText.innerText = "Password too common, please choose another";
    resultText.style.color = colors.veryWeak;
    bar.style.width = "10%";
    bar.style.backgroundColor = colors.veryWeak;
    copy.disabled = true;
    return;
  }

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
  const hasSpecial = /[!@#$%^&*(),.?"'-_+=/~`:{}|<>]/.test(input);

  const typesCount = [hasLower, hasUpper, hasNumber, hasSpecial].filter(
    Boolean
  ).length;
  score += typesCount;

  // Determine password strength
  if (length === 0) {
    resultText.innerText = "Type Password";
    resultText.style.color = colors.default;
    bar.style.width = "0%";
    copy.disabled = true;
  } else if (score >= 8) {
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
    copy.disabled = true;
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

  if (copy.disabled) {
    tooltip.innerText = "Enter a strong password to copy";
  } else {
    tooltip.innerText = "Copy password to clipboard";
  }
});

copy.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordInput.value).then(() => {
    copy.innerHTML =
      'Copied <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff"><path d="M389-267 195-460l51-52 143 143 325-324 51 51-376 375Z"/></svg>';
    tooltip.innerText = "Password copied to clipboard";
  });

  setTimeout(() => {
    copy.innerText = "Copy";
    tooltip.innerText = "Copy password to clipboard";
  }, 3000);
});

icon.addEventListener("click", () => {
  if (passwordInput.type === "text") {
    passwordInput.type = "password";
    icon.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#000"><path d="M263.72-96Q234-96 213-117.15T192-168v-384q0-29.7 21.15-50.85Q234.3-624 264-624h24v-96q0-79.68 56.23-135.84 56.22-56.16 136-56.16Q560-912 616-855.84q56 56.16 56 135.84v96h24q29.7 0 50.85 21.15Q768-581.7 768-552v384q0 29.7-21.16 50.85Q725.68-96 695.96-96H263.72Zm.28-72h432v-384H264v384Zm216.21-120Q510-288 531-309.21t21-51Q552-390 530.79-411t-51-21Q450-432 429-410.79t-21 51Q408-330 429.21-309t51 21ZM360-624h240v-96q0-50-35-85t-85-35q-50 0-85 35t-35 85v96Zm-96 456v-384 384Z"/></svg>';
  } else {
    passwordInput.type = "text";
    icon.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#000"><path d="M264-624h336v-96q0-50-35-85t-85-35q-50 0-85 35t-35 85h-72q0-80 56.23-136 56.22-56 136-56Q560-912 616-855.84q56 56.16 56 135.84v96h24q29.7 0 50.85 21.15Q768-581.7 768-552v384q0 29.7-21.16 50.85Q725.68-96 695.96-96H263.72Q234-96 213-117.15T192-168v-384q0-29.7 21.15-50.85Q234.3-624 264-624Zm0 456h432v-384H264v384Zm216.21-120Q510-288 531-309.21t21-51Q552-390 530.79-411t-51-21Q450-432 429-410.79t-21 51Q408-330 429.21-309t51 21ZM264-168v-384 384Z"/></svg>';
  }
});
