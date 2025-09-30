import React, { useState, useEffect } from 'react';
import { Theme, Language, User, Role } from './types';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ChatModal from './components/chat/ChatModal';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [user, setUser] = useState<User | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (theme === Theme.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  const handleLogin = (mobile: string) => {
    // Simulate login
    setUser({
      name: 'Krishna Kumar',
      mobile: mobile,
      role: Role.FARMER,
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => {
      if (prevLang === Language.EN) return Language.HI;
      if (prevLang === Language.HI) return Language.NE;
      return Language.EN; // from NE back to EN
    });
  };

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark font-sans transition-colors duration-300">
      {user ? (
        <>
          <Header 
            user={user} 
            onLogout={handleLogout} 
            theme={theme} 
            toggleTheme={toggleTheme} 
            language={language}
            toggleLanguage={toggleLanguage}
            onChatToggle={toggleChat}
          />
          <main className="p-4 sm:p-6 lg:p-8">
            <Dashboard language={language} />
          </main>
          <ChatModal isOpen={isChatOpen} onClose={toggleChat} language={language} currentUser={{ id: 'user_0', name: 'Krishna Kumar', avatar: 'K' }} />
        </>
      ) : (
        <LoginPage onLogin={handleLogin} language={language} toggleLanguage={toggleLanguage} />
      )}
    </div>
  );
};

export default App;