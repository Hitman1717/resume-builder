const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyDeVcmvB2hsntlHjfTSg4ZPZd8uY7948wY");

// Helper function to enhance text using Gemini
async function enhanceText(text, type) {
  if (!text || text.trim() === "") return "";
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    let prompt = "";
    switch (type) {
      case "summary":
        prompt = `Rewrite this professional summary to be more impactful and concise. Return only the improved text without any formatting, options, or explanations: "${text}"`;
        break;
      case "experience":
        prompt = `Rewrite this work experience description using strong action verbs and highlighting achievements. Return only bullet points using simple dashes (-), no bold text, no options, no explanations: "${text}"`;
        break;
      case "education":
        prompt = `Improve this education description to be professional and concise. Return only the improved text without formatting or explanations: "${text}"`;
        break;
      case "skills":
        prompt = `Improve this skills list. Return only a clean comma-separated list without explanations or formatting: "${text}"`;
        break;
      case "projects":
        prompt = `Rewrite this project description to highlight technical skills and achievements. Return only the improved description without formatting, options, or explanations: "${text}"`;
        break;
      case "achievements":
        prompt = `Rewrite this achievement description to be more impactful and quantify the accomplishment when possible. Return only the improved description without formatting, options, or explanations: "${text}"`;
        break;
      default:
        prompt = `Improve this text for a professional resume. Return only the improved text without any formatting or explanations: "${text}"`;
    }
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let enhancedText = response.text().trim();
    
    // Sanitize text for LaTeX compatibility
    enhancedText = enhancedText
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold markdown
      .replace(/\*([^*]+)\*/g, '$1')     // Remove italic markdown
      .replace(/#{1,6}\s*/g, '')         // Remove markdown headers
      .replace(/```[^`]*```/g, '')       // Remove code blocks
      .replace(/`([^`]+)`/g, '$1')       // Remove inline code
      .replace(/>\s*/g, '')              // Remove blockquotes
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text only
      .replace(/&/g, '\\&')              // Escape ampersands for LaTeX
      .replace(/%/g, '\\%')              // Escape percent signs for LaTeX
      .replace(/\$/g, '\\$')             // Escape dollar signs for LaTeX
      .replace(/#/g, '\\#')              // Escape hash signs for LaTeX
      .replace(/_/g, '\\_')              // Escape underscores for LaTeX
      .replace(/\^/g, '\\^')             // Escape carets for LaTeX
      .replace(/{/g, '\\{')              // Escape braces for LaTeX
      .replace(/}/g, '\\}')              // Escape braces for LaTeX
      .replace(/~/g, '\\textasciitilde{}') // Escape tildes for LaTeX
      .replace(/\\/g, '\\textbackslash{}') // Escape backslashes for LaTeX
      .trim();
    
    // Return enhanced text if it's valid, otherwise return original
    return enhancedText && enhancedText.length > 0 ? enhancedText : text;
  } catch (error) {
    console.error("Gemini API Error:", error.message || error);
    return text; // Return original text if enhancement fails
  }
}

// Enhance all resume data
async function enhanceResumeData(userData) {
  const enhancedData = {};
  
  if (userData.summary) {
    console.log("Enhancing summary...");
    enhancedData.summary = await enhanceText(userData.summary, "summary");
  }
  
  if (userData.experiences) {
    console.log("Enhancing experiences...");
    enhancedData.experiences = [...userData.experiences];
    for (let i = 0; i < enhancedData.experiences.length; i++) {
      if (enhancedData.experiences[i].description) {
        enhancedData.experiences[i].description = await enhanceText(enhancedData.experiences[i].description, "experience");
      }
    }
  }
  
  if (userData.achievements) {
    console.log("Enhancing achievements...");
    enhancedData.achievements = [...userData.achievements];
    for (let i = 0; i < enhancedData.achievements.length; i++) {
      if (enhancedData.achievements[i].description) {
        enhancedData.achievements[i].description = await enhanceText(enhancedData.achievements[i].description, "achievements");
      }
    }
  }
  
  if (userData.projects) {
    console.log("Enhancing projects...");
    enhancedData.projects = [...userData.projects];
    for (let i = 0; i < enhancedData.projects.length; i++) {
      if (enhancedData.projects[i].description) {
        enhancedData.projects[i].description = await enhanceText(enhancedData.projects[i].description, "projects");
      }
    }
  }
  
  return enhancedData;
}

module.exports = {
  enhanceText,
  enhanceResumeData
};
