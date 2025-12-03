import { useEffect, useRef } from "react";
import "./ProjectPage.scss";
import { useDispatch } from "react-redux";
import { setVariant, reset } from "../../redux/cursor";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Projects from "../../projects.json";
import LoadingImg from "../Loading/LoadingImg";

function ProjectPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const visitBackgroundRef = useRef();
  const params = useParams();
  const title = params.id;
  let num = null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="projectPageContainer">
      <div className="rightSideView">
        <div className="metaDataProjectPage">
          <div
            className="backBtn"
            onMouseEnter={() => {
              dispatch(setVariant("hover"));
            }}
            onMouseLeave={() => {
              dispatch(reset());
            }}
            onClick={() => {
              dispatch(reset());
              navigate("/");
            }}
          ></div>
          <div className="projectStack">
            {Projects[title].stack.map((stackItem, index, arr) => {
              if (arr.length - 1 === index) {
                return <div key={index}>#{stackItem}</div>;
              } else {
                return <div key={index}>#{stackItem},</div>;
              }
            })}
          </div>
          <h1 className="projectTitle">{title}</h1>
          <p className="projectDesc">{Projects[title].desc}</p>
          {Projects[title].link && (
            <div className="visitBtnContainer">
              <div
                ref={visitBackgroundRef}
                className="visitBtnBackground"
              ></div>
              <Link to={Projects[title].link} target={"_blank"}>
                <div
                  className="visitBtn"
                  onMouseEnter={() => {
                    dispatch(setVariant("hover"));
                    visitBackgroundRef.current.style.backgroundPosition =
                      "100%";
                    visitBackgroundRef.current.style.transform = "scale(1.2)";
                  }}
                  onMouseLeave={() => {
                    dispatch(reset());
                    visitBackgroundRef.current.style.backgroundPosition = "0%";
                    visitBackgroundRef.current.style.transform = "scale(1)";
                  }}
                >
                  Visit
                </div>
              </Link>
            </div>
          )}
        </div>
        <div className="numLine">
          {Object.keys(Projects).forEach((value, index) => {
            if (value === title) num = index;
          })}
          <span>0{num}</span>
        </div>
      </div>
      <div className="leftSideView">
        {Projects[title].images.map((imgSrc, index) => {
          return (
            <LoadingImg
              img={imgSrc}
              isInit={true}
              isLoaded={() => {}}
            ></LoadingImg>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectPage;
