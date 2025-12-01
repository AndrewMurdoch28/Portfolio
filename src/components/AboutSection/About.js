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
    "Vue.js",
    "AngularJS",
    "React",
    "Node.js",
    "Adonis.js",
    "PostgreSQL",
    "AWS",
    "Azure DevOps",
    "Docker",
    "CI/CD",
    "TypeScript",
    "Socket.io",
    "Git",
    "Jest",
    "Prowler",
    "Casbín",
    "LeafletJS",
    "VBA",
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
        <span className="orangeFont">{"'andrewmurdoch28@gmail.com'"}</span>
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
          'Ontario Tech University - Bachelor of Science (Honours), Computer
          Science'
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
        <span className="orangeFont space">'Junior Full Stack Developer'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="18" indent={4}>
        <span className="orangeFont">'organization'</span>
        <span className="space">:</span>
        <span className="orangeFont space">'RCAF - Ottawa, ON'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="19" indent={4}>
        <span className="orangeFont">'period'</span>
        <span className="space">:</span>
        <span className="orangeFont space">'June 2024 - March 2025'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="20" indent={4}>
        <span className="orangeFont">'highlights'</span>
        <span className="space">:</span>
        <span className="blueFont space">{"["}</span>
      </CodeLine>

      <CodeLine lineNum="21" indent={5}>
        <span className="orangeFont">
          'Designed full-stack application using Vue 3, Node.js, PostgreSQL'
        </span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="22" indent={5}>
        <span className="orangeFont">
          'Implemented CI/CD pipelines with Azure DevOps'
        </span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="23" indent={5}>
        <span className="orangeFont">
          'Containerized application using Docker'
        </span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="24" indent={5}>
        <span className="orangeFont">
          'Built real-time data processing with Socket.io and LeafletJS'
        </span>
      </CodeLine>

      <CodeLine lineNum="25" indent={4}>
        <span className="blueFont">{"]"}</span>
      </CodeLine>

      <CodeLine lineNum="26" indent={3}>
        <span className="yellowFont">{"}"}</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="27" indent={3}>
        <span className="yellowFont space">{"{"}</span>
      </CodeLine>

      <CodeLine lineNum="28" indent={4}>
        <span className="orangeFont">'role'</span>
        <span className="space">:</span>
        <span className="orangeFont space">'Junior Software Developer'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="29" indent={4}>
        <span className="orangeFont">'organization'</span>
        <span className="space">:</span>
        <span className="orangeFont space">'RCAF - Trenton, ON'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="30" indent={4}>
        <span className="orangeFont">'period'</span>
        <span className="space">:</span>
        <span className="orangeFont space">'January 2024 - June 2024'</span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="31" indent={4}>
        <span className="orangeFont">'highlights'</span>
        <span className="space">:</span>
        <span className="blueFont space">{"["}</span>
      </CodeLine>

      <CodeLine lineNum="32" indent={5}>
        <span className="orangeFont">
          'Built aircraft maintenance planning system using VBA'
        </span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="33" indent={5}>
        <span className="orangeFont">
          'Developed automated data processing pipelines'
        </span>
        <span>,</span>
      </CodeLine>

      <CodeLine lineNum="34" indent={5}>
        <span className="orangeFont">
          'Optimized system performance through algorithmic improvements'
        </span>
      </CodeLine>

      <CodeLine lineNum="35" indent={4}>
        <span className="blueFont">{"]"}</span>
      </CodeLine>

      <CodeLine lineNum="36" indent={3}>
        <span className="yellowFont">{"}"}</span>
      </CodeLine>

      <CodeLine lineNum="37" indent={2}>
        <span className="blueFont">{"]"}</span>
      </CodeLine>

      <CodeLine lineNum="38" indent={1}>
        <span className="pinkFont">{"}"}</span>
      </CodeLine>

      <CodeLine lineNum="39" indent={1}>
        <span className="yellowFont">skills</span>
        <span className="pinkFont">{"() {"}</span>
      </CodeLine>

      <CodeLine lineNum="40" indent={2}>
        <span className="pinkFont space">return</span>
        <span className="blueFont space">{"["}</span>
      </CodeLine>

      {skills.map((skill, index) => (
        <CodeLine
          key={skill}
          lineNum={String(41 + index).padStart(2, "0")}
          indent={3}
        >
          <span className="orangeFont">'{skill}'</span>
          {index < skills.length - 1 && <span>,</span>}
          {index === skills.length - 1 && (
            <span className="flashingCursor"></span>
          )}
        </CodeLine>
      ))}

      <CodeLine
        lineNum={String(41 + skills.length).padStart(2, "0")}
        indent={2}
      >
        <span className="blueFont space">{"]"}</span>
      </CodeLine>

      <CodeLine
        lineNum={String(42 + skills.length).padStart(2, "0")}
        indent={1}
      >
        <span className="pinkFont">{"}"}</span>
      </CodeLine>

      <CodeLine lineNum={String(43 + skills.length).padStart(2, "0")}>
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
