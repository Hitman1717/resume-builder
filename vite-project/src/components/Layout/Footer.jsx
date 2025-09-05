import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-content">
          <p>&copy; 2024 ResumeBuilder Pro. All rights reserved.</p>
          <div className="footer-links">
            <a href="/privacy" className="footer-link">Privacy Policy</a>
            <a href="/terms" className="footer-link">Terms of Service</a>
            <a href="/contact" className="footer-link">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
