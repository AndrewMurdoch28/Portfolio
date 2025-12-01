import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Delaunay from "delaunay-fast";
import Header from "./components/Header/Header";
import ScrollLine from "./components/ScrollLine/scrollLine";
import ProjectPage from "./components/ProjectPage/ProjectPage";
import "./App.scss";

const STAR_CONFIG = {
  particleCount: 40,
  flareCount: 10,
  motion: 0.05,
  tilt: 0.05,
  color: "#FFEED4",
  particleSizeBase: 1,
  particleSizeMultiplier: 0.5,
  flareSizeBase: 100,
  flareSizeMultiplier: 100,
  lineWidth: 1,
  linkChance: 75,
  linkLengthMin: 5,
  linkLengthMax: 7,
  linkOpacity: 0.25,
  linkFade: 90,
  linkSpeed: 1,
  glareAngle: -60,
  glareOpacityMultiplier: 0.05,
  renderParticles: true,
  renderParticleGlare: true,
  renderFlares: true,
  renderLinks: true,
  renderMesh: false,
  flicker: true,
  flickerSmoothing: 15,
  blurSize: 0,
  orbitTilt: true,
  randomMotion: true,
  noiseLength: 1000,
  noiseStrength: 1,
};

const CURSOR_CONFIG = {
  defaultOffset: 7,
  hoverOffset: 22.5,
  smoothing: 10,
  cursorSmoothing: 5,
};

