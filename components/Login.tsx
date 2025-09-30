import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, ICONS } from '../constants';

interface LoginProps {
  onLogin: (mobile: string) => void;
  language: Language;
}

const Login: React.FC<LoginProps> = ({ onLogin, language }) => {
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const t = TRANSLATIONS[language];

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.match(/^\d{10}$/)) {
      setError('');
      setMessage(t.otpSent);
      setStep('otp');
    } else {
      setError(t.invalidMobile);
    }
  };

  const handleSubmitOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Prototype: Hardcoded OTP is "2806"
    if (otp === '2806') {
      onLogin(mobile);
    } else {
      setError(t.invalidOtp);
    }
  };
  
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only digits and max length of 10
    if (/^\d*$/.test(value) && value.length <= 10) {
      setMobile(value);
    }
  };
  
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only digits and max length of 4
    if (/^\d*$/.test(value) && value.length <= 4) {
      setOtp(value);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{t.loginTitle}</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{t.loginSubtitle}</p>
      </div>
      
      {step === 'mobile' ? (
        <form className="space-y-6" onSubmit={handleSendOtp}>
          <div>
            <label htmlFor="mobile-number" className="sr-only">{t.mobileLabel}</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICONS.PHONE} /></svg>
              </span>
              <input
                id="mobile-number"
                name="mobile"
                type="tel"
                autoComplete="tel"
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-slate-600 rounded-md placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                placeholder={t.mobilePlaceholder}
                value={mobile}
                onChange={handleMobileChange}
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition duration-150 ease-in-out"
            >
              {t.sendOtpButton}
            </button>
          </div>
        </form>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmitOtp}>
            <div>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                {t.mobileLabel}: <span className="font-bold">{mobile}</span>
                <button type="button" onClick={() => { setStep('mobile'); setError(''); setMessage(''); }} className="ml-2 font-medium text-primary hover:text-primary-dark text-xs">(Change)</button>
              </p>
            </div>
            <div>
                <label htmlFor="otp" className="sr-only">{t.otpLabel}</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICONS.OTP} /></svg>
                    </span>
                    <input
                        id="otp"
                        name="otp"
                        type="tel"
                        maxLength={4}
                        required
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-slate-600 rounded-md placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                        placeholder={t.otpPlaceholder}
                        value={otp}
                        onChange={handleOtpChange}
                    />
                </div>
            </div>
            {message && !error && <p className="text-sm text-green-600 text-center">{message}</p>}
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition duration-150 ease-in-out"
                >
                    {t.verifyButton}
                </button>
            </div>
             <div className="text-center text-sm">
                <button type="button" className="font-medium text-primary hover:text-primary-dark">{t.resendOtp}</button>
            </div>
        </form>
      )}

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-slate-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background-light dark:bg-background-dark text-gray-500 dark:text-gray-400">Or continue with</span>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="button"
            className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICONS.GOOGLE}/></svg>
            <span className="ml-2">Login with Google</span>
          </button>
        </div>
      </div>
      
      <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account? <a href="#" className="font-medium text-primary hover:text-primary-dark">Sign up</a>
      </p>
    </div>
  );
};

export default Login;