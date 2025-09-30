import React from 'react';
import { User, Theme, Language } from '../types';
import { TRANSLATIONS, ICONS } from '../constants';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  onChatToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, theme, toggleTheme, language, toggleLanguage, onChatToggle }) => {
  const t = TRANSLATIONS[language];

  const getNextLanguageName = () => {
    if (language === Language.EN) return 'हिन्दी';
    if (language === Language.HI) return 'नेपाली';
    return 'English';
  };

  return (
    <header className="bg-card-light dark:bg-card-dark shadow-md p-4 flex justify-between items-center sticky top-0 z-10 border-b border-border-light dark:border-border-dark">
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICONS.LEAF} /></svg>
        <h1 className="text-xl font-bold text-primary">{t.appTitle}</h1>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button onClick={toggleLanguage} className="text-foreground-light dark:text-foreground-dark font-semibold text-sm rounded-md px-2 py-1 hover:bg-gray-100 dark:hover:bg-slate-700">
          {getNextLanguageName()}
        </button>
        <button onClick={onChatToggle} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICONS.CHAT} />
          </svg>
        </button>
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={theme === 'light' ? ICONS.MOON : ICONS.SUN} />
          </svg>
        </button>
        <div className="relative group">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold cursor-pointer">
            {user.name.charAt(0)}
          </div>
          <div className="absolute right-0 mt-2 w-48 bg-card-light dark:bg-card-dark rounded-md shadow-lg py-1 hidden group-hover:block border border-border-light dark:border-border-dark">
            <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
              <p className="font-semibold">{user.name}</p>
              <p className="truncate">{user.mobile}</p>
            </div>
            <div className="border-t border-border-light dark:border-border-dark my-1"></div>
            <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICONS.LOGOUT} /></svg>
              <span>{t.logout}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;