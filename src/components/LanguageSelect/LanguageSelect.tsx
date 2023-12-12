import React, { useEffect, useState } from "react";

import clsx from "clsx";
import { getCookie, setCookie } from "cookies-next";

import {
  type Language,
  Languages,
  isPossibleLanguage,
} from "../../utils/language";
import TooltipLabel from "../TooltipLabel";

import styles from "./LanguageSelect.module.scss";

interface LanguageSelectProps {
  onChange: (v: Language) => void;
}

const LanguageSelect = ({ onChange }: LanguageSelectProps) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const userLang = navigator.language;
    const cookieLanguage = getCookie("language");

    if (isPossibleLanguage(cookieLanguage)) {
      setLanguage(cookieLanguage);
    } else if (userLang.includes("de")) {
      setLanguage("de");
    }
  }, []);

  useEffect(() => {
    setCookie("language", language);
    onChange(language);
  }, [language, onChange]);

  return (
    <div className={styles.LanguageSelect}>
      <div className={styles.BG}>
        {Languages.map((lang) => (
          <TooltipLabel key={"lang-" + lang.code} label={lang.label}>
            <button
              className={clsx(
                lang.code === language && styles.isSelected,
                styles.Button
              )}
              onClick={() => {
                setLanguage(lang.code);
              }}
            >
              {lang.code}
            </button>
          </TooltipLabel>
        ))}
      </div>
    </div>
  );
};
export default LanguageSelect;
