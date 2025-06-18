import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../button";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    if (savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
      document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (lang: string) => {
    if (lang !== currentLanguage) {
      i18n.changeLanguage(lang).then(() => {
        localStorage.setItem("language", lang);
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        setCurrentLanguage(lang);

        if (process.env.NODE_ENV === "development") {
        }
      });
    }
  };

  return (
    <div>
      <Button
        onClick={() => handleLanguageChange("en")}
        disabled={currentLanguage === "en"}
      >
        English
      </Button>
      <Button
        onClick={() => handleLanguageChange("ar")}
        disabled={currentLanguage === "ar"}
      >
        عربي
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
