import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Build Your Professional Resume
              <span className="accent-text"> in Minutes</span>
            </h1>
            <p className="hero-subtitle">
              Create stunning, ATS-friendly resumes with our AI-powered builder. 
              Choose from professional templates and let our smart system optimize your content.
            </p>
            <div className="hero-actions">
              <Link to="/resume-builder" className="cta-button primary">
                Start Building Resume
              </Link>
              <Link to="/templates" className="cta-button secondary">
                View Templates
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="resume-preview-card">
              <div className="preview-header">
                <div className="preview-line long"></div>
                <div className="preview-line medium"></div>
              </div>
              <div className="preview-content">
                <div className="preview-section">
                  <div className="preview-line short"></div>
                  <div className="preview-line medium"></div>
                  <div className="preview-line long"></div>
                </div>
                <div className="preview-section">
                  <div className="preview-line short"></div>
                  <div className="preview-line long"></div>
                  <div className="preview-line medium"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Our Resume Builder?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered Enhancement</h3>
              <p>Our Gemini AI integration helps improve your content, making it more professional and impactful.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Smart Templates</h3>
              <p>Industry-standard resume structures that automatically adapt for freshers vs experienced professionals.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>ATS-Friendly</h3>
              <p>LaTeX-generated PDFs ensure your resume passes through Applicant Tracking Systems successfully.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Real-time Preview</h3>
              <p>See exactly how your resume will look before downloading with our live preview feature.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Create Your Perfect Resume?</h2>
            <p>Join thousands of professionals who have built their careers with our resume builder.</p>
            <Link to="/resume-builder" className="cta-button primary large">
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
