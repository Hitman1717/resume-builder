import React from 'react';

const FormSection = ({ title, children, className = "" }) => {
  return (
    <section className={`form-section ${className}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default FormSection;
