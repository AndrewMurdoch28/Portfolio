import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  cloneElement,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVariant, reset } from "../../redux/cursor";
import { setScroll } from "../../redux/scroll";
import { scrollTo } from "../../utils/functions";
import Project from "../Project/Project";
import About from "../AboutSection/About";
import Contact from "../ContactSection/Contact";
import Projects from "../../projects.json";
import "./scrollLine.scss";

const ANIMATION_CONFIG = {
  yOffset: -30,
  initOffset: 100,
  delays: {
    initial: 400,
    line1: 430,
    line2: 430,
  },
};

function ScrollLine() {
  const { scroll } = useSelector((state) => state.scroll);
  const dispatch = useDispatch();

  const startSectionRef = useRef(null);
  const [animationStates, setAnimationStates] = useState({
    line1: false,
    line2: false,
    line3: false,
  });

  const projectEntries = useMemo(() => Object.entries(Projects), []);

  const handleScroll = useCallback(() => {
    if (!startSectionRef.current) return;

    const rect = startSectionRef.current.getBoundingClientRect();
    const isInView =
      rect.top - window.innerHeight + ANIMATION_CONFIG.initOffset <= 0 &&
      rect.top >= -ANIMATION_CONFIG.initOffset;

    if (isInView && !animationStates.line1) {
      setTimeout(() => {
        setAnimationStates((prev) => ({ ...prev, line1: true }));
        setTimeout(() => {
          setAnimationStates((prev) => ({ ...prev, line2: true }));
          setTimeout(() => {
            setAnimationStates((prev) => ({ ...prev, line3: true }));
          }, ANIMATION_CONFIG.delays.line2);
        }, ANIMATION_CONFIG.delays.line1);
      }, ANIMATION_CONFIG.delays.initial);
    }
  }, [animationStates.line1]);

  useEffect(() => {
    window.scrollTo(0, scroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll, handleScroll]);

  const navigateToWork = useCallback(() => {
    const workSectionEl = document.getElementById("workSectionContainer");
    if (!workSectionEl) return;

    const sectionTop =
      workSectionEl.getBoundingClientRect().top +
      window.scrollY +
      ANIMATION_CONFIG.yOffset;
    scrollTo(sectionTop + 2);
  }, []);

  const handleMouseEnter = useCallback(() => {
    dispatch(setVariant("hover"));
  }, [dispatch]);

  const handleMouseLeave = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={navigateToWork}
        className="scrollIndicator"
      >
        <svg>
          <path
            fill="rgb(170, 170, 170)"
            d="M9,30c-5,0-9-4.2-9-9.4V9.4C0,4.2,4,0,9,0s9,4.2,9,9.4v11.3C18,25.8,14,30,9,30z M16.2,9.4
	c0-4.2-3.2-7.5-7.2-7.5S1.8,5.3,1.8,9.4v11.3c0,4.1,3.2,7.5,7.2,7.5s7.2-3.4,7.2-7.5V9.4z M9.2,12.8c-0.5,0-0.9-0.4-0.9-0.9V7.1
	c0-0.5,0.4-0.9,0.9-0.9c0.5,0,0.9,0.4,0.9,0.9v4.7C10.1,12.3,9.7,12.8,9.2,12.8z"
          />
        </svg>
        <h3>SCROLL</h3>
      </div>

      <div className="scrollLine">
        <Section
          id="startSectionContainer"
          title="Start"
          sectionRef={startSectionRef}
        >
          <div id="startSectionContent" className="sectionContent">
            <AnimatedTextBlock
              isAnimated={animationStates.line1}
              animationClass="coverAnimation"
              textClass="enterText"
              coverColor="rgb(73, 0, 0)"
            >
              <h1>
                Hi, my name is <span>Andrew Murdoch</span>
              </h1>
            </AnimatedTextBlock>

            <AnimatedTextBlock
              isAnimated={animationStates.line2}
              animationClass="coverAnimation1"
              textClass="enterText"
              coverColor="rgb(73, 0, 0)"
            >
              <h1>I like to design and develop software</h1>
            </AnimatedTextBlock>

            <AnimatedTextBlock
              isAnimated={animationStates.line3}
              animationClass="coverAnimation2"
              textClass="enterText1"
              coverColor="#f1f1f1"
            >
              <h2>Let me show you...</h2>
            </AnimatedTextBlock>
          </div>
        </Section>

        <Section id="workSectionContainer" title="Work">
          <div className="sectionContent flex">
            {projectEntries.map(([title, data], index) => (
              <Project
                key={title}
                title={title}
                img={data.posterImg}
                num={`0${index}`}
              />
            ))}
          </div>
        </Section>

        <Section id="aboutSectionContainer" title="About">
          <div className="sectionContent">
            <About />
          </div>
        </Section>

        <Section id="contactSectionContainer" title="Contact">
          <div className="sectionContent">
            <Contact />
          </div>
        </Section>

        <footer className="property">
          © Made with
          <svg width={17} height={17} viewBox="0 0 20 20">
            <path
              fill="#988e9f"
              d="M5.719 14.75c-0.236 0-0.474-0.083-0.664-0.252l-5.060-4.498 5.341-4.748c0.412-0.365 1.044-0.33 1.411 0.083s0.33 1.045-0.083 1.412l-3.659 3.253 3.378 3.002c0.413 0.367 0.45 0.999 0.083 1.412-0.197 0.223-0.472 0.336-0.747 0.336zM14.664 14.748l5.341-4.748-5.060-4.498c-0.413-0.367-1.045-0.33-1.411 0.083s-0.33 1.045 0.083 1.412l3.378 3.003-3.659 3.252c-0.413 0.367-0.45 0.999-0.083 1.412 0.197 0.223 0.472 0.336 0.747 0.336 0.236 0 0.474-0.083 0.664-0.252zM9.986 16.165l2-12c0.091-0.545-0.277-1.060-0.822-1.151-0.547-0.092-1.061 0.277-1.15 0.822l-2 12c-0.091 0.545 0.277 1.060 0.822 1.151 0.056 0.009 0.11 0.013 0.165 0.013 0.48 0 0.904-0.347 0.985-0.835z"
            />
          </svg>
          by Andrew Murdoch. Circa 2023.
        </footer>
      </div>
    </div>
  );
}

function Section({ id, title, children, sectionRef }) {
  return (
    <div id={id} className="sectionContainer" ref={sectionRef}>
      <div className="sectionCircle">
        <span>
          <div className="subSectionName">
            {title}{" "}
            <span className="htmlClosingSection">
              <span>/</span>
              <span className="greaterThanSection">{">"}</span>
            </span>
          </div>
        </span>
      </div>
      {children}
    </div>
  );
}

function AnimatedTextBlock({
  isAnimated,
  animationClass,
  textClass,
  coverColor,
  children,
}) {
  return (
    <div className="block">
      <div className="textContainer">
        <div
          className={isAnimated ? animationClass : ""}
          style={{ background: coverColor }}
        />
        {cloneElement(children, {
          className: isAnimated ? textClass : "",
        })}
      </div>
    </div>
  );
}

export default ScrollLine;
