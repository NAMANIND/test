import { useEffect } from "react";

const Navbar = () => {
  useEffect(() => {
    // Adding the Google Translate element to the DOM
    const googleTranslateScript = document.createElement("script");
    googleTranslateScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(googleTranslateScript);

    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "et",
          autoDisplay: false,
        },
        "google_translate_element"
      );
      const selectElement = document.querySelector("#google_translate_element select");
      selectElement.selectedIndex = 1; // Set default language
      selectElement.dispatchEvent(new Event("change"));
    };

    // Clean up script when component unmounts
    return () => {
      document.body.removeChild(googleTranslateScript);
    };
  }, []);

  return (
    <>
      <style>
        {`#google_translate_element,.skiptranslate{display:none;}body{top:0!important;}`}
      </style>
      <div id="google_translate_element"></div>
      {/* Your existing Navbar code */}
    </>
  );
};

export default Navbar;
