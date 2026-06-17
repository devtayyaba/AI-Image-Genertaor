# 🌟 AI Image Generator

This is a clean and responsive web application built using HTML, CSS, and Vanilla JavaScript. It directly connects to the **Hugging Face API** to generate high-quality images based on any text description (prompt) entered by the user.


## 🚀 Features

- **Multiple AI Models:** Choose from different popular AI models like `FLUX.1-dev`, `Stable Diffusion XL`, `Stable Diffusion 3`, and more.
- **Image Count:** Select how many images (from 1 to 4) you want to generate at the same time.
- **Aspect Ratios:** Supports multiple image shapes including Square (1:1), Landscape (16:9), and Portrait (9:16).
- **Dark & Light Mode:** Fully dynamic theme toggle that remembers your preference using browser `localStorage`.
- **One-Click Download:** A handy hover overlay button to instantly download generated images to your device.
- **Random Prompt Generator:** Includes a "Dice" button that gives you pre-made creative prompts if you run out of ideas.

---

## 🔧 How to Use & Setup

1. **Clone or Download the Project:**
   ```bash
   git clone https://github.com/devtayyaba/AI-Image-Generator.git
   
   ```
   


2. **Add Your API Key:**
Open the `script.js` file and replace `"YOUR_API_KEY_HERE"` with your actual Hugging Face API token:
```javascript
   const API_KEY = "your_actual_hugging_face_token_here";

```


3. **Run the Project:**
Simply double-click the `index.html` file to open it in any web browser, or run it using the VS Code Live Server extension.

---

## 🧑‍💻 Author

**Tayyaba Nadeem** *Computer Science Student & Developer* Building practical web applications and exploring AI automation systems.
