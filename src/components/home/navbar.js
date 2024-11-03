import React from "react";
import { Ship } from "lucide-react";

function Navbar() {
  return (
    <nav className="py-6">
      <div className="box-border mx-auto w-[1100px] max-2xl:w-[1200px] max-xl:w-[920px] max-lg:w-[680px] max-md:w-[440px] max-sm:w-[340px] flex flex-row items-center justify-between">
        <div className="navbar-logo-wrapper">
          <a href="/" className="flex flex-row gap-2 items-center">
            <Ship className="h-8 w-8 " color="#324A5E" />
            <p
              className="small-text  text-[#324A5E] 
            text-center text-xl font-bold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]
            "
            >
              shipper
            </p>
          </a>
        </div>
        <div className="navbar-actions-wrapper flex flex-row items-center gap-6">
          <a href="#">
            <small className="small-text text-sm font-medium leading-none "></small>
          </a>

          <a target="__blank" href="https://x.com/twtadarsh">
            <button className='class="whitespace-nowrap flex flex-row items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2   "'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#324A5E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                class="tabler-icon tabler-icon-brand-x"
                lg="[object Object]"
                x="[object Object]"
              >
                <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
              </svg>
            </button>
          </a>

          <a target="" href="/idea">
            <button className="whitespace-nowrap flex flex-row items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-b from-[#5e7286] to-[#324A5E] text-white shadow-md hover:brightness-105 hover:shadow-lg transition-all duration-200 ease-in-out h-10 px-4 py-2">
              Idea behind Shipper
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
