import React from 'react';

const PreviewModal = ({ showPreview, previewUrl, onClose, onDownload, isGenerating }) => {
  if (!showPreview) return null;

  return (
    <div className="preview-modal">
      <div className="preview-content">
        <div className="preview-header">
          <h2>Resume Preview</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        <div className="preview-iframe-container">
          {previewUrl && (
            <iframe
              src={previewUrl}
              width="100%"
              height="600px"
              title="Resume Preview"
              className="preview-iframe"
            />
          )}
        </div>
        <div className="preview-actions">
          <button onClick={onClose} className="close-preview-btn">
            Close Preview
          </button>
          <button 
            onClick={onDownload} 
            className="download-from-preview-btn" 
            disabled={isGenerating}
          >
            {isGenerating ? "Downloading..." : "Download PDF"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
