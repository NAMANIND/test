import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Language = () => {
  const { i18n } = useTranslation();
  const [showSuggestion, setShowSuggestion] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js";
    document.body.appendChild(script);

    return () => {
      // Check if the script is still part of the document before removing it
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []); // Remove initializeGoogleTranslate from dependency array

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowSuggestion(false);
  };

  return (
    <div className="p-4">
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>

      {showSuggestion && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Language Suggestion</AlertTitle>
          <AlertDescription>
            We detected that your browser language is Spanish. Would you like to
            switch?
            <button
              onClick={() => changeLanguage("es")}
              className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
            >
              Switch to Spanish
            </button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Language;
