// Helper function to format date for display
function formatDate(dateString) {
  if (!dateString) return "";
  try {
    const date = new Date(dateString + "-01"); // Add day for month input
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  } catch (error) {
    return dateString; // Return original if parsing fails
  }
}

// Format duration string from start and end dates
function formatDuration(startDate, endDate) {
  if (!startDate) return "";
  
  const startFormatted = formatDate(startDate);
  const endFormatted = endDate ? formatDate(endDate) : "Present";
  
  return `${startFormatted} - ${endFormatted}`;
}

// Validate date string format
function isValidDate(dateString) {
  if (!dateString) return false;
  try {
    const date = new Date(dateString + "-01");
    return !isNaN(date.getTime());
  } catch (error) {
    return false;
  }
}

module.exports = {
  formatDate,
  formatDuration,
  isValidDate
};
