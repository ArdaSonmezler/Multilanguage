import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'tr' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
            {i18n.language === 'en' ? 'Türkçe' : 'English'}
        </button>
    );
};

export default LanguageSwitcher;