let isDarkTheme;

const setDarkTheme = (newDarkTheme) => {
  console.log(newDarkTheme)
  isDarkTheme = newDarkTheme;
  document.body.classList.toggle("dark", isDarkTheme);
  sessionStorage.setItem("isDarkTheme", isDarkTheme);
}

// initial color scheme
const currentDarkTheme = sessionStorage.getItem("isDarkTheme") === "true";
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
console.log(currentDarkTheme, prefersDark);
setDarkTheme(currentDarkTheme || prefersDark);

// event listener
const btn = document.getElementById("theme");
if (btn) {
  btn.addEventListener("click", () => { setDarkTheme(!isDarkTheme); });
}