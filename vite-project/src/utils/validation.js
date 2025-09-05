import { FORM_VALIDATION } from './constants';

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s|-|\(|\)/g, ''));
};

export const validateUrl = (url) => {
  if (!url) return true; // URL is optional
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`);
    return true;
  } catch {
    return false;
  }
};

export const validateName = (name) => {
  return name && 
         name.length >= FORM_VALIDATION.MIN_NAME_LENGTH && 
         name.length <= FORM_VALIDATION.MAX_NAME_LENGTH;
};

export const validateFormData = (formData) => {
  const errors = {};

  // Required fields
  if (!validateName(formData.name)) {
    errors.name = `Name must be between ${FORM_VALIDATION.MIN_NAME_LENGTH} and ${FORM_VALIDATION.MAX_NAME_LENGTH} characters`;
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Optional fields validation
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (formData.website && !validateUrl(formData.website)) {
    errors.website = 'Please enter a valid website URL';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const sanitizeText = (text) => {
  if (!text) return '';
  return text.trim().replace(/\s+/g, ' ');
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
};
