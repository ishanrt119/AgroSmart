import React from 'react';
import { Language } from '../types';
import Login from './Login';
import LoginHeader from './LoginHeader';
import LoginFooter from './LoginFooter';
import TestimonialCarousel from './TestimonialCarousel';

interface LoginPageProps {
  onLogin: (email: string) => void;
  language: Language;
  toggleLanguage: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, language, toggleLanguage }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <LoginHeader language={language} toggleLanguage={toggleLanguage} />
      <main className="flex-grow w-full max-w-screen-xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[75vh]">
          {/* Left Column: Login Form */}
          <div className="flex justify-center items-center">
            <Login onLogin={onLogin} language={language} />
          </div>
          
          {/* Right Column: Image and Testimonials */}
          <div className="hidden lg:flex flex-col justify-center items-center relative w-full h-full rounded-2xl overflow-hidden min-h-[400px] bg-green-100 dark:bg-green-900/30">
             <img 
                src="https://images.unsplash.com/photo-1597916819322-1d02defa7c06?q=80&w=1887&auto=format&fit=crop" 
                alt="Terraced fields in a hilly region" 
                className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="relative z-10 w-full max-w-md px-8 py-4">
                <TestimonialCarousel />
            </div>
          </div>
        </div>
      </main>
      <LoginFooter />
    </div>
  );
};

export default LoginPage;
