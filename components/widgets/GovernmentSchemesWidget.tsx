import React, { useState, useEffect } from 'react';
import { GovernmentScheme, Language } from '../../types';
import Card from '../shared/Card';
import { getGovernmentSchemes } from '../../services/geminiService';
import { TRANSLATIONS } from '../../constants';

interface GovernmentSchemesWidgetProps {
  language: Language;
}

const GovernmentSchemesWidget: React.FC<GovernmentSchemesWidgetProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openSchemeIndex, setOpenSchemeIndex] = useState<number | null>(0);

  useEffect(() => {
    const loadSchemes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const schemeData = await getGovernmentSchemes();
        setSchemes(schemeData);
      } catch (err) {
        setError(t.schemesError);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadSchemes();
  }, [language, t.schemesError]);

  const toggleScheme = (index: number) => {
    setOpenSchemeIndex(openSchemeIndex === index ? null : index);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-8 text-center min-h-[200px]">
          <svg className="animate-spin h-8 w-8 text-primary mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>{t.loadingSchemes}</p>
        </div>
      );
    }
    
    if (error) {
      return <p className="text-center text-red-500 p-8">{error}</p>;
    }

    if (schemes.length > 0) {
      return (
        <div className="space-y-2">
          {schemes.map((scheme, index) => (
            <div key={index} className="border border-border-light dark:border-border-dark rounded-lg">
              <button
                onClick={() => toggleScheme(index)}
                className="w-full flex justify-between items-center p-4 text-left"
                aria-expanded={openSchemeIndex === index}
              >
                <div>
                  <h4 className="font-semibold text-primary">{scheme.schemeName}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.issuingBody}: {scheme.issuingBody}</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transform transition-transform ${openSchemeIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openSchemeIndex === index && (
                <div className="px-4 pb-4 border-t border-border-light dark:border-border-dark">
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{scheme.description}</p>
                  
                  <div className="mt-4">
                    <h5 className="font-semibold text-sm">{t.benefits}</h5>
                    <ul className="list-disc list-inside mt-1 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      {scheme.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h5 className="font-semibold text-sm">{t.eligibility}</h5>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{scheme.eligibility}</p>
                  </div>
                  
                  <div className="mt-4">
                    <a 
                      href={scheme.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {t.officialLink} &rarr;
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <Card title={t.governmentSchemes}>
      {renderContent()}
    </Card>
  );
};

export default GovernmentSchemesWidget;