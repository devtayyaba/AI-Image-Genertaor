// const themeToggle = document.querySelector(".theme-toggle");

// (() => {
//   const savedTheme = localStorage.getItem("theme");
//   const systemPreferDark = window.matchMedia(
//     "(prefers-color-scheme: dark)"
//   ).matches;

//   const isDarkTheme =
//     savedTheme === "dark" || (!savedTheme && systemPreferDark);
//   document.body.classList.toggle("dark-theme", isDarkTheme);
//   themeToggle.querySelector("i").className = isDarkTheme
//     ? "fa solid fa-sun"
//     : "fa solid fa-moon";
// })();
// //Switch between dark and light themes
// const toggleTheme = () => {
//   // isDarkTheme returns true if adds it otherwise false
//   const isDarkTheme = document.body.classList.toggle("dark-theme");
//   localStorage.setItem("theme", isDarkTheme ? "dark" : "light");++
//   themeToggle.querySelector("i").className = isDarkTheme //removes the exsisting classes and add these one
//     ? "fa solid fa-sun" //true
//     : "fa solid fa-moon"; //false
// };

// themeToggle.addEventListener("click", toggleTheme);

const themeToggle = document.querySelector(".theme-toggle");
const promptBtn = document.querySelector(".prompt-btn");
const promptInput = document.querySelector(".prompt-input");
const promptForm = document.querySelector(".prompt-form");
const modalSelected = document.querySelector("#model-select");
const countSelected = document.querySelector("#count-select");
const ratioSelected = document.querySelector("#ratio-select");

const examplePrompts = [
  "A magic forest with glowing plants and fairy homes among giant mushrooms",
  "An old steampunk airship floating through golden clouds at sunset",
  "A future Mars colony with glass domes and gardens against red mountains",
  "A dragon sleeping on gold coins in a crystal cave",
  "An underwater kingdom with merpeople and glowing coral buildings",
  "A floating island with waterfalls pouring into clouds below",
  "A witch's cottage in fall with magic herbs in the garden",
  "A robot painting in a sunny studio with art supplies around it",
  "A magical library with floating glowing books and spiral staircases",
  "A Japanese shrine during cherry blossom season with lanterns and misty mountains",
  "A cosmic beach with glowing sand and an aurora in the night sky",
  "A medieval marketplace with colorful tents and street performers",
  "A cyberpunk city with neon signs and flying cars at night",
  "A peaceful bamboo forest with a hidden ancient temple",
  "A giant turtle carrying a village on its back in the ocean",
];
// 1. On page load, check localStorage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-theme");
}

const handleForm = (e) => {
  e.preventDefault();
};

// 2. On click, add dark theme + save to localStorage
themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

promptBtn.addEventListener("click", () => {
  const prompt =
    examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
  promptInput.value = prompt;
  promptInput.focus();
});
promptForm.addEventListener("submit", handleForm);
