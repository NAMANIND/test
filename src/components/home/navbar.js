import React, { useEffect, useState } from "react";
import AutoTranslate from "@/components/home/translate";
import Language from "../language/Language";

function Navbar() {
  const [userLocation, setUserLocation] = useState(null);
  const [showPopup, setShowPopup] = useState(true); // State to handle popup visibility

  useEffect(() => {
    // Get the user's location using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        )
          .then((response) => response.json())
          .then((data) => {
            setUserLocation({
              city: data.address.city,
              state: data.address.state,
              country: data.address.country,
            });
            initGoogleTranslate();
          });
      });
    } else {
      // Fallback if geolocation is not available
      initGoogleTranslate();
    }

    // Initialize Google Translate with multiple languages
    const initGoogleTranslate = () => {
      const googleTranslateScript = document.createElement("script");
      googleTranslateScript.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(googleTranslateScript);

      window.googleTranslateElementInit = function () {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages:
              "en,hi,gu,kn,ml,mr,ta,te,bn,pa,or,as,ur,sr,sd,ne,bg,es,fr,de,ru,zh,ja", // Example: Indian regional + some international languages
            autoDisplay: true,
          },
          "google_translate_element"
        );
        const selectElement = document.querySelector(
          "#google_translate_element select"
        );
        selectElement.selectedIndex = 1; // Set default language
        selectElement.dispatchEvent(new Event("change"));
      };
    };

    // Clean up the script when the component unmounts
    return () => {
      const googleTranslateScript = document.querySelector(
        'script[src*="translate_a/element.js"]'
      );
      if (googleTranslateScript) {
        document.body.removeChild(googleTranslateScript);
      }
    };
  }, []);

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <nav className="py-6">
      <style>
        {`
          #google_translate_element .skiptranslate {
            display: none;
          }
          body {
            top: 0 !important;
          }
        `}
      </style>

      {/* Google Translate Element */}
      <div id="google_translate_element"></div>

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
          {/* Location info can be added back if needed */}
          {/* <p className="text-sm text-gray-600">
              Your location: {userLocation?.city}, {userLocation?.state}, {userLocation?.country}
          </p> */}
        </div>
      </div>

      {/* Small Popup Component */}
      {showPopup && <Language />}
    </nav>
  );
}

export default Navbar;
