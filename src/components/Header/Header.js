import { useEffect, useState, useRef } from "react";
import "./Header.scss";
import { useDispatch } from "react-redux";
import { setVariant, reset } from "../../redux/cursor";
import { scrollTo } from "../../utils/functions";

function Header() {
  const body = document.body;
  const html = document.documentElement;
  const dispatch = useDispatch();
  const yOffset = -30;
  const burgerRef = useRef();
  const [selectedSection, setSelectedSection] = useState("Start");
  const [scrollDirection, setScrollDirection] = useState(null);
  const [dropdownHeader, setDropdownHeader] = useState(false);
  const [shade, setShade] = useState(false);

  const workSectionEl = document.getElementById("workSectionContainer");
  const aboutSectionEl = document.getElementById("aboutSectionContainer");
  const contactSectionEl = document.getElementById("contactSectionContainer");

  const navigateToStart = () => {
    scrollTo(0);
    setDropdownHeader(false);
  };

  const navigateToWork = () => {
    const sectionTop =
      workSectionEl.getBoundingClientRect().top + window.scrollY + yOffset;
    scrollTo(sectionTop + 2);
    setDropdownHeader(false);
  };

  const navigateToAbout = () => {
    const sectionTop =
      aboutSectionEl.getBoundingClientRect().top + window.scrollY + yOffset;
    scrollTo(sectionTop + 2);
    setDropdownHeader(false);
  };

  const navigateToContact = () => {
    const sectionTop =
      contactSectionEl.getBoundingClientRect().top + window.scrollY + yOffset;
    scrollTo(sectionTop + 2);
    setDropdownHeader(false);
  };

  useEffect(() => {
    if (dropdownHeader) {
      burgerRef.current.classList.add("change");
    } else {
      burgerRef.current.classList.remove("change");
    }
  }, [dropdownHeader]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;

      if (scrollY === 0) {
        setShade(false);
      } else {
        setShade(true);
      }

      if (workSectionEl && aboutSectionEl) {
        if (
          scrollY <
          workSectionEl.getBoundingClientRect().top + scrollY + yOffset
        ) {
          setSelectedSection("Start");
        } else if (
          scrollY >=
            workSectionEl.getBoundingClientRect().top + scrollY + yOffset &&
          scrollY <
            aboutSectionEl.getBoundingClientRect().top + scrollY + yOffset
        ) {
          setSelectedSection("Work");
        } else if (
          scrollY >=
            aboutSectionEl.getBoundingClientRect().top + scrollY + yOffset &&
          window.innerHeight + Math.round(window.scrollY) + 100 <=
            Math.max(
              body.scrollHeight,
              body.offsetHeight,
              html.clientHeight,
              html.scrollHeight,
              html.offsetHeight
            )
        ) {
          setSelectedSection("About");
        } else if (
          window.innerHeight + Math.round(window.scrollY) + 100 >=
          Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
          )
        ) {
          setSelectedSection("Contact");
        }
      }

      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection) setScrollDirection(direction);
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [
    aboutSectionEl,
    body.offsetHeight,
    body.scrollHeight,
    html.clientHeight,
    html.offsetHeight,
    html.scrollHeight,
    workSectionEl,
    yOffset,
    scrollDirection,
  ]);

  return (
    <div
      id="header"
      className="header"
      style={{
        top: !dropdownHeader && scrollDirection === "down" ? "-55px" : "0px",
        height:
          window.innerWidth < 800 ? (dropdownHeader ? "280px" : "0px") : "55px",
      }}
    >
      {/* <img
        className="signature"
        src="signature.png"
        onClick={navigateToStart}
      ></img> */}
      <div
        ref={burgerRef}
        onMouseEnter={() => {
          dispatch(setVariant("hover"));
        }}
        onMouseLeave={() => {
          dispatch(reset());
        }}
        onClick={() => {
          setDropdownHeader(!dropdownHeader);
        }}
        className="burgerBtn"
      >
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
      <div
        className="headerShade"
        style={{ top: shade || dropdownHeader ? "0px" : "-40px" }}
      ></div>
      <div
        onMouseEnter={() => {
          dispatch(setVariant("hover"));
        }}
        onMouseLeave={() => {
          dispatch(reset());
        }}
        className="linkContainer"
        style={{
          top:
            window.innerWidth < 800
              ? dropdownHeader
                ? "120px"
                : "-120px"
              : "0px",
        }}
      >
        <div
          style={
            selectedSection === "Start"
              ? { color: "#f9f9f9" }
              : { color: "rgb(179, 175, 175)" }
          }
          onClick={navigateToStart}
        >
          Start{" "}
          <span className="htmlClosing">
            <span>/</span>
            <span className="greaterThan">{">"}</span>
          </span>
        </div>
        <div
          style={
            selectedSection === "Work"
              ? { color: "#f9f9f9" }
              : { color: "rgb(179, 175, 175)" }
          }
          onClick={navigateToWork}
        >
          Work{" "}
          <span className="htmlClosing">
            <span>/</span>
            <span className="greaterThan">{">"}</span>
          </span>
        </div>
        <div
          style={
            selectedSection === "About"
              ? { color: "#f9f9f9" }
              : { color: "rgb(179, 175, 175)" }
          }
          onClick={navigateToAbout}
        >
          About{" "}
          <span className="htmlClosing">
            <span>/</span>
            <span className="greaterThan">{">"}</span>
          </span>
        </div>
        <div
          style={
            selectedSection === "Contact"
              ? { color: "#f9f9f9" }
              : { color: "rgb(179, 175, 175)" }
          }
          onClick={navigateToContact}
        >
          Contact{" "}
          <span className="htmlClosing">
            <span>/</span>
            <span className="greaterThan">{">"}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
