const themeToggle = document.querySelector(".theme-toggle");
const promptBtn = document.querySelector(".prompt-btn");
const promptInput = document.querySelector(".prompt-input");
const promptForm = document.querySelector(".prompt-form");
const generateBtn = document.querySelector(".gen-btn");
const modalSelected = document.querySelector("#model-select");
const countSelected = document.querySelector("#count-select");
const ratioSelected = document.querySelector("#ratio-select");
const galleryGrid = document.querySelector(".gallery-grid");

const API_KEY = "YOUR_API_KEY_HERE"; //Hugging Face API KEY

const examplePrompts = [
  "A futuristic city floating above the clouds with neon bridges",
  "A cozy cabin in snowy mountains glowing with warm lights",
  "A galaxy inside a glass jar held by a child",
  "A warrior riding a glowing wolf under the northern lights",
  "An ancient temple hidden inside a giant tree",
  "A surreal desert with giant melting clocks and glowing cacti",
  "A pirate ship sailing across a sea of stars",
  "A peaceful village with windmills surrounded by tulip fields",
  "A crystal dragon flying above an enchanted castle",
  "An astronaut discovering a glowing cave on an alien planet",
  "A magical coffee shop in the middle of a rainy street",
  "A futuristic samurai standing in a neon-lit alley",
  "A desert oasis with floating islands and waterfalls",
  "A mechanical bird soaring across a cyberpunk skyline",
  "A fairytale bridge leading into a glowing enchanted forest"
];

// 1. On page load, check localStorage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-theme");
}

const getImageDimensions = (aspectRatio, baseSize = 512) => {
  const [width, height] = aspectRatio.split("/").map(Number);
  const scaleFactor = baseSize / Math.sqrt(width * height);

  let calculatedWidth = Math.round(width * scaleFactor);
  let calculatedHeight = Math.round(height * scaleFactor);

  // Ensure dimensions are multiples of 16
  calculatedWidth = Math.floor(calculatedWidth / 16) * 16;
  calculatedHeight = Math.floor(calculatedHeight / 16) * 16;

  return { width: calculatedWidth, height: calculatedHeight };
};

const updateToImage = (imgIdx, imgUrl) => {
  const imgCard = document.getElementById(`img-card-${imgIdx}`);
  if (!imgCard) return;

  imgCard.classList.remove("loading");
  imgCard.innerHTML = ` <img
                src="${imgUrl}"
                alt="gallery img"
                class="result-img"
              />
              <div class="img-overlay">
                <a href="${imgUrl}" class="img-download-btn" download="${Date.now()}.png">
                  <i class="fa-solid fa-download"></i>
                </a>
              </div>`;
};

const generateImages = async (
  selectedModal,
  selectedImageCount,
  selectedRatio,
  promptText
) => {
  const MODAL_URL = `https://api-inference.huggingface.co/models/${selectedModal}`;

  const { width, height } = getImageDimensions(selectedRatio);

  generateBtn.setAttribute("disabled", "true");
  const imagePromises = Array.from(
    { length: selectedImageCount },
    async (_, i) => {
      try {
        const response = await fetch(MODAL_URL, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            "x-use-cache": "false",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: promptText,
            parameters: { width, height },
          }),
        });

        if (!response.ok) {
          const errorText = await response.text(); // fallback to text
          throw new Error(errorText);
        }
        const result = await response.blob();
        console.log(result);
        updateToImage(i, URL.createObjectURL(result));
      } catch (error) {
        const imgCard = document.getElementById(`img-card-${i}`);
        imgCard.classList.replace("loading", "error");
        imgCard.querySelector(".status-text").textContent =
          "Generation Failed! Inspect console for more details.";
      }
    }
  );

  await Promise.allSettled(imagePromises);
  generateBtn.removeAttributeAttribute("disabled");
};

const createImageCard = (
  selectedModal,
  selectedImageCount,
  selectedRatio,
  promptText
) => {
  galleryGrid.innerHTML = "";
  for (let i = 0; i < selectedImageCount; i++) {
    galleryGrid.innerHTML += `  <div class="img-card loading" id="img-card-${i}" style="aspect-ratio: ${selectedRatio}">
              <div class="status-container">
                <div class="spinner"></div>
                <i class="fa-solid fa-triangle-exclamation"></i>
                <p class="status-text">Generating...</p>
              </div>
            </div>`;
  }
  generateImages(selectedModal, selectedImageCount, selectedRatio, promptText);
};

const handleForm = (e) => {
  e.preventDefault();

  const selectedModal = modalSelected.value;
  const selectedImageCount = parseInt(countSelected.value) || 1;
  const selectedRatio = ratioSelected.value || "1/1";
  const promptText = promptInput.value.trim();
  createImageCard(selectedModal, selectedImageCount, selectedRatio, promptText);
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
