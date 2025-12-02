import { useEffect, useState } from "react";
import "./About.scss";

function About() {
  const UPDATE_RATE = 60000;
  const DATE_OF_BIRTH = new Date(2000, 2, 28);
  const [dateTimeStamp, setDateTimeStamp] = useState(0);

  useEffect(() => {
    const calculateTimestamp = () =>
      Math.round((new Date() - DATE_OF_BIRTH) / 60000);

    setDateTimeStamp(calculateTimestamp());
    const interval = setInterval(() => {
      setDateTimeStamp(calculateTimestamp());
    }, UPDATE_RATE);

    return () => clearInterval(interval);
  }, []);

  const skills = [
    'JavaScript', 'TypeScript', 'Vue.js', 'React', 'AngularJS', 'Node.js', 
    'Express', 'PostgreSQL', 'AWS RDS', 'AWS Lambda', 'AWS Amplify', 
    'AWS Cognito', 'Docker', 'Azure DevOps', 'CI/CD', 'Git', 'Agile/Scrum', 
    'Casbin', 'Auth.js', 'Prowler', 'Socket.io', 'LeafletJS', 'Jest', 
    'OOP', 'Database Design', 'VBA'
  ];

  return (
    <div className="class">
      <CodeLine lineNum="01">
        <span className="blueFont space">class</span>
        <span className="greenFont space">AndrewMurdoch</span>
        <span className="yellowFont">{"{"}</span>
      </CodeLine>

      <CodeLine lineNum="02" indent={1}>
        <span className="blueFont">constructor</span>
        <span className="pinkFont">{"() {"}</span>
      </CodeLine>

      <CodeLine lineNum="03" indent={2}>
        <span className="blueFont">this</span>
        <span>.</span>
        <span className="lightBlueFont space">name</span>
        <span className="space">=</span>
        <span className="orangeFont">{"'Andrew Murdoch'"}</span>
        <span>;</span>
      </CodeLine>

      <CodeLine lineNum="04" indent={2}>
        <span className="blueFont">this</span>
        <span>.</span>
        <span className="lightBlueFont space">dayOfBirthTimestamp</span>
        <span className="space">=</span>
        <span className="numberFont">{dateTimeStamp}</span>
        <span>;</span>
      </CodeLine>

      <CodeLine lineNum="05" indent={2}>
        <span className="blueFont">this</span>
        <span>.</span>
        <span className="lightBlueFont space">email</span>
        <span className="space">=</span>
        <span className="orangeFont">{"'andrewmurdoch88@gmail.com'"}</span>
        <span>;</span>
      </CodeLine>

      <CodeLine lineNum="06" indent={2}>
        <span className="blueFont">this</span>
        <span>.</span>
        <span className="lightBlueFont space">location</span>
        <span className="space">=</span>
        <span className="orangeFont">{"'Colborne, ON'"}</span>
        <span>;</span>
      </CodeLine>

      <CodeLine lineNum="07" indent={2}>
        <span className="blueFont">this</span>
        <span>.</span>
        <span className="lightBlueFont space">hobby</span>
        <span className="space">=</span>
        <span className="orangeFont">{"'golfing'"}</span>
        <span>;</span>
      </CodeLine>

      <CodeLine lineNum="08" indent={1}>
        <span className="pinkFont">{"}"}</span>
      </CodeLine>

      <CodeLine lineNum="09" indent={1}>
        <span className="yellowFont">education</span>
        <span className="pinkFont">{"() {"}</span>
      </CodeLine>

      <CodeLine lineNum="10" indent={2}>
        <span className="pinkFont space">return</span>
        <span className="blueFont">{"["}</span>
      </CodeLine>

      <CodeLine lineNum="11" indent={3}>
        <span className="yellowFont space">{"{"}</span>
        <span className="orangeFont">'2018-2022'</span>
        <span className="space">:</span>
        <span className="orangeFont space">
          'Ontario Tech University - Bachelor of Science, Computer Science'
        </span>
        <span className="yellowFont">{"}"}</span>
      </CodeLine>

      <CodeLine lineNum="12" indent={2}>
        <span className="blueFont">{"]"}</span>
      </CodeLine>

      <CodeLine lineNum="13" indent={1}>
        <span className="pinkFont">{"}"}</span>
      </CodeLine>

      <CodeLine lineNum="14" indent={1}>
        <span className="yellowFont">experience</span>
        <span className="pinkFont">{"() {"}</span>
      </CodeLine>

      <CodeLine lineNum="15" indent={2}>
        <span className="pinkFont space">return</span>
        <span className="blueFont">{"["}</span>
      </CodeLine>

      <CodeLine lineNum="16" indent={3}>
        <span className="yellowFont space">{"{"}</span>
      </CodeLine>

      <CodeLine lineNum="17" indent={4}>
        <span className="orangeFont">'role'</span>
        <span className="space">:</span>
        <span className="orangeFont space">'Full Stack Developer (Contract)'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="18" indent={4}>
        <span className="orangeFont">'organization'</span>
        <span className="space">:</span>
        <span className="orangeFont space">'Oxaro / RCAF Association'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="19" indent={4}>
        <span className="orangeFont">'period'</span>
        <span className="space">:</span>
        <span className="orangeFont space">'June 2024 - Present'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="20" indent={4}>
        <span className="orangeFont">'projects'</span>
        <span className="space">:</span>
        <span className="blueFont space">{"["}</span>
      </CodeLine>

      <CodeLine lineNum="21" indent={5}>
        <span className="yellowFont space">{"{"}</span>
      </CodeLine>

      <CodeLine lineNum="22" indent={6}>
        <span className="orangeFont">'name'</span>
        <span className="space">:</span>
        <span className="orangeFont space">'Canadian Beacon Registry (CBR)'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="23" indent={6}>
        <span className="orangeFont">'description'</span>
        <span className="space">:</span>
        <span className="orangeFont space">'Critical search and rescue system for COSPAS-SARSAT'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="24" indent={6}>
        <span className="orangeFont">'highlights'</span>
        <span className="space">:</span>
        <span className="blueFont space">{"["}</span>
      </CodeLine>

      <CodeLine lineNum="25" indent={7}>
        <span className="orangeFont">'Built serverless AWS apps with React, Lambda, Cognito'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="26" indent={7}>
        <span className="orangeFont">'Designed comprehensive ER data model using AWS RDS'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="27" indent={7}>
        <span className="orangeFont">'Led complete refactoring of legacy codebase'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="28" indent={7}>
        <span className="orangeFont">'Managed complex data migration from legacy system'</span>
      </CodeLine>

      <CodeLine lineNum="29" indent={6}>
        <span className="blueFont">{"]"}</span>
      </CodeLine>

      <CodeLine lineNum="30" indent={5}>
        <span className="yellowFont">{"}"}</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="31" indent={5}>
        <span className="yellowFont space">{"{"}</span>
      </CodeLine>

      <CodeLine lineNum="32" indent={6}>
        <span className="orangeFont">'name'</span>
        <span className="space">:</span>
        <span className="orangeFont space">'RCAF Operational Scheduling Application'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="33" indent={6}>
        <span className="orangeFont">'description'</span>
        <span className="space">:</span>
        <span className="orangeFont space">'Full-stack scheduling system for critical operations'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="34" indent={6}>
        <span className="orangeFont">'highlights'</span>
        <span className="space">:</span>
        <span className="blueFont space">{"["}</span>
      </CodeLine>

      <CodeLine lineNum="35" indent={7}>
        <span className="orangeFont">'Built with Vue 3, Node.js, PostgreSQL'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="36" indent={7}>
        <span className="orangeFont">'Real-time updates with Socket.io and LeafletJS'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="37" indent={7}>
        <span className="orangeFont">'Implemented CI/CD with Azure DevOps and Docker'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="38" indent={7}>
        <span className="orangeFont">'Security scanning tool with AngularJS and Prowler'</span>
      </CodeLine>

      <CodeLine lineNum="39" indent={6}>
        <span className="blueFont">{"]"}</span>
      </CodeLine>

      <CodeLine lineNum="40" indent={5}>
        <span className="yellowFont">{"}"}</span>
      </CodeLine>

      <CodeLine lineNum="41" indent={4}>
        <span className="blueFont">{"]"}</span>
      </CodeLine>

      <CodeLine lineNum="42" indent={3}>
        <span className="yellowFont">{"}"}</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="43" indent={3}>
        <span className="yellowFont space">{"{"}</span>
      </CodeLine>

      <CodeLine lineNum="44" indent={4}>
        <span className="orangeFont">'role'</span>
        <span className="space">:</span>
        <span className="orangeFont space">'Software Developer'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="45" indent={4}>
        <span className="orangeFont">'organization'</span>
        <span className="space">:</span>
        <span className="orangeFont space">'RCAF Association'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="46" indent={4}>
        <span className="orangeFont">'period'</span>
        <span className="space">:</span>
        <span className="orangeFont space">'January 2024 - June 2024'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="47" indent={4}>
        <span className="orangeFont">'highlights'</span>
        <span className="space">:</span>
        <span className="blueFont space">{"["}</span>
      </CodeLine>

      <CodeLine lineNum="48" indent={5}>
        <span className="orangeFont">'Built Excel-based aircraft maintenance planning system using VBA'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="49" indent={5}>
        <span className="orangeFont">'Translated aviation business logic into performant code'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="50" indent={5}>
        <span className="orangeFont">'Optimized scheduling algorithms to minimize aircraft downtime'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="51" indent={5}>
        <span className="orangeFont">'Delivered project on schedule within 6-month timeframe'</span>
      </CodeLine>

      <CodeLine lineNum="52" indent={4}>
        <span className="blueFont">{"]"}</span>
      </CodeLine>

      <CodeLine lineNum="53" indent={3}>
        <span className="yellowFont">{"}"}</span>
      </CodeLine>

      <CodeLine lineNum="54" indent={2}>
        <span className="blueFont">{"]"}</span>
      </CodeLine>

      <CodeLine lineNum="55" indent={1}>
        <span className="pinkFont">{"}"}</span>
      </CodeLine>

      <CodeLine lineNum="56" indent={1}>
        <span className="yellowFont">skills</span>
        <span className="pinkFont">{"() {"}</span>
      </CodeLine>

      <CodeLine lineNum="57" indent={2}>
        <span className="pinkFont space">return</span>
        <span className="blueFont">{"["}</span>
      </CodeLine>

      {skills.map((skill, index) => {
        const lineNum = 58 + index;
        const isLast = index === skills.length - 1;
        
        return (
          <CodeLine key={skill} lineNum={String(lineNum).padStart(2, "0")} indent={3}>
            <span className="orangeFont">'{skill}'</span>
            {!isLast && <span>,</span>}
            {isLast && <span className="flashingCursor"></span>}
          </CodeLine>
        );
      })}

      <CodeLine lineNum={String(58 + skills.length).padStart(2, "0")} indent={2}>
        <span className="blueFont">{"]"}</span>
      </CodeLine>

      <CodeLine lineNum={String(59 + skills.length).padStart(2, "0")} indent={1}>
        <span className="pinkFont">{"}"}</span>
      </CodeLine>

      <CodeLine lineNum={String(60 + skills.length).padStart(2, "0")}>
        <span className="yellowFont">{"}"}</span>
      </CodeLine>
    </div>
  );
}

function CodeLine({ lineNum, indent = 0, children, wrap = false }) {
  const dots = Array(indent * 2).fill(null);

  return (
    <div className="codeLineContainer">
      <div className="codeLine">
        <span className="lineNum">{lineNum}</span>
        {dots.map((_, i) => (
          <div key={i} className="dot">
            .
          </div>
        ))}
        {wrap ? <div className="flex">{children}</div> : children}
      </div>
    </div>
  );
}

export default About;