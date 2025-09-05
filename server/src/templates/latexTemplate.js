const { formatDate } = require('../utils/dateUtils');

// Helper function to generate LaTeX template
function generateLatexTemplate(userData) {
  const {
    name = "",
    email = "",
    phone = "",
    github = "",
    linkedin = "",
    website = "",
    summary = "",
    experiences = [],
    projects = [],
    education = [],
    skills = {},
    achievements = []
  } = userData;

  let template = `%-----------------------------------------------------------------------------------------------------------------------------------------------%
%	The MIT License (MIT)
%
%	Copyright (c) 2021 Jitin Nair
%
%	Permission is hereby granted, free of charge, to any person obtaining a copy
%	of this software and associated documentation files (the "Software"), to deal
%	in the Software without restriction, including without limitation the rights
%	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
%	copies of the Software, and to permit persons to whom the Software is
%	furnished to do so, subject to the following conditions:
%	
%	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
%	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
%	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
%	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
%	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
%	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
%	THE SOFTWARE.
%	
%
%-----------------------------------------------------------------------------------------------------------------------------------------------%

%----------------------------------------------------------------------------------------
%	DOCUMENT DEFINITION
%----------------------------------------------------------------------------------------

% article class because we want to fully customize the page and not use a cv template
\\documentclass[a4paper,12pt]{article}

%----------------------------------------------------------------------------------------
%	PACKAGES
%----------------------------------------------------------------------------------------
\\usepackage{url}
\\usepackage{parskip} 	

%other packages for formatting
\\RequirePackage{color}
\\RequirePackage{graphicx}
\\usepackage[usenames,dvipsnames]{xcolor}
\\usepackage[scale=0.9]{geometry}

%tabularx environment
\\usepackage{tabularx}

%for lists within experience section
\\usepackage{enumitem}

% centered version of 'X' col. type
\\newcolumntype{C}{>{\\centering\\arraybackslash}X} 

%to prevent spillover of tabular into next pages
\\usepackage{supertabular}
\\usepackage{tabularx}
\\newlength{\\fullcollw}
\\setlength{\\fullcollw}{0.47\\textwidth}

%custom \\section
\\usepackage{titlesec}				
\\usepackage{multicol}
\\usepackage{multirow}

%CV Sections inspired by: 
%http://stefano.italians.nl/archives/26
\\titleformat{\\section}{\\Large\\scshape\\raggedright}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{10pt}{10pt}

%Setup hyperref package, and colours for links
\\usepackage[unicode, draft=false]{hyperref}
\\definecolor{linkcolour}{rgb}{0,0.2,0.6}
\\hypersetup{colorlinks,breaklinks,urlcolor=linkcolour,linkcolor=linkcolour}

% job listing environments
\\newenvironment{jobshort}[2]
    {
    \\begin{tabularx}{\\linewidth}{@{}l X r@{}}
    \\textbf{#1} & \\hfill &  #2 \\\\[3.75pt]
    \\end{tabularx}
    }
    {
    }

\\newenvironment{joblong}[2]
    {
    \\begin{tabularx}{\\linewidth}{@{}l X r@{}}
    \\textbf{#1} & \\hfill &  #2 \\\\[3.75pt]
    \\end{tabularx}
    \\begin{minipage}[t]{\\linewidth}
    \\begin{itemize}[nosep,after=\\strut, leftmargin=1em, itemsep=3pt,label=--]
    }
    {
    \\end{itemize}
    \\end{minipage}    
    }

%----------------------------------------------------------------------------------------
%	BEGIN DOCUMENT
%----------------------------------------------------------------------------------------
\\begin{document}

% non-numbered pages
\\pagestyle{empty} 

%----------------------------------------------------------------------------------------
%	TITLE
%----------------------------------------------------------------------------------------

\\begin{tabularx}{\\linewidth}{@{} C @{}}
\\Huge{${name}} \\\\[7.5pt]`;

  // Add contact information dynamically with better formatting
  let contactInfo = [];
  if (email) contactInfo.push(`\\href{mailto:${email}}{${email}}`);
  if (phone) contactInfo.push(`\\mbox{${phone}}`); // Use mbox to prevent line breaks
  if (github) contactInfo.push(`\\href{https://github.com/${github}}{GitHub: ${github}}`);
  if (linkedin) contactInfo.push(`\\href{https://linkedin.com/in/${linkedin}}{LinkedIn: ${linkedin}}`);
  if (website) contactInfo.push(`\\href{https://${website}}{${website}}`);

  if (contactInfo.length > 0) {
    // Better formatting with line breaks for long contact info
    if (contactInfo.length <= 3) {
      template += contactInfo.join(' \\ $|$ \\ ') + ' \\\\';
    } else {
      // Split into two lines if too many contact items
      const firstLine = contactInfo.slice(0, 2).join(' \\ $|$ \\ ');
      const secondLine = contactInfo.slice(2).join(' \\ $|$ \\ ');
      template += firstLine + ' \\\\[3pt]\n' + secondLine + ' \\\\';
    }
  }

  template += `
\\end{tabularx}

%----------------------------------------------------------------------------------------
% EXPERIENCE SECTIONS
%----------------------------------------------------------------------------------------
`;

  // Add Summary section if provided
  if (summary && summary.trim()) {
    template += `
%Summary
\\section{Summary}
${summary}
`;
  }

  // Check if this is a fresher (no meaningful work experience)
  const isFresher = !experiences || experiences.length === 0 || 
    experiences.every(exp => !exp.title || exp.title.trim() === '');

  // For experienced professionals: Experience -> Projects -> Achievements
  // For freshers: Projects -> Achievements (no work experience section)
  
  if (!isFresher) {
    // Add Work Experience section for experienced professionals
    template += `
%Experience
\\section{Work Experience}

`;
    experiences.forEach(exp => {
      if (exp.title && (exp.duration || exp.startDate)) {
        // Generate duration string from dates if not provided
        let duration = exp.duration;
        if (!duration && exp.startDate) {
          const startFormatted = formatDate(exp.startDate);
          const endFormatted = exp.endDate ? formatDate(exp.endDate) : "Present";
          duration = `${startFormatted} - ${endFormatted}`;
        }
        
        if (exp.description && exp.description.trim()) {
          // Format description as proper bullet points
          const descriptions = exp.description.split('\n').filter(line => line.trim());
          const bulletPoints = descriptions.map(desc => {
            const cleanDesc = desc.trim().replace(/^[-*]\s*/, ''); // Remove existing bullets
            return `\\item ${cleanDesc}`;
          }).join('\n');
          
          template += `\\begin{joblong}{${exp.title}${exp.company ? ` - ${exp.company}` : ''}}{${duration}}
${bulletPoints}
\\end{joblong}

`;
        } else {
          template += `\\begin{jobshort}{${exp.title}${exp.company ? ` - ${exp.company}` : ''}}{${duration}}
\\end{jobshort}

`;
        }
      }
    });
  }

  // Add Projects section (comes after experience for professionals, first for freshers)
  if (projects && projects.length > 0) {
    template += `
%Projects
\\section{Projects}

`;
    projects.forEach(project => {
      if (project.name) {
        template += `\\begin{tabularx}{\\linewidth}{ @{}l r@{} }
\\textbf{${project.name}} & \\hfill ${project.link ? `\\href{${project.link}}{Link to Demo}` : ''} \\\\[3.75pt]
${project.description ? `\\multicolumn{2}{@{}X@{}}{${project.description}}` : ''}  \\\\
\\end{tabularx}

`;
      }
    });
  }

  // Add Achievements section (comes after projects for both freshers and experienced)
  if (achievements && achievements.length > 0) {
    template += `
%Achievements
\\section{Achievements}

`;
    achievements.forEach(achievement => {
      if (achievement.title && achievement.description) {
        const formattedDate = achievement.date ? formatDate(achievement.date) : '';
        template += `\\begin{tabularx}{\\linewidth}{ @{}l r@{} }
\\textbf{${achievement.title}} & \\hfill ${formattedDate} \\\\[3.75pt]
\\multicolumn{2}{@{}X@{}}{${achievement.description}}  \\\\
\\end{tabularx}

`;
      }
    });
  }

  // Add Education section if provided
  if (education && education.length > 0) {
    template += `
%----------------------------------------------------------------------------------------
%	EDUCATION
%----------------------------------------------------------------------------------------
\\section{Education}
\\begin{tabularx}{\\linewidth}{@{}l X@{}}	
`;
    education.forEach(edu => {
      if (edu.degree && edu.institution) {
        const formattedYear = edu.year ? formatDate(edu.year) : 'Present';
        template += `${formattedYear} & ${edu.degree} at \\textbf{${edu.institution}} ${edu.gpa ? `\\hfill (GPA: ${edu.gpa})` : ''} \\\\

`;
      }
    });
    template += `\\end{tabularx}

`;
  }

  // Add Skills section if provided
  if (skills && Object.keys(skills).length > 0) {
    template += `
%----------------------------------------------------------------------------------------
%	SKILLS
%----------------------------------------------------------------------------------------
\\section{Skills}
\\begin{tabularx}{\\linewidth}{@{}l X@{}}
`;
    Object.entries(skills).forEach(([category, skillList]) => {
      if (category && skillList) {
        template += `${category} &  \\normalsize{${skillList}}\\\\
`;
      }
    });
    template += `\\end{tabularx}

`;
  }

  template += `
\\vfill
\\center{\\footnotesize Last updated: \\today}

\\end{document}`;

  return template;
}

module.exports = {
  generateLatexTemplate
};
