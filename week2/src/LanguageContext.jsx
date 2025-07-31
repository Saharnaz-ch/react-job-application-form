import { createContext, useContext, useState } from "react";
import { languages } from "./languageCard";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("english");

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  const selectedLanguageData = languages.find(
    (langObj) => langObj.language === currentLanguage
  );
  return (
    <LanguageContext.Provider
      value={{ currentLanguage, changeLanguage, selectedLanguageData }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);
