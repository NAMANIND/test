import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const WorkSection = () => {
  const sectionRef = useRef(null);
  const tilesRef = useRef([]);
  const imagesRef = useRef([]);

  const workItems = [
    {
      title: "Yoda",
      image: "https://imagesplashh.vercel.app/api/image/800/600/Yoda",
      stats: ["77% Avg. session time", "x1.8 Conversions"],
      type: "WEBSITE",
    },
    {
      title: "Indi-e by indigo.ai",
      image: "https://imagesplashh.vercel.app/api/image/800/600/Indi-e",
      type: "WEBSITE",
    },
    {
      title: "Hacksmith",
      image: "https://imagesplashh.vercel.app/api/image/800/600/smith",
      stats: [
        "+151% Avg. session time",
        "+26% Conversions",
        "-92% FAQ inquiries",
      ],
      type: "WEBSITE",
    },
    {
      title: "Uphold",
      image: "https://imagesplashh.vercel.app/api/image/800/600/Uphold",
      stats: ["12% Conversion rate"],
      type: "WEBSITE",
    },
  ];

  useEffect(() => {
    const tiles = tilesRef.current;
    const images = imagesRef.current;
    const section = sectionRef.current;

    // Create filterId for each image
    images.forEach((img, index) => {
      if (!img) return;

      // Create filter effects
      const filter = document.createElement("div");
      filter.innerHTML = `
        <svg style="position: absolute; width: 0; height: 0;">
          <defs>
            <filter id="ferrofluid-${index}">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur" />
              <feDisplacementMap in="blur" in2="SourceGraphic" scale="0" />
              <feMorphology operator="dilate" radius="0" />
              <feColorMatrix type="saturate" values="1.5" />
            </filter>
          </defs>
        </svg>
      `;
      document.body.appendChild(filter);
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const sectionRect = section.getBoundingClientRect();

      tiles.forEach((tile, index) => {
        if (!tile) return;
        const image = images[index];
        if (!image) return;

        const tileRect = tile.getBoundingClientRect();
        const tileCenterX = tileRect.left + tileRect.width / 2;
        const tileCenterY = tileRect.top + tileRect.height / 2;

        const distanceX = clientX - tileCenterX;
        const distanceY = clientY - tileCenterY;
        const distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY
        );

        const radius = 300;
        const imageRadius = 200;

        if (distance < radius) {
          const pull = 1 - distance / radius;
          const moveX = distanceX * pull * 0.3;
          const moveY = distanceY * pull * 0.3;

          // Tile movement
          gsap.to(tile, {
            x: moveX,
            y: moveY,
            scale: 1 + pull * 0.1,
            duration: 0.6,
            ease: "power2.out",
          });

          // Image ferrofluid effect
          if (distance < imageRadius) {
            const imagePull = 1 - distance / imageRadius;
            const filterStrength = imagePull * 20;
            const blurStrength = imagePull * 2;

            gsap.to(image, {
              filter: `url(#ferrofluid-${index}) blur(${blurStrength}px)`,
              scale: 1 + imagePull * 0.15,
              duration: 0.3,
              ease: "power1.out",
            });

            // Update filter values
            const filter = document.querySelector(
              `#ferrofluid-${index} feGaussianBlur`
            );
            const displacementMap = document.querySelector(
              `#ferrofluid-${index} feDisplacementMap`
            );
            if (filter && displacementMap) {
              filter.setAttribute("stdDeviation", blurStrength);
              displacementMap.setAttribute("scale", filterStrength);
            }
          } else {
            // Reset image effects
            gsap.to(image, {
              filter: "none",
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
            });
          }
        } else {
          // Reset everything
          gsap.to(tile, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "power2.out",
          });

          gsap.to(image, {
            filter: "none",
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          });
        }
      });
    };

    section.addEventListener("mousemove", handleMouseMove);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      // Cleanup SVG filters
      document.querySelectorAll('[id^="ferrofluid-"]').forEach((filter) => {
        filter.parentElement?.remove();
      });
    };
  }, []);

  return (
    <div className="p-8 bg-black" ref={sectionRef}>
      <h1 className="text-4xl font-bold text-white mb-8">Work</h1>
      <div className="grid grid-cols-2 gap-6 m-36">
        {workItems.map((item, index) => (
          <div
            key={item.title}
            ref={(el) => (tilesRef.current[index] = el)}
            className="bg-neutral-900 rounded-lg p-6 cursor-pointer transform-gpu"
          >
            <div className="aspect-video bg-neutral-800 rounded-lg mb-4 overflow-hidden">
              <img
                ref={(el) => (imagesRef.current[index] = el)}
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-lg transform-gpu transition-transform"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            {item.stats && (
              <div className="space-y-1">
                {item.stats.map((stat, idx) => (
                  <p key={idx} className="text-sm text-neutral-400">
                    {stat}
                  </p>
                ))}
              </div>
            )}
            <span className="inline-block mt-4 px-3 py-1 bg-neutral-800 text-sm text-neutral-400 rounded">
              {item.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkSection;
