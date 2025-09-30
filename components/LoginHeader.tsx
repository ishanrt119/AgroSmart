import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS, ICONS } from '../constants';

interface LoginHeaderProps {
  language: Language;
  toggleLanguage: () => void;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ language, toggleLanguage }) => {
    const t = TRANSLATIONS[language];

    const getNextLanguageName = () => {
      if (language === Language.EN) return 'हिन्दी';
      if (language === Language.HI) return 'नेपाली';
      return 'English';
    };

    return (
        <header className="bg-transparent p-4 sm:p-6 w-full max-w-screen-xl mx-auto">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICONS.LEAF} /></svg>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white">{t.appTitle}</h1>
                </div>
                <nav className="flex items-center space-x-4 md:space-x-6">
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light hidden md:block">Features</a>
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light hidden md:block">About Us</a>
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light hidden md:block">Contact</a>
                    <button onClick={toggleLanguage} className="text-foreground-light dark:text-foreground-dark font-semibold text-sm rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-800">
                        {getNextLanguageName()}
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default LoginHeader;