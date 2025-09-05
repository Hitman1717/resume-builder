import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <header className="page-header">
          <h1>About ResumeBuilder Pro</h1>
          <p>Creating professional resumes with the power of AI</p>
        </header>

        <div className="about-content">
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              We believe everyone deserves a professional, well-formatted resume that showcases their skills 
              and experiences effectively. Our AI-powered resume builder helps job seekers create stunning 
              resumes that pass through Applicant Tracking Systems and impress hiring managers.
            </p>
          </section>

          <section className="about-section">
            <h2>How It Works</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3>Fill Your Information</h3>
                <p>Enter your personal details, experience, education, and skills using our intuitive form.</p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <h3>AI Enhancement</h3>
                <p>Let our Gemini AI improve your content to make it more professional and impactful.</p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <h3>Preview & Download</h3>
                <p>See how your resume looks and download a professionally formatted PDF.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Key Features</h2>
            <div className="features-list">
              <div className="feature-item">
                <h4>🤖 AI-Powered Text Enhancement</h4>
                <p>Our integration with Google's Gemini AI helps improve your resume content.</p>
              </div>
              <div className="feature-item">
                <h4>📱 Smart Resume Structure</h4>
                <p>Automatically detects if you're a fresher and adjusts the resume structure accordingly.</p>
              </div>
              <div className="feature-item">
                <h4>🎯 ATS-Friendly Output</h4>
                <p>LaTeX-generated PDFs ensure compatibility with Applicant Tracking Systems.</p>
              </div>
              <div className="feature-item">
                <h4>📅 Date Management</h4>
                <p>Calendar pickers for precise date entry and professional formatting.</p>
              </div>
              <div className="feature-item">
                <h4>👁️ Real-time Preview</h4>
                <p>See exactly how your resume will look before downloading.</p>
              </div>
              <div className="feature-item">
                <h4>📱 Responsive Design</h4>
                <p>Works seamlessly on desktop, tablet, and mobile devices.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Technology Stack</h2>
            <div className="tech-grid">
              <div className="tech-category">
                <h4>Frontend</h4>
                <ul>
                  <li>React 19</li>
                  <li>React Router</li>
                  <li>Vite</li>
                  <li>Modern CSS</li>
                </ul>
              </div>
              <div className="tech-category">
                <h4>Backend</h4>
                <ul>
                  <li>Node.js</li>
                  <li>Express.js</li>
                  <li>LaTeX Processing</li>
                  <li>RESTful API</li>
                </ul>
              </div>
              <div className="tech-category">
                <h4>AI Integration</h4>
                <ul>
                  <li>Google Gemini AI</li>
                  <li>Text Enhancement</li>
                  <li>Content Optimization</li>
                  <li>Professional Writing</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Contact Us</h2>
            <p>
              Have questions or feedback? We'd love to hear from you! 
              Reach out to us at <a href="mailto:contact@resumebuilder.pro">contact@resumebuilder.pro</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
