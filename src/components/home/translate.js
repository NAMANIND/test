import React, { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AutoTranslate = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [googleTranslateLoaded, setGoogleTranslateLoaded] = useState(false);

  const languageOptions = {
    en: 'English',
    hi: 'हिन्दी (Hindi)',
    bn: 'বাংলা (Bengali)',
    te: 'తెలుగు (Telugu)',
    mr: 'मराठी (Marathi)',
    ta: 'தமிழ் (Tamil)',
    ur: 'اردو (Urdu)',
    gu: 'ગુજરાતી (Gujarati)',
    kn: 'ಕನ್ನಡ (Kannada)',
    ml: 'മലയാളം (Malayalam)',
    or: 'ଓଡ଼ിଆ (Odia)',
    pa: 'ਪੰਜਾਬੀ (Punjabi)',
    as: 'অসমীয়া (Assamese)'
  };

  const initializeGoogleTranslate = useCallback(() => {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: Object.keys(languageOptions).join(','),
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: true,
      }, 'google_translate_element');
      setGoogleTranslateLoaded(true);
    }
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = initializeGoogleTranslate;

    return () => {
      document.body.removeChild(script);
    };
  }, [initializeGoogleTranslate]);

  const translatePage = useCallback((lang) => {
    if (googleTranslateLoaded) {
      const selectElement = document.querySelector('.goog-te-combo');
      if (selectElement) {
        selectElement.value = lang;
        selectElement.dispatchEvent(new Event('change'));
      }
    }
  }, [googleTranslateLoaded]);

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    setShowPopup(false);
    translatePage(lang);
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      <Button 
        onClick={() => setShowPopup(true)}
        className="whitespace-nowrap flex flex-row items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-b from-neutral-600 to-neutral-900 text-white shadow-md hover:brightness-105 hover:shadow-lg transition-all duration-200 ease-in-out h-10 px-4 py-2"
      >
        Language Settings
      </Button>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Choose Your Preferred Language</h2>
            <Select onValueChange={handleLanguageSelect} defaultValue={selectedLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(languageOptions).map(([code, name]) => (
                  <SelectItem key={code} value={code}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={() => setShowPopup(false)} 
              className="mt-4 w-full"
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AutoTranslate;