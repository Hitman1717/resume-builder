import { useState } from 'react';

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  github: "",
  linkedin: "",
  website: "",
  summary: "",
  experiences: [{ title: "", company: "", duration: "", startDate: "", endDate: "", description: "" }],
  achievements: [{ title: "", description: "", date: "" }],
  projects: [{ name: "", description: "", link: "" }],
  education: [{ degree: "", institution: "", year: "", gpa: "" }],
  skills: { "Technical Skills": "", "Languages": "", "Tools": "" },
  enhanceWithAI: false
};

export const useResumeForm = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleArrayChange = (section, index, field, value) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][field] = value;
    setFormData({ ...formData, [section]: updatedSection });
  };

  const handleSkillsChange = (category, value) => {
    setFormData({
      ...formData,
      skills: { ...formData.skills, [category]: value }
    });
  };

  const addArrayItem = (section, template) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], template]
    });
  };

  const removeArrayItem = (section, index) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updatedSection });
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const isFormValid = () => {
    return formData.name.trim() !== '' && formData.email.trim() !== '';
  };

  return {
    formData,
    handleChange,
    handleArrayChange,
    handleSkillsChange,
    addArrayItem,
    removeArrayItem,
    resetForm,
    isFormValid
  };
};
