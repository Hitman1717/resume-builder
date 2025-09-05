import { useState } from 'react';
import ApiService from '../services/api';

export const useResumeGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const downloadBlob = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const generateResume = async (formData) => {
    setIsGenerating(true);
    try {
      const blob = await ApiService.generateResume(formData);
      downloadBlob(blob, 'resume.pdf');
      alert("Resume downloaded successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error generating resume: " + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const previewResume = async (formData) => {
    setIsPreviewing(true);
    try {
      const blob = await ApiService.previewResume(formData);
      const url = window.URL.createObjectURL(blob);
      setPreviewUrl(url);
      setShowPreview(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Error generating preview: " + error.message);
    } finally {
      setIsPreviewing(false);
    }
  };

  const closePreview = () => {
    setShowPreview(false);
    if (previewUrl) {
      window.URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return {
    isGenerating,
    isPreviewing,
    previewUrl,
    showPreview,
    generateResume,
    previewResume,
    closePreview
  };
};
