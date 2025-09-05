// Date utility functions for the frontend

export const formatDateForDisplay = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  } catch (error) {
    return dateString;
  }
};

export const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  } catch (error) {
    return dateString;
  }
};

export const generateDurationString = (startDate, endDate, isCurrentPosition = false) => {
  if (!startDate) return '';
  
  const start = formatDateForDisplay(startDate);
  const end = isCurrentPosition || !endDate ? 'Present' : formatDateForDisplay(endDate);
  
  return `${start} - ${end}`;
};

export const calculateDuration = (startDate, endDate) => {
  if (!startDate) return '';
  
  const start = new Date(startDate + '-01');
  const end = endDate ? new Date(endDate + '-01') : new Date();
  
  const diffTime = Math.abs(end - start);
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  
  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;
  
  if (years > 0 && months > 0) {
    return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
  } else if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''}`;
  } else {
    return `${months} month${months > 1 ? 's' : ''}`;
  }
};

export const isValidDateRange = (startDate, endDate) => {
  if (!startDate) return false;
  if (!endDate) return true; // Open-ended is valid
  
  try {
    const start = new Date(startDate + '-01');
    const end = new Date(endDate + '-01');
    return start <= end;
  } catch (error) {
    return false;
  }
};

export const getCurrentMonthYear = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};
