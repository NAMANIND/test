"use client";
import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import decomp from "poly-decomp";
import "pathseg";

Matter.Common.setDecomp(decomp);

import { Ground } from "./ok";
import Navbar from "../home/navbar";
import Homesection from "../home/Homesection";

const Hero3D = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const groundRef = useRef(null);

  useEffect(() => {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    // create engine
    const engine = Engine.create();
    engineRef.current = engine;

    // create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent",
      },
    });

    // create runner
    const runner = Runner.create();

    // Create ship
    const shipWidth = window.innerWidth * 0.6;
    const shipHeight = window.innerHeight * 0.3;
    const shipY = window.innerHeight - shipHeight / 2;

    // Ship hull (bottom part)
    // const shipHull = Bodies.trapezoid(
    //   window.innerWidth / 2,
    //   shipY + shipHeight / 4,
    //   shipWidth * 1.05,
    //   shipHeight / 2,
    //   0.1,
    //   {
    //     isStatic: true,
    //     render: { fillStyle: "#1B53C2" },
    //     collisionFilter: {
    //       group: -1,
    //     },
    //     chamfer: { radius: [0, 0, 0, 0] },
    //   }
    // );

    // Ship deck
    // const shipDeck = Bodies.rectangle(
    //   window.innerWidth / 2,
    //   shipY - shipHeight / 8,
    //   shipWidth * 1.05,
    //   shipHeight / 4,
    //   {
    //     isStatic: true,
    //     render: { fillStyle: "#3498DB" },
    //     collisionFilter: {
    //       group: -1,
    //     },
    //     chamfer: { radius: [10, 10, 10, 10] },
    //   }
    // );

    const getPathElement = (d) => {
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute("d", d);
      return path;
    };

    // Create ground using the Ground component's path
    const ground = Matter.Bodies.fromVertices(
      window.innerWidth * 0.625 + 30,
      shipY - shipHeight / 2 + 30,
      Matter.Vertices.scale(
        Matter.Svg.pathToVertices(getPathElement(Ground.path), 30),
        3,
        3
      ),
      { isStatic: true, render: { fillStyle: "trasparent" } },
      true
    );
    ground.width = Ground.size.width;
    ground.height = Ground.size.height;
    ground.scale = { x: 3, y: 3 };
    Composite.add(engine.world, ground);

    const transformRef = (ref, item, offset) => {
      if (!ref || !item) {
        return;
      }

      const hw = item.width * 0.94;
      const hh = item.height * 0.458;
      const x = item.position.x - hw + (offset?.x || 0);
      const y = item.position.y - hh + (offset?.y || 0);
      const a = item.angle;

      ref.setAttribute(
        "transform",
        `translate(${x} ${y}) rotate(${a * 57.2958} ${hw} ${hh} ) scale(${
          item.scale.x
        } ${item.scale.y})`
      );
    };

    Matter.Events.on(runner, "beforeTick", (e) => {
      transformRef(groundRef.current, ground);
    });

    // // Ship bridge
    // const bridgeWidth = shipWidth * 0.2;
    // const bridgeHeight = shipHeight * 0.8;
    // const shipBridge = Bodies.rectangle(
    //   window.innerWidth / 2 + shipWidth * 0.3,
    //   shipY - shipHeight / 4 - bridgeHeight / 2,
    //   bridgeWidth,
    //   bridgeHeight,
    //   {
    //     isStatic: true,
    //     render: { fillStyle: "#ADD8E6" },
    //     collisionFilter: {
    //       group: -1,
    //     },
    //   }
    // );

    // // Small bridge on the right
    // const smallBridgeWidth = shipWidth * 0.1;
    // const smallBridgeHeight = shipHeight * 0.4;
    // const smallBridge = Bodies.rectangle(
    //   window.innerWidth / 2 + shipWidth * 0.3,
    //   shipY - shipHeight / 4 - bridgeHeight - smallBridgeHeight / 2,
    //   smallBridgeWidth,
    //   smallBridgeHeight,
    //   {
    //     isStatic: true,
    //     render: { fillStyle: "#1B53C2" },
    //     collisionFilter: {
    //       group: -1,
    //     },
    //   }
    // );

    // Function to create a container
    const createContainer = () => {
      const images = ["/red.png", "/white.png", "/blue.png", "/yellow.png"];
      const bodyWidth = shipWidth * 0.1;
      const bodyHeight = shipWidth * 0.05;

      return Bodies.rectangle(
        Math.random() * window.innerWidth,
        Math.random() * -500 - 10,
        bodyWidth,
        bodyHeight,
        {
          render: {
            sprite: {
              texture: images[Math.floor(Math.random() * images.length)],
              xScale: 1.7, // Adjust to the actual width of your image
              yScale: 1.7, // Adjust to the actual height of your image
            },
          },
          density: 0.0001,
        }
      );
    };

    // Initial containers
    const containers = Array(20).fill().map(createContainer);

    Composite.add(engine.world, [
      // shipHull,
      // shipDeck,
      // shipBridge,
      // smallBridge,
      ...containers,
    ]);

    // add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.4,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(engine.world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // adjust gravity
    engine.world.gravity.y = 1;

    // Function to check and add containers
    const minContainers = 15;
    const checkContainers = () => {
      const visibleContainers = Composite.allBodies(engine.world).filter(
        (body) => body.position.y < window.innerHeight && !body.isStatic
      );

      if (visibleContainers.length < minContainers) {
        const newContainer = createContainer();
        // Ensure the container is dropped in the middle part of the screen
        Matter.Body.setPosition(newContainer, {
          x: window.innerWidth / 2 + (Math.random() - 0.5) * shipWidth * 0.8,
          y: Math.random() * -500 - 10,
        });
        Composite.add(engine.world, newContainer);
      }
    };

    // run the renderer
    Render.run(render);

    // run the engine
    Runner.run(runner, engine);

    // Check containers periodically
    const intervalId = setInterval(checkContainers, 1000);

    // Cleanup function
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);

      // Remove the canvas element
      if (render.canvas && render.canvas.parentNode) {
        render.canvas.parentNode.removeChild(render.canvas);
      }

      clearInterval(intervalId);
    };
  }, []); // Only run once when component mounts

  return (
    <>
      <div
        ref={sceneRef}
        style={{ width: "100vw", height: "100vh", position: "relative" }}
        className="z-10 bg-sky-300/60"
      ></div>{" "}
      <svg
        width={440}
        height={117}
        className=" absolute top-0 z-10 block box-border"
        ref={groundRef}
        style={{ pointerEvents: "none" }}
      >
        <Ground />
      </svg>
      <nav
        className="w-screen flex items-center justify-center align-middle px-8 py-4 fixed top-0 z-20"
        style={{ pointerEvents: "none" }}
      >
        <Navbar />
      </nav>
      <div
        className="w-screen flex items-center justify-center bg-sky-600 align-middle px-8 py-4 h-16 absolute bottom-0 z-9"
        style={{ pointerEvents: "none" }}
      ></div>
      <div className="w-full overflow-hidden absolute bottom-0 h-12  z-20">
        <img src="/wave.svg" alt="wave" className="w-full object-contain " />
      </div>
      <div
        className="w-screen flex items-center justify-center align-middle px-8 py-4 fixed top-0 z-20"
        style={{ pointerEvents: "none" }}
      >
        <Homesection />
      </div>
    </>
  );
};

export default Hero3D;