function App() {
  const { variant } = useSelector((state) => state.cursor);
  const { animationState } = useSelector((state) => state.animation);

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const cursorInnerRef = useRef(null);
  const cursorOuterRef = useRef(null);
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);
  const offsetRef = useRef(CURSOR_CONFIG.defaultOffset);
  const endXRef = useRef(0);
  const endYRef = useRef(0);

  const mouseMoveHandler = useCallback(({ clientX, clientY }) => {
    setCoords({ x: clientX, y: clientY });

    if (cursorInnerRef.current) {
      cursorInnerRef.current.style.top = `${clientY}px`;
      cursorInnerRef.current.style.left = `${clientX}px`;
    }

    endXRef.current = clientX;
    endYRef.current = clientY;
  }, []);

  const animateOuterCursor = useCallback(
    (time) => {
      if (previousTimeRef.current !== undefined) {
        const newCoords = {
          x:
            coords.x +
            (endXRef.current - coords.x) / CURSOR_CONFIG.cursorSmoothing,
          y:
            coords.y +
            (endYRef.current - coords.y) / CURSOR_CONFIG.cursorSmoothing,
        };

        setCoords(newCoords);

        const targetOffset =
          variant === "default"
            ? CURSOR_CONFIG.defaultOffset
            : CURSOR_CONFIG.hoverOffset;

        offsetRef.current +=
          (targetOffset - offsetRef.current) / CURSOR_CONFIG.smoothing;

        if (cursorOuterRef.current) {
          cursorOuterRef.current.style.top = `${
            newCoords.y - offsetRef.current
          }px`;
          cursorOuterRef.current.style.left = `${
            newCoords.x - offsetRef.current
          }px`;
        }
      }

      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateOuterCursor);
    },
    [coords, variant]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateOuterCursor);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animateOuterCursor]);

  useEffect(() => {
    const canvas = document.getElementById("stars");
    if (!canvas) return;

    const context = canvas.getContext("2d");
    const mouse = { x: 0, y: 0 };
    const c = 1000;

    let n = 0;
    const nAngle = (Math.PI * 2) / STAR_CONFIG.noiseLength;
    const nRad = 100;
    const nScale = 0.5;
    let nPos = { x: 0, y: 0 };

    const points = [];
    let vertices = [];
    const triangles = [];
    const links = [];
    const particles = [];
    const flares = [];

    class Particle {
      constructor() {
        this.x = random(-0.1, 1.1, true);
        this.y = random(-0.1, 1.1, true);
        this.z = random(0, 4);
        this.color = STAR_CONFIG.color;
        this.opacity = random(0.1, 1, true);
        this.flicker = 0;
        this.neighbors = [];
      }

      render() {
        const pos = position(this.x, this.y, this.z);
        const r =
          (this.z * STAR_CONFIG.particleSizeMultiplier +
            STAR_CONFIG.particleSizeBase) *
          (sizeRatio() / 1000);
        let o = this.opacity;

        if (STAR_CONFIG.flicker) {
          const newVal = random(-0.5, 0.5, true);
          this.flicker +=
            (newVal - this.flicker) / STAR_CONFIG.flickerSmoothing;
          this.flicker = Math.max(-0.5, Math.min(0.5, this.flicker));
          o = Math.max(0, Math.min(1, o + this.flicker));
        }

        context.fillStyle = this.color;
        context.globalAlpha = o;
        context.beginPath();
        context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false);
        context.fill();
        context.closePath();

        if (STAR_CONFIG.renderParticleGlare) {
          context.globalAlpha = o * STAR_CONFIG.glareOpacityMultiplier;
          context.beginPath();
          context.ellipse(
            pos.x,
            pos.y,
            r * 100,
            r,
            (STAR_CONFIG.glareAngle -
              (nPos.x - 0.5) * STAR_CONFIG.noiseStrength * STAR_CONFIG.motion) *
              (Math.PI / 180),
            0,
            2 * Math.PI,
            false
          );
          context.fill();
          context.closePath();
        }

        context.globalAlpha = 1;
      }
    }

    class Flare {
      constructor() {
        this.x = random(-0.25, 1.25, true);
        this.y = random(-0.25, 1.25, true);
        this.z = random(0, 2);
        this.color = STAR_CONFIG.color;
        this.opacity = random(0.001, 0.01, true);
      }

      render() {
        const pos = position(this.x, this.y, this.z);
        const r =
          (this.z * STAR_CONFIG.flareSizeMultiplier +
            STAR_CONFIG.flareSizeBase) *
          (sizeRatio() / 1000);

        context.beginPath();
        context.globalAlpha = this.opacity;
        context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        context.globalAlpha = 1;
      }
    }

    class Link {
      constructor(startVertex, numPoints) {
        this.length = numPoints;
        this.verts = [startVertex];
        this.stage = 0;
        this.linked = [startVertex];
        this.distances = [];
        this.traveled = 0;
        this.fade = 0;
        this.finished = false;
      }

      render() {
        let points;

        switch (this.stage) {
          case 0:
            const last = particles[this.verts[this.verts.length - 1]];

            if (last?.neighbors?.length > 0) {
              const neighbor =
                last.neighbors[random(0, last.neighbors.length - 1)];
              if (this.verts.indexOf(neighbor) === -1) {
                this.verts.push(neighbor);
              }
            } else {
              this.stage = 3;
              this.finished = true;
            }

            if (this.verts.length >= this.length) {
              for (let i = 0; i < this.verts.length - 1; i++) {
                const p1 = particles[this.verts[i]];
                const p2 = particles[this.verts[i + 1]];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                this.distances.push(dist);
              }
              this.stage = 1;
            }
            break;

          case 1:
            if (this.distances.length > 0) {
              points = [];

              for (let i = 0; i < this.linked.length; i++) {
                const p = particles[this.linked[i]];
                const pos = position(p.x, p.y, p.z);
                points.push([pos.x, pos.y]);
              }

              const linkSpeedRel =
                STAR_CONFIG.linkSpeed * 0.00001 * canvas.width;
              this.traveled += linkSpeedRel;
              const d = this.distances[this.linked.length - 1];

              if (this.traveled >= d) {
                this.traveled = 0;
                this.linked.push(this.verts[this.linked.length]);
                const p = particles[this.linked[this.linked.length - 1]];
                const pos = position(p.x, p.y, p.z);
                points.push([pos.x, pos.y]);

                if (this.linked.length >= this.verts.length) {
                  this.stage = 2;
                }
              } else {
                const a = particles[this.linked[this.linked.length - 1]];
                const b = particles[this.verts[this.linked.length]];
                const t = d - this.traveled;
                const x = (this.traveled * b.x + t * a.x) / d;
                const y = (this.traveled * b.y + t * a.y) / d;
                const z = (this.traveled * b.z + t * a.z) / d;
                const pos = position(x, y, z);
                points.push([pos.x, pos.y]);
              }

              this.drawLine(points);
            } else {
              this.stage = 3;
              this.finished = true;
            }
            break;

          case 2:
            if (this.verts.length > 1) {
              if (this.fade < STAR_CONFIG.linkFade) {
                this.fade++;
                points = [];
                const alpha =
                  (1 - this.fade / STAR_CONFIG.linkFade) *
                  STAR_CONFIG.linkOpacity;

                for (let i = 0; i < this.verts.length; i++) {
                  const p = particles[this.verts[i]];
                  const pos = position(p.x, p.y, p.z);
                  points.push([pos.x, pos.y]);
                }

                this.drawLine(points, alpha);
              } else {
                this.stage = 3;
                this.finished = true;
              }
            } else {
              this.stage = 3;
              this.finished = true;
            }
            break;

          case 3:
          default:
            this.finished = true;
            break;
        }
      }

      drawLine(points, alpha = STAR_CONFIG.linkOpacity) {
        if (points.length > 1 && alpha > 0) {
          context.globalAlpha = alpha;
          context.beginPath();

          for (let i = 0; i < points.length - 1; i++) {
            context.moveTo(points[i][0], points[i][1]);
            context.lineTo(points[i + 1][0], points[i + 1][1]);
          }

          context.strokeStyle = STAR_CONFIG.color;
          context.lineWidth = STAR_CONFIG.lineWidth;
          context.stroke();
          context.closePath();
          context.globalAlpha = 1;
        }
      }
    }

    function noisePoint(i) {
      const a = nAngle * i;
      const cosA = Math.cos(a);
      const sinA = Math.sin(a);
      const rad = nRad;

      return { x: rad * cosA, y: rad * sinA };
    }

    function position(x, y, z) {
      return {
        x:
          x * canvas.width +
          (canvas.width / 2 -
            mouse.x +
            (nPos.x - 0.5) * STAR_CONFIG.noiseStrength) *
            z *
            STAR_CONFIG.motion,
        y:
          y * canvas.height +
          (canvas.height / 2 -
            mouse.y +
            (nPos.y - 0.5) * STAR_CONFIG.noiseStrength) *
            z *
            STAR_CONFIG.motion,
      };
    }

    function sizeRatio() {
      return canvas.width >= canvas.height ? canvas.width : canvas.height;
    }

    function random(min, max, float) {
      return float
        ? Math.random() * (max - min) + min
        : Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function resize() {
      canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.width * (canvas.clientHeight / canvas.clientWidth);
    }

    function startLink(vertex, length) {
      links.push(new Link(vertex, length));
    }

    function render() {
      if (STAR_CONFIG.randomMotion) {
        n++;
        if (n >= STAR_CONFIG.noiseLength) {
          n = 0;
        }
        nPos = noisePoint(n);
      }

      context.clearRect(0, 0, canvas.width, canvas.height);

      if (STAR_CONFIG.blurSize > 0) {
        context.shadowBlur = STAR_CONFIG.blurSize;
        context.shadowColor = STAR_CONFIG.color;
      }

      if (STAR_CONFIG.renderParticles) {
        for (let i = 0; i < STAR_CONFIG.particleCount; i++) {
          particles[i].render();
        }
      }

      if (STAR_CONFIG.renderMesh) {
        context.beginPath();
        for (let v = 0; v < vertices.length - 1; v++) {
          if ((v + 1) % 3 === 0) continue;

          const p1 = particles[vertices[v]];
          const p2 = particles[vertices[v + 1]];
          const pos1 = position(p1.x, p1.y, p1.z);
          const pos2 = position(p2.x, p2.y, p2.z);

          context.moveTo(pos1.x, pos1.y);
          context.lineTo(pos2.x, pos2.y);
        }

        context.strokeStyle = STAR_CONFIG.color;
        context.lineWidth = STAR_CONFIG.lineWidth;
        context.stroke();
        context.closePath();
      }

      if (STAR_CONFIG.renderLinks) {
        if (random(0, STAR_CONFIG.linkChance) === STAR_CONFIG.linkChance) {
          const length = random(
            STAR_CONFIG.linkLengthMin,
            STAR_CONFIG.linkLengthMax
          );
          const start = random(0, particles.length - 1);
          startLink(start, length);
        }

        for (let l = links.length - 1; l >= 0; l--) {
          if (links[l] && !links[l].finished) {
            links[l].render();
          } else {
            delete links[l];
          }
        }
      }

      if (STAR_CONFIG.renderFlares) {
        for (let j = 0; j < STAR_CONFIG.flareCount; j++) {
          flares[j].render();
        }
      }
    }

    function init() {
      window.requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        ((callback) => window.setTimeout(callback, 1000 / 60));

      resize();
      mouse.x = canvas.clientWidth / 2;
      mouse.y = canvas.clientHeight / 2;

      for (let i = 0; i < STAR_CONFIG.particleCount; i++) {
        const p = new Particle();
        particles.push(p);
        points.push([p.x * c, p.y * c]);
      }

      vertices = Delaunay.triangulate(points);

      let tri = [];
      for (let i = 0; i < vertices.length; i++) {
        if (tri.length === 3) {
          triangles.push(tri);
          tri = [];
        }
        tri.push(vertices[i]);
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = 0; j < triangles.length; j++) {
          const k = triangles[j].indexOf(i);
          if (k !== -1) {
            triangles[j].forEach((value) => {
              if (value !== i && particles[i].neighbors.indexOf(value) === -1) {
                particles[i].neighbors.push(value);
              }
            });
          }
        }
      }

      if (STAR_CONFIG.renderFlares) {
        for (let i = 0; i < STAR_CONFIG.flareCount; i++) {
          flares.push(new Flare());
        }
      }

      if (
        "ontouchstart" in document.documentElement &&
        window.DeviceOrientationEvent
      ) {
        window.addEventListener(
          "deviceorientation",
          (e) => {
            mouse.x =
              canvas.clientWidth / 2 -
              (e.gamma / 90) * (canvas.clientWidth / 2) * 2;
            mouse.y =
              canvas.clientHeight / 2 -
              (e.beta / 90) * (canvas.clientHeight / 2) * 2;
          },
          true
        );
      } else {
        document.body.addEventListener("mousemove", (e) => {
          mouse.x = e.clientX;
          mouse.y = e.clientY;
        });
      }

      (function animloop() {
        requestAnimationFrame(animloop);
        resize();
        render();
      })();
    }

    init();
  }, []);

  return (
    <BrowserRouter>
      <div className="app" onMouseMove={mouseMoveHandler}>
        <canvas id="stars"></canvas>
        <div className={animationState ? "screenCover" : ""}></div>
        <div className={animationState ? "innerScreenCover" : ""}></div>
        <div ref={cursorInnerRef} className="insideCircle"></div>
        <div
          ref={cursorOuterRef}
          className={`outsideCircle ${
            variant === "default" ? "default" : "hover"
          }`}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <ScrollLine />
              </>
            }
          />
          <Route path="/projects/:id" element={<ProjectPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
