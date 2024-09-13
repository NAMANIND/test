import React from "react";
import AutoTranslate from "@/components/home/translate";

function Navbar() {
  return (
    <nav className="py-6">
      <div className="box-border mx-auto w-[1100px] max-2xl:w-[1200px] max-xl:w-[920px] max-lg:w-[680px] max-md:w-[440px] max-sm:w-[340px] flex flex-row items-center justify-between">
        <div className="navbar-logo-wrapper">
          <a href="/" className="flex flex-row gap-2 items-center">
            <p className="text-lg font-bold leading-none text-gray-800">
              Transformo Doc
            </p>
          </a>
        </div>
        <div className="navbar-actions-wrapper flex flex-row items-center gap-6">
        <AutoTranslate />
          <a href="#">
          
            <small className="small-text text-sm font-medium leading-none "></small>
          </a>

{/* 
          <a target="" href="/idea">
            <button className="whitespace-nowrap flex flex-row items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-b from-neutral-600 to-neutral-900 text-white shadow-md hover:brightness-105 hover:shadow-lg transition-all duration-200 ease-in-out h-10 px-4 py-2">
              Idea behind Transformo doc
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" ml-1 h-4 w-4 "
                class="tabler-icon tabler-icon-chevron-right"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l6 6l-6 6"></path>
              </svg>
            </button>
          </a>
           */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
