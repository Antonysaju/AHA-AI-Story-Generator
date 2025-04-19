import { GoogleGenerativeAI } from "@google/generative-ai";

// Gemini API key
const GEMINI_API_KEY = "AIzaSyDQpHCDcP8wQEBUsIiGlGYuhAOrWrvbJ9s";

// Unsplash API access key
const UNSPLASH_ACCESS_KEY = "vt_tQacVvuZk_raty1o_WXoQxNmU7EStKB_T2ifwR70";

const generateStoryBtn = document.getElementById("generate-story-btn");
generateStoryBtn.addEventListener("click", generateStory);

const storyInput = document.getElementById("story-input");
storyInput.addEventListener("focus", handleTextAreaFocus);
storyInput.addEventListener("blur", handleTextAreaBlur);

async function generateStory() {
  const storyInput = document.getElementById("story-input").value;
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Show spinner while generating story
  const spinner = document.getElementById("spinner");
  spinner.style.display = "flex";

  try {
    const result = await model.generateContent(storyInput);
    const response = await result.response;
    let story = await response.text();

    // Remove asterisks and format response text
    story = story.replace(/\*/g, "");
    story = story.replace(/\s(?=\w)/g, " ");
    story = story.replace(/(?:\r\n|\r|\n)/g, "<br />");

    displayStory(story);
  } catch (error) {
    console.error("Error generating story:", error);
    displayError("Sorry, I am having trouble generating the story.");
  } finally {
    // Hide spinner after generating story
    spinner.style.display = "none";
  }
}

function displayStory(story) {
  const generatedContent = document.getElementById("generated-content");
  generatedContent.innerHTML = `<p>${story}</p><hr />`;
}

function displayError(message) {
  const generatedContent = document.getElementById("generated-content");
  generatedContent.innerHTML = `<p class="error">${message}</p>`;
}

function handleTextAreaFocus() {
  const storyInput = document.getElementById("story-input");
  storyInput.style.borderColor = "purple";
  storyInput.style.height = "120px";
}

function handleTextAreaBlur() {
  const storyInput = document.getElementById("story-input");
  storyInput.style.borderColor = "";
  storyInput.style.height = "";
}