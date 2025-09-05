const resumeService = require('../services/resumeService');
const aiService = require('../services/aiService');
const { formatDate } = require('../utils/dateUtils');

const generateResume = async (req, res) => {
  try {
    const userData = req.body;

    // Enhance text fields using Gemini if requested
    if (userData.enhanceWithAI) {
      console.log("AI Enhancement requested...");
      
      try {
        const enhancedData = await aiService.enhanceResumeData(userData);
        Object.assign(userData, enhancedData);
        console.log("AI Enhancement completed successfully");
      } catch (error) {
        console.error("AI Enhancement failed, proceeding with original text:", error.message);
        // Continue with original text
      }
    }

    // Generate and send PDF
    const pdfBuffer = await resumeService.generateResumePDF(userData);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
    res.send(pdfBuffer);

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).send("Error generating resume");
  }
};

const previewResume = async (req, res) => {
  try {
    const userData = req.body;

    // Enhance text fields using Gemini if requested
    if (userData.enhanceWithAI) {
      console.log("AI Enhancement requested for preview...");
      
      try {
        const enhancedData = await aiService.enhanceResumeData(userData);
        Object.assign(userData, enhancedData);
        console.log("AI Enhancement completed successfully");
      } catch (error) {
        console.error("AI Enhancement failed, proceeding with original text:", error.message);
        // Continue with original text
      }
    }

    // Generate and send PDF for preview
    const pdfBuffer = await resumeService.generatePreviewPDF(userData);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="resume-preview.pdf"');
    res.send(pdfBuffer);

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).send("Error generating preview");
  }
};

module.exports = {
  generateResume,
  previewResume
};
