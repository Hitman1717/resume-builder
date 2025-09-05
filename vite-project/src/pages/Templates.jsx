import React from 'react';
import { Link } from 'react-router-dom';

const Templates = () => {
  const templates = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Clean, ATS-friendly design perfect for corporate roles',
      features: ['Modern Layout', 'ATS Optimized', 'Professional Fonts'],
      current: true
    },
    {
      id: 'creative',
      name: 'Creative (Coming Soon)',
      description: 'Eye-catching design for creative professionals',
      features: ['Bold Typography', 'Color Accents', 'Visual Elements'],
      current: false
    },
    {
      id: 'minimal',
      name: 'Minimal (Coming Soon)',
      description: 'Simple, elegant design that focuses on content',
      features: ['Clean Lines', 'Minimal Design', 'Easy to Read'],
      current: false
    }
  ];

  return (
    <div className="templates-page">
      <div className="container">
        <header className="page-header">
          <h1>Resume Templates</h1>
          <p>Choose from our collection of professional resume templates</p>
        </header>

        <div className="templates-grid">
          {templates.map((template) => (
            <div key={template.id} className={`template-card ${!template.current ? 'coming-soon' : ''}`}>
              <div className="template-preview">
                <div className="template-mockup">
                  <div className="mockup-header">
                    <div className="mockup-line long"></div>
                    <div className="mockup-line medium"></div>
                  </div>
                  <div className="mockup-content">
                    <div className="mockup-section">
                      <div className="mockup-line short"></div>
                      <div className="mockup-line long"></div>
                      <div className="mockup-line medium"></div>
                    </div>
                    <div className="mockup-section">
                      <div className="mockup-line short"></div>
                      <div className="mockup-line medium"></div>
                      <div className="mockup-line long"></div>
                    </div>
                  </div>
                </div>
                {!template.current && (
                  <div className="coming-soon-overlay">
                    <span>Coming Soon</span>
                  </div>
                )}
              </div>
              
              <div className="template-info">
                <h3>{template.name}</h3>
                <p>{template.description}</p>
                
                <ul className="template-features">
                  {template.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                
                {template.current ? (
                  <Link to="/resume-builder" className="template-button">
                    Use This Template
                  </Link>
                ) : (
                  <button className="template-button disabled" disabled>
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="templates-info">
          <div className="info-card">
            <h2>More Templates Coming Soon!</h2>
            <p>
              We're continuously working on adding new, professionally designed resume templates. 
              Each template is carefully crafted to be ATS-friendly and help you stand out to employers.
            </p>
            <div className="info-features">
              <div className="info-feature">
                <span className="feature-icon">✨</span>
                <span>Professional Design</span>
              </div>
              <div className="info-feature">
                <span className="feature-icon">🎯</span>
                <span>ATS Compatible</span>
              </div>
              <div className="info-feature">
                <span className="feature-icon">📱</span>
                <span>Mobile Optimized</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
