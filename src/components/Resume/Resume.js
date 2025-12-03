import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setVariant, reset } from "../../redux/cursor";
import { useNavigate } from "react-router-dom";
import "./Resume.scss";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Resume() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const printRef = useRef(null);
  const exporting = useRef(false);

  useEffect(() => window.scrollTo(0, 0), []);

  const handleMouseEnter = () => {
    dispatch(setVariant("hover"));
  };

  const handleMouseLeave = () => {
    dispatch(reset());
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const handleExportPDF = async () => {
    exporting.current = true;
    setTimeout(async () => {
      const element = printRef.current;
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        logging: false,
        windowHeight: element.scrollHeight,
      });
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      pdf.save("Andrew_Murdoch_Resume.pdf");
      exporting.current = false;
    }, 100);
  };

  const handleExportText = () => {
    const textContent = `
ANDREW MURDOCH
Colborne, Ontario
289-829-0575
andrewmurdoch28@gmail.com
linkedin.com/in/andrew-murdoch-601354143

================================================================================
SUMMARY
================================================================================

Results-oriented Full Stack Developer with 2+ years of experience delivering mission-critical software solutions for the RCAF and Department of National Defence. Proven track record in designing and deploying comprehensive full-stack applications, managing complex database architectures, and implementing secure, scalable systems in mixed civilian-military environments. Skilled in translating intricate operational requirements into performant code, leveraging modern technologies including React, Vue.js, Node.js, AWS, and Azure DevOps.

================================================================================
PROFESSIONAL EXPERIENCE
================================================================================

FULL STACK DEVELOPER (CONTRACT)
Oxaro / RCAF Association - Ottawa, Ontario (Remote)
June 2024 - Present

Canadian Beacon Registry (CBR) System Development:
  • Developing the Canadian Beacon Registry (CBR), a critical search and rescue system used by the Canadian Mission Control Centre at CFB Trenton as part of the international COSPAS-SARSAT satellite system
  • Designed and implemented comprehensive Entity-Relationship data model using AWS RDS, creating an Owner Groups structure with one-to-many relationships to Beacons, Aircraft, Vessels, PLB Usages, and Emergency Contacts
  • Led complete refactoring of inherited half-baked codebase, transforming overcomplicated and buggy application into maintainable, scalable solution following object-oriented programming principles
  • Developed two serverless AWS applications (public-facing portal and admin console) using React, AWS Amplify, AWS Lambda, AWS Cognito, and other AWS services
  • Implemented Agile SDLC methodology with daily scrums and sprint-based development, maintaining responsive collaboration with military stakeholders through Azure DevOps
  • Project scheduled for December 2025 deployment, replacing unreliable legacy system and improving search and rescue response capabilities

RCAF Operational Scheduling Application Development:
  • Designed and deployed comprehensive full-stack scheduling application for critical RCAF operational network using Vue 3, Node.js, and PostgreSQL
  • Developed real-time data processing and visualization tools using Socket.io and LeafletJS, enabling dynamic updates and geospatial awareness
  • Implemented robust authorization and authentication mechanisms using Casbin and Auth.js, ensuring secure access and data integrity
  • Containerized application using Docker for consistent deployments across development, testing, and production environments
  • Implemented CI/CD pipelines using Azure DevOps for automated builds, testing, and deployments
  • Mentored co-op students on full-stack development, DevOps, and secure coding best practices

SOFTWARE DEVELOPER
RCAF Association - Trenton, Ontario (On-site)
January 2024 - June 2024

  • Built and delivered Excel-based aircraft maintenance planning system using VBA within 6-month timeframe, serving as key team member and primary developer
  • Conducted research with military stakeholders and public servants to identify appropriate IT solution for maintenance scheduling optimization
  • Translated complex aviation business logic into performant VBA code, collaborating with stakeholders to integrate maintenance protocols and regulatory standards
  • Optimized scheduling algorithms through algorithmic enhancements and code refactoring, significantly minimizing aircraft downtime and operational costs
  • Successfully delivered project on schedule, earning positive feedback from both military operators and civilian administrators

================================================================================
EDUCATION
================================================================================

BACHELOR OF SCIENCE, COMPUTER SCIENCE
Ontario Tech University - Oshawa, Ontario
Graduated: April 2022

================================================================================
TECHNICAL SKILLS
================================================================================

Languages & Frameworks:
JavaScript, TypeScript, Vue.js, React, AngularJS, Node.js, Express, VBA

Database Technologies:
PostgreSQL, AWS RDS, Database Design, Entity-Relationship Modeling

Cloud & Infrastructure:
AWS (Lambda, Amplify, Cognito, RDS), Docker, CI/CD Pipelines

Development Tools:
Azure DevOps, Git, Agile/Scrum, Jest, UML Modeling

Security & Auth:
Casbin, Auth.js, Prowler, AWS Security Best Practices

Real-time & Visualization:
Socket.io, LeafletJS, Data Visualization

================================================================================
KEY COMPETENCIES
================================================================================

System Development Life Cycles • Object-Oriented Programming • Database Architecture & Migration • Security Implementation • Full-Stack Development • Stakeholder Communication • Code Refactoring & Optimization • Technical Documentation
`;

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Andrew_Murdoch_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="resumeWrapper">
      <div className="resumeControls no-print">
        <button
          className="backButton"
          onClick={handleBackClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
        <button
          className="exportButton"
          onClick={handleExportPDF}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Export to PDF
        </button>
        <button
          className="exportButton"
          onClick={handleExportText}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Export to Text
        </button>
      </div>
      <div ref={printRef} className="resumeContainer">
        {/* Rest of your resume content remains the same */}
        <header className="resumeHeader">
          <div className="profileImage">
            <img src="/me.jpg" alt="Andrew Murdoch" />
          </div>
          <div className="headerContent">
            <h1 className="name">Andrew Murdoch</h1>
            <div className="headerDivider"></div>
            <div className="contactInfo">
              <span className="contactItem">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Colborne, Ontario
              </span>
              <span className="contactItem">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                289-829-0575
              </span>
              <span className="contactItem">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                andrewmurdoch28@gmail.com
              </span>
              <span className="contactItem">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                linkedin.com/in/andrew-murdoch-601354143
              </span>
            </div>
          </div>
        </header>
        <section className="resumeSection">
          <h2 className="sectionTitle">Summary</h2>
          <div className="sectionDivider"></div>
          <p className="summaryText">
            Results-oriented Full Stack Developer with 2+ years of experience
            delivering mission-critical software solutions for the RCAF and
            Department of National Defence. Proven track record in designing and
            deploying comprehensive full-stack applications, managing complex
            database architectures, and implementing secure, scalable systems in
            mixed civilian-military environments. Skilled in translating
            intricate operational requirements into performant code, leveraging
            modern technologies including React, Vue.js, Node.js, AWS, and Azure
            DevOps.
          </p>
        </section>
        <section className="resumeSection">
          <h2 className="sectionTitle">Professional Experience</h2>
          <div className="sectionDivider"></div>
          <div className="experienceItem">
            <div className="experienceHeader">
              <div>
                <h3 className="jobTitle">Full Stack Developer (Contract)</h3>
                <p className="company">
                  Oxaro / RCAF Association - Ottawa, Ontario (Remote)
                </p>
              </div>
              <span className="dateRange">June 2024 - Present</span>
            </div>
            <div className="projectBlock">
              <h4 className="projectTitle">
                Canadian Beacon Registry (CBR) System Development:
              </h4>
              <ul className="achievements">
                <li>
                  Developing the Canadian Beacon Registry (CBR), a critical
                  search and rescue system used by the Canadian Mission Control
                  Centre at CFB Trenton as part of the international
                  COSPAS-SARSAT satellite system
                </li>
                <li>
                  Designed and implemented comprehensive Entity-Relationship
                  data model using AWS RDS, creating an Owner Groups structure
                  with one-to-many relationships to Beacons, Aircraft, Vessels,
                  PLB Usages, and Emergency Contacts
                </li>
                <li>
                  Led complete refactoring of inherited half-baked codebase,
                  transforming overcomplicated and buggy application into
                  maintainable, scalable solution following object-oriented
                  programming principles
                </li>
                <li>
                  Developed two serverless AWS applications (public-facing
                  portal and admin console) using React, AWS Amplify, AWS
                  Lambda, AWS Cognito, and other AWS services
                </li>
                <li>
                  Implemented Agile SDLC methodology with daily scrums and
                  sprint-based development, maintaining responsive collaboration
                  with military stakeholders through Azure DevOps
                </li>
                <li>
                  Project scheduled for December 2025 deployment, replacing
                  unreliable legacy system and improving search and rescue
                  response capabilities
                </li>
              </ul>
            </div>
            <div className="projectBlock">
              <h4 className="projectTitle">
                RCAF Operational Scheduling Application Development:
              </h4>
              <ul className="achievements">
                <li>
                  Designed and deployed comprehensive full-stack scheduling
                  application for critical RCAF operational network using Vue 3,
                  Node.js, and PostgreSQL
                </li>
                <li>
                  Developed real-time data processing and visualization tools
                  using Socket.io and LeafletJS, enabling dynamic updates and
                  geospatial awareness
                </li>
                <li>
                  Implemented robust authorization and authentication mechanisms
                  using Casbin and Auth.js, ensuring secure access and data
                  integrity
                </li>
                <li>
                  Containerized application using Docker for consistent
                  deployments across development, testing, and production
                  environments
                </li>
                <li>
                  Implemented CI/CD pipelines using Azure DevOps for automated
                  builds, testing, and deployments
                </li>
                <li>
                  Mentored co-op students on full-stack development, DevOps, and
                  secure coding best practices
                </li>
              </ul>
            </div>
          </div>
          <div className="experienceItem">
            <div className="experienceHeader">
              <div>
                <h3 className="jobTitle">Software Developer</h3>
                <p className="company">
                  RCAF Association - Trenton, Ontario (On-site)
                </p>
              </div>
              <span className="dateRange">January 2024 - June 2024</span>
            </div>
            <ul className="achievements">
              <li>
                Built and delivered Excel-based aircraft maintenance planning
                system using VBA within 6-month timeframe, serving as key team
                member and primary developer
              </li>
              <li>
                Conducted research with military stakeholders and public
                servants to identify appropriate IT solution for maintenance
                scheduling optimization
              </li>
              <li>
                Translated complex aviation business logic into performant VBA
                code, collaborating with stakeholders to integrate maintenance
                protocols and regulatory standards
              </li>
              <li>
                Optimized scheduling algorithms through algorithmic enhancements
                and code refactoring, significantly minimizing aircraft downtime
                and operational costs
              </li>
              <li>
                Successfully delivered project on schedule, earning positive
                feedback from both military operators and civilian
                administrators
              </li>
            </ul>
          </div>
        </section>
        <section className="resumeSection">
          <h2 className="sectionTitle">Education</h2>
          <div className="sectionDivider"></div>
          <div className="educationItem">
            <div className="educationHeader">
              <div>
                <h3 className="degree">
                  Bachelor of Science, Computer Science
                </h3>
                <p className="school">
                  Ontario Tech University - Oshawa, Ontario
                </p>
              </div>
              <span className="dateRange">Graduated: April 2022</span>
            </div>
          </div>
        </section>
        <section
          className={
            exporting.current
              ? "resumeSection technicalSkillsSection"
              : "resumeSection"
          }
        >
          <h2 className="sectionTitle">Technical Skills</h2>
          <div className="sectionDivider"></div>
          <div className="skillsGrid">
            <div className="skillCategory">
              <h4 className="skillCategoryTitle">Languages & Frameworks</h4>
              <p className="skillsList">
                JavaScript, TypeScript, Vue.js, React, AngularJS, Node.js,
                Express, VBA
              </p>
            </div>
            <div className="skillCategory">
              <h4 className="skillCategoryTitle">Database Technologies</h4>
              <p className="skillsList">
                PostgreSQL, AWS RDS, Database Design, Entity-Relationship
                Modeling
              </p>
            </div>
            <div className="skillCategory">
              <h4 className="skillCategoryTitle">Cloud & Infrastructure</h4>
              <p className="skillsList">
                AWS (Lambda, Amplify, Cognito, RDS), Docker, CI/CD Pipelines
              </p>
            </div>
            <div className="skillCategory">
              <h4 className="skillCategoryTitle">Development Tools</h4>
              <p className="skillsList">
                Azure DevOps, Git, Agile/Scrum, Jest, UML Modeling
              </p>
            </div>
            <div className="skillCategory">
              <h4 className="skillCategoryTitle">Security & Auth</h4>
              <p className="skillsList">
                Casbin, Auth.js, Prowler, AWS Security Best Practices
              </p>
            </div>
            <div className="skillCategory">
              <h4 className="skillCategoryTitle">Real-time & Visualization</h4>
              <p className="skillsList">
                Socket.io, LeafletJS, Data Visualization
              </p>
            </div>
          </div>
        </section>
        <section className="resumeSection">
          <h2 className="sectionTitle">Key Competencies</h2>
          <div className="sectionDivider"></div>
          <div className="competenciesGrid">
            <span className="competency">System Development Life Cycles</span>
            <span className="competency">Object-Oriented Programming</span>
            <span className="competency">
              Database Architecture & Migration
            </span>
            <span className="competency">Security Implementation</span>
            <span className="competency">Full-Stack Development</span>
            <span className="competency">Stakeholder Communication</span>
            <span className="competency">Code Refactoring & Optimization</span>
            <span className="competency">Technical Documentation</span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Resume;
