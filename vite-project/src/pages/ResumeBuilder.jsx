import React from 'react';
import { useResumeForm } from '../hooks/useResumeForm';
import { useResumeGeneration } from '../hooks/useResumeGeneration';
import FormSection from '../components/ResumeBuilder/FormSection';
import PreviewModal from '../components/ResumeBuilder/PreviewModal';

const ResumeBuilder = () => {
  const {
    formData,
    handleChange,
    handleArrayChange,
    handleSkillsChange,
    addArrayItem,
    removeArrayItem,
    isFormValid
  } = useResumeForm();

  const {
    isGenerating,
    isPreviewing,
    previewUrl,
    showPreview,
    generateResume,
    previewResume,
    closePreview
  } = useResumeGeneration();

  const handlePreview = () => {
    if (isFormValid()) {
      previewResume(formData);
    } else {
      alert("Please fill in your name and email to preview the resume.");
    }
  };

  const handleGenerate = () => {
    if (isFormValid()) {
      generateResume(formData);
    } else {
      alert("Please fill in your name and email to generate the resume.");
    }
  };

  return (
    <div className="resume-builder">
      <div className="container">
        <header className="page-header">
          <h1>Professional Resume Builder</h1>
          <p>Create a beautiful, professional resume with AI-powered text enhancement</p>
        </header>

        <form className="resume-form">
          {/* Personal Information */}
          <FormSection title="Personal Information">
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  name="email"
                  type="email"
                  placeholder="john.doe@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  name="phone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>GitHub Username</label>
                <input
                  name="github"
                  placeholder="username"
                  value={formData.github}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>LinkedIn Username</label>
                <input
                  name="linkedin"
                  placeholder="username"
                  value={formData.linkedin}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Website</label>
                <input
                  name="website"
                  placeholder="yourwebsite.com"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>
            </div>
          </FormSection>

          {/* Professional Summary */}
          <FormSection title="Professional Summary">
            <div className="form-group">
              <label>Summary</label>
              <textarea
                name="summary"
                placeholder="Brief professional summary highlighting your key skills and experience..."
                value={formData.summary}
                onChange={handleChange}
                rows={4}
              />
            </div>
          </FormSection>

          {/* Work Experience */}
          <FormSection title="Work Experience">
            {formData.experiences.map((exp, index) => (
              <div key={index} className="array-item">
                <div className="array-header">
                  <h3>Experience {index + 1}</h3>
                  {formData.experiences.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("experiences", index)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Job Title</label>
                    <input
                      placeholder="Software Engineer"
                      value={exp.title}
                      onChange={(e) => handleArrayChange("experiences", index, "title", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Company</label>
                    <input
                      placeholder="Tech Company Inc."
                      value={exp.company}
                      onChange={(e) => handleArrayChange("experiences", index, "company", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="month"
                      value={exp.startDate || ""}
                      onChange={(e) => {
                        handleArrayChange("experiences", index, "startDate", e.target.value);
                        // Auto-generate duration string
                        const endDate = exp.endDate || "Present";
                        const duration = endDate === "Present" ? 
                          `${e.target.value} - Present` : 
                          `${e.target.value} - ${endDate}`;
                        handleArrayChange("experiences", index, "duration", duration);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <div className="date-input-group">
                      <input
                        type="month"
                        value={exp.endDate || ""}
                        onChange={(e) => {
                          handleArrayChange("experiences", index, "endDate", e.target.value);
                          const startDate = exp.startDate || "";
                          const duration = e.target.value ? 
                            `${startDate} - ${e.target.value}` : 
                            `${startDate} - Present`;
                          handleArrayChange("experiences", index, "duration", duration);
                        }}
                      />
                      <label className="checkbox-inline">
                        <input
                          type="checkbox"
                          checked={!exp.endDate || exp.endDate === ""}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleArrayChange("experiences", index, "endDate", "");
                              const startDate = exp.startDate || "";
                              handleArrayChange("experiences", index, "duration", `${startDate} - Present`);
                            }
                          }}
                        />
                        Currently working here
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Describe your responsibilities and achievements..."
                    value={exp.description}
                    onChange={(e) => handleArrayChange("experiences", index, "description", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("experiences", { title: "", company: "", duration: "", startDate: "", endDate: "", description: "" })}
              className="add-btn"
            >
              Add Experience
            </button>
          </FormSection>

          {/* Projects */}
          <FormSection title="Projects">
            {formData.projects.map((project, index) => (
              <div key={index} className="array-item">
                <div className="array-header">
                  <h3>Project {index + 1}</h3>
                  {formData.projects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("projects", index)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Project Name</label>
                    <input
                      placeholder="E-commerce Platform"
                      value={project.name}
                      onChange={(e) => handleArrayChange("projects", index, "name", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Link (optional)</label>
                    <input
                      placeholder="https://github.com/username/project"
                      value={project.link}
                      onChange={(e) => handleArrayChange("projects", index, "link", e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Describe the project, technologies used, and your role..."
                    value={project.description}
                    onChange={(e) => handleArrayChange("projects", index, "description", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("projects", { name: "", description: "", link: "" })}
              className="add-btn"
            >
              Add Project
            </button>
          </FormSection>

          {/* Achievements */}
          <FormSection title="Achievements">
            {formData.achievements.map((achievement, index) => (
              <div key={index} className="array-item">
                <div className="array-header">
                  <h3>Achievement {index + 1}</h3>
                  {formData.achievements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("achievements", index)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Achievement Title</label>
                    <input
                      placeholder="First Place in Hackathon"
                      value={achievement.title}
                      onChange={(e) => handleArrayChange("achievements", index, "title", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Date (optional)</label>
                    <input
                      type="month"
                      value={achievement.date}
                      onChange={(e) => handleArrayChange("achievements", index, "date", e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Describe your achievement and its impact..."
                    value={achievement.description}
                    onChange={(e) => handleArrayChange("achievements", index, "description", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("achievements", { title: "", description: "", date: "" })}
              className="add-btn"
            >
              Add Achievement
            </button>
          </FormSection>

          {/* Education */}
          <FormSection title="Education">
            {formData.education.map((edu, index) => (
              <div key={index} className="array-item">
                <div className="array-header">
                  <h3>Education {index + 1}</h3>
                  {formData.education.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("education", index)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Degree</label>
                    <input
                      placeholder="Bachelor of Science in Computer Science"
                      value={edu.degree}
                      onChange={(e) => handleArrayChange("education", index, "degree", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Institution</label>
                    <input
                      placeholder="University of Technology"
                      value={edu.institution}
                      onChange={(e) => handleArrayChange("education", index, "institution", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Graduation Year</label>
                    <input
                      type="month"
                      value={edu.year}
                      onChange={(e) => handleArrayChange("education", index, "year", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>GPA (optional)</label>
                    <input
                      placeholder="3.8/4.0"
                      value={edu.gpa}
                      onChange={(e) => handleArrayChange("education", index, "gpa", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("education", { degree: "", institution: "", year: "", gpa: "" })}
              className="add-btn"
            >
              Add Education
            </button>
          </FormSection>

          {/* Skills */}
          <FormSection title="Skills">
            {Object.entries(formData.skills).map(([category, skills]) => (
              <div key={category} className="form-group">
                <label>{category}</label>
                <input
                  placeholder="JavaScript, React, Node.js, Python..."
                  value={skills}
                  onChange={(e) => handleSkillsChange(category, e.target.value)}
                />
              </div>
            ))}
          </FormSection>

          {/* AI Enhancement */}
          <FormSection title="AI Enhancement">
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="enhanceWithAI"
                  checked={formData.enhanceWithAI}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Enhance text with AI (Gemini API)
              </label>
              <p className="helper-text">
                Automatically improve your text descriptions to make them more professional and impactful.
              </p>
            </div>
          </FormSection>

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="button"
              onClick={handlePreview}
              disabled={isPreviewing || isGenerating || !isFormValid()}
              className="preview-btn"
            >
              {isPreviewing ? "Generating Preview..." : "Preview Resume"}
            </button>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || isPreviewing || !isFormValid()}
              className="generate-btn"
            >
              {isGenerating ? "Generating Resume..." : "Generate & Download PDF"}
            </button>
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        showPreview={showPreview}
        previewUrl={previewUrl}
        onClose={closePreview}
        onDownload={handleGenerate}
        isGenerating={isGenerating}
      />
    </div>
  );
};

export default ResumeBuilder;
