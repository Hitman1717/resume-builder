const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle non-JSON responses (like PDFs)
      if (options.responseType === 'blob') {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.blob();
      }

      // Handle JSON responses
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || `HTTP error! status: ${response.status}`);
      }

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Resume API methods
  async generateResume(resumeData) {
    return this.request('/api/resume/generate', {
      method: 'POST',
      body: JSON.stringify(resumeData),
      responseType: 'blob'
    });
  }

  async previewResume(resumeData) {
    return this.request('/api/resume/preview', {
      method: 'POST',
      body: JSON.stringify(resumeData),
      responseType: 'blob'
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new ApiService();
