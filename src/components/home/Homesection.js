"use client";
import React from "react";
import { useState } from "react";

function Homesection() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = (e) => {
    e.preventDefault();
    setIsPopupOpen(!isPopupOpen);
  };
  return (
    <div className="w-full dotted-background relative flex flex-col items-center justify-center">
      <div className="flex items-center justify-center max-md:hidden">
        <section className="py-16 max-md:py-12">
          <section className="mx-auto flex justify-center max-w-[980px]  flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
            {/* <a className="bg-slate-50 inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-sans">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                class="lucide lucide-blocks h-4 w-4"
                lg="[object Object]"
                x="[object Object]"
              >
                <rect width="7" height="7" x="14" y={3} rx={1}></rect>
                <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"></path>
              </svg>
              <span className="mx-3 text-[#324A5E]">
                Temporily out of service
              </span>
            </a> */}

            <h1 className="text-center text-xl font-bold !text-[#324A5E] leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
              building images effortlessly.
            </h1>
            <span
              className="max-w-[750px] text-center text-lg font-normal   text-[#324A5E]/90 "
              style={{
                display: "inline-block",
                verticalAlign: "top",
                textDecoration: "inherit",
                textWrap: "balance",
              }}
            >
              A Internal Developer platform for creating kubernetes native
              container images without installing any containerization tools and
              without writing dockerfiles.
            </span>

            <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
              <a href="/build">
                <button className="cursor-pointer whitespace-nowrap flex flex-row items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-b from-[#5e7286] to-[#324A5E] text-white shadow-md hover:brightness-105 hover:shadow-lg transition-all duration-200 ease-in-out h-10 px-4 py-2">
                  Getting Started
                </button>
              </a>
              <a href="#" onClick={togglePopup}>
                <button className="whitespace-nowrap flex flex-row items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2   text-[#324A5E]">
                  Help us improve
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="lucide lucide-arrow-right ml-1 h-4 w-4 transition-transform duration-300 ease-in-out transform hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#324A5E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </a>
              {/* <FeedbackPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
              /> */}
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}

export default Homesection;
