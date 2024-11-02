import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

// Polyfill for SVG path parsing
const svgPathToPoints = (pathString, sampleInterval = 10) => {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathString);

  const length = path.getTotalLength();
  const points = [];
  for (let i = 0; i <= length; i += sampleInterval) {
    const point = path.getPointAtLength(i);
    points.push({ x: point.x, y: point.y });
  }
  return points;
};

const Hero3D = () => {
  const shipSvgPath = "/mainship.svg";
  const containerSvgPath = "/ship.svg";
  const sceneRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Vertices = Matter.Vertices;

    const engine = Engine.create();
    engineRef.current = engine;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "#ffffff",
      },
    });

    const runner = Runner.create();

    const loadSvgAsVertices = async (svgPath) => {
      try {
        const response = await fetch(svgPath);
        const svgText = await response.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");

        const svgElement = svgDoc.querySelector("svg");
        const viewBox = svgElement.getAttribute("viewBox");
        const [minX, minY, width, height] = viewBox.split(" ").map(Number);

        const pathElement = svgDoc.querySelector("path");
        if (!pathElement) throw new Error("No path found in SVG");

        const pathData = pathElement.getAttribute("d");

        // Use our polyfill to convert path to points
        const points = svgPathToPoints(pathData);

        // Scale and translate points
        const scaledPoints = points.map((p) => ({
          x: (p.x - minX) / width - 0.5,
          y: (p.y - minY) / height - 0.5,
        }));

        return scaledPoints;
      } catch (error) {
        console.error("Error loading SVG:", error);
        return null;
      }
    };

    const createShip = async () => {
      const shipVertices = await loadSvgAsVertices(shipSvgPath);
      if (!shipVertices) return null;

      const shipWidth = window.innerWidth * 0.6;
      const shipHeight = window.innerHeight * 0.3;
      const shipY = window.innerHeight - shipHeight / 2;

      return Bodies.fromVertices(window.innerWidth / 2, shipY, shipVertices, {
        isStatic: true,
        render: {
          sprite: {
            texture: shipSvgPath,
            // xScale: shipWidth / 100,
            // yScale: shipHeight / 100,
          },
        },

        collisionFilter: { group: 1 },
      });
    };

    const createContainer = async () => {
      const containerVertices = await loadSvgAsVertices(containerSvgPath);
      if (!containerVertices) return null;

      const containerWidth = window.innerWidth * 0.1;
      const containerHeight = window.innerHeight * 0.05;

      return Bodies.fromVertices(
        window.innerWidth / 2 -
          window.innerWidth * 0.3 +
          Math.random() * window.innerWidth * 0.6,
        Math.random() * -500 - 10,
        containerVertices,
        {
          render: {
            sprite: {
              texture: containerSvgPath,
            },
          },
          density: 0.0001,
        }
      );
    };

    const initializeScene = async () => {
      const ship = await createShip();
      if (ship) Composite.add(engine.world, ship);

      const containers = await Promise.all(
        Array(20).fill().map(createContainer)
      );
      Composite.add(engine.world, containers.filter(Boolean));

      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { stiffness: 0.4, render: { visible: false } },
      });

      Composite.add(engine.world, mouseConstraint);
      render.mouse = mouse;

      engine.world.gravity.y = 1;

      const minContainers = 15;
      const checkContainers = async () => {
        const visibleContainers = Composite.allBodies(engine.world).filter(
          (body) => body.position.y < window.innerHeight && !body.isStatic
        );

        if (visibleContainers.length < minContainers) {
          const newContainer = await createContainer();
          if (newContainer) Composite.add(engine.world, newContainer);
        }
      };

      Render.run(render);
      Runner.run(runner, engine);

      const intervalId = setInterval(checkContainers, 1000);

      return () => {
        Render.stop(render);
        Runner.stop(runner);
        Engine.clear(engine);
        if (render.canvas && render.canvas.parentNode) {
          render.canvas.parentNode.removeChild(render.canvas);
        }
        clearInterval(intervalId);
      };
    };

    initializeScene();
  }, [shipSvgPath, containerSvgPath]);

  return <div ref={sceneRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default Hero3D;
