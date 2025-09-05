const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { promisify } = require("util");
const execAsync = promisify(exec);
const latexTemplate = require('../templates/latexTemplate');

// Generate PDF from LaTeX template
async function generatePDF(userData, filename = "resume") {
  try {
    const template = latexTemplate.generateLatexTemplate(userData);
    const texFile = path.join(__dirname, "../../temp", `${filename}.tex`);
    const pdfFile = path.join(__dirname, "../../temp", `${filename}.pdf`);
    
    // Ensure temp directory exists
    const tempDir = path.dirname(texFile);
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    // Write LaTeX file
    fs.writeFileSync(texFile, template);
    
    // Generate PDF
    await execAsync(`pdflatex -interaction=nonstopmode ${filename}.tex`, { 
      cwd: path.dirname(texFile) 
    });
    
    // Read PDF buffer
    const pdfBuffer = fs.readFileSync(pdfFile);
    
    // Cleanup files
    const filesToClean = [`${filename}.aux`, `${filename}.log`, `${filename}.tex`, `${filename}.out`];
    filesToClean.forEach(file => {
      const filePath = path.join(tempDir, file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
    
    return pdfBuffer;
  } catch (error) {
    console.error("PDF Generation Error:", error);
    throw new Error("Failed to generate PDF");
  }
}

// Generate resume PDF for download
async function generateResumePDF(userData) {
  return await generatePDF(userData, "resume");
}

// Generate preview PDF
async function generatePreviewPDF(userData) {
  return await generatePDF(userData, "preview");
}

module.exports = {
  generateResumePDF,
  generatePreviewPDF
};
