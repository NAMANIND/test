import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const WorkSection = () => {
  const sectionRef = useRef(null);
  const tilesRef = useRef([]);
  const imagesRef = useRef([]);
  const glowRefs = useRef([]);
  const rippleRefs = useRef([]);

  const workItems = [
    {
      title: "Sunset Bliss",
      image: "https://imagesplashh.vercel.app/api/image/800/600/Sunset",
      stats: ["Serenity", "Calmness"],
      type: "PHOTOGRAPHY",
      //   color: "#FF4500",
      color: "#D3D3D3",
    },
    {
      title: "Mountain Majesty",
      image: "https://imagesplashh.vercel.app/api/image/800/600/Mountain",
      stats: ["Grandeur", "Adventure"],
      type: "PHOTOGRAPHY",
      //   color: "#2E8B57",
      color: "#D3D3D3",
    },
    {
      title: "Ocean Depths",
      image: "https://imagesplashh.vercel.app/api/image/800/600/Ocean-Depths",
      stats: ["Mystery", "Tranquility"],
      type: "PHOTOGRAPHY",
      //   color: "#1E90FF",
      color: "#D3D3D3",
    },
    {
      title: "Forest Whisper",
      image: "https://imagesplashh.vercel.app/api/image/800/600/Forest-green",
      stats: ["Peace", "Nature"],
      type: "PHOTOGRAPHY",
      //   color: "#228B22",
      color: "#D3D3D3",
    },
  ];

  useEffect(() => {
    const tiles = tilesRef.current;
    const images = imagesRef.current;
    const glows = glowRefs.current;
    const ripples = rippleRefs.current;
    const section = sectionRef.current;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      tiles.forEach((tile, index) => {
        if (!tile || !images[index]) return;

        const image = images[index];
        const glow = glows[index];
        const ripple = ripples[index];
        const tileRect = tile.getBoundingClientRect();
        const tileCenterX = tileRect.left + tileRect.width / 2;
        const tileCenterY = tileRect.top + tileRect.height / 2;

        // Calculate distances
        const distanceX = clientX - tileCenterX;
        const distanceY = clientY - tileCenterY;
        const distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY
        );
        const radius = 300;

        if (distance < radius) {
          const pull = 1 - distance / radius;
          const moveX = distanceX * pull * 0.3;
          const moveY = distanceY * pull * 0.3;

          // Update tile position
          gsap.to(tile, {
            x: moveX,
            y: moveY,
            scale: 1 + pull * 0.1,
            duration: 0.6,
            ease: "power2.out",
          });

          // Repel image
          gsap.to(image, {
            x: -moveX * 1.01,
            y: -moveY * 1.01,
            scale: 1 - pull * 0.1,
            duration: 0.3,
            ease: "power1.out",
          });

          // Update glow effect position
          const glowX = distanceX;
          const glowY = distanceY;

          gsap.to(glow, {
            opacity: pull * 0.9,
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${workItems[index].color}30 0%, transparent 70%)`,
            duration: 0.3,
          });

          // Animate ripple gradient
          gsap.to(ripple, {
            opacity: pull * 0.6,
            scale: 1 + pull * 0.8,
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${workItems[index].color}33 0%, transparent 75%)`,
            duration: 0.6,
          });
        } else {
          // Reset all animations
          gsap.to([tile, image], {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          });

          gsap.to([glow, ripple], {
            opacity: 0,
            scale: 1,
            duration: 0.4,
          });
        }
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black py-24 px-8 md:px-16" ref={sectionRef}>
      {/* Header with improved spacing */}
      <div className="max-w-7xl mx-auto mb-24">
        <h1 className="text-7xl font-extralight text-white text-center tracking-tight font-Bitter">
          Work
        </h1>
      </div>

      {/* Grid with improved spacing and max-width */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {workItems.map((item, index) => (
          <div
            key={item.title}
            ref={(el) => (tilesRef.current[index] = el)}
            className="group relative bg-neutral-900/80  rounded-2xl p-8 cursor-pointer transform-gpu overflow-hidden border border-neutral-800/50 hover:border-neutral-700/50 transition-colors h-full"
          >
            {/* Border light effect layer */}
            <div
              ref={(el) => (rippleRefs.current[index] = el)}
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{ zIndex: 2 }}
            />
            <div
              ref={(el) => (glowRefs.current[index] = el)}
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{ zIndex: 1 }}
            />

            {/* Image container with improved spacing */}
            <div
              className="relative aspect-video rounded-xl mb-6 overflow-hidden bg-neutral-900"
              style={{ zIndex: 2 }}
            >
              <img
                ref={(el) => (imagesRef.current[index] = el)}
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform-gpu rounded-xl"
              />
            </div>

            {/* Title and type badge with improved layout */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="md:text-4xl text-2xl font-extralight tracking-tight text-white font-Bitter">
                {item.title}
              </h3>

              {/* Type badge
                add on hover effect complete border with color will from left to right circle with the item.color */}

              <span
                className={`px-3 py-1 bg-neutral-800 text-sm text-neutral-300 border-4 border-transparent  rounded-full font-Questrial
                 hover:border-solid hover:border-neutral-500/50 transition-all duration-300 ease-in-out hover:bg-neutral-900/50
                
                `}
              >
                {item.type}
              </span>
            </div>

            {/* Stats with improved styling */}
            {item.stats && (
              <div className="flex flex-wrap gap-3">
                {item.stats.map((stat, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-neutral-800/50 backdrop-blur-sm text-lg text-neutral-300 border border-neutral-700/30 rounded-lg font-Questrial  "
                  >
                    {stat}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkSection;
