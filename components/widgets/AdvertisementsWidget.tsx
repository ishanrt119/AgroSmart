import React, { useState, useEffect } from 'react';
import { Advertisement, Language } from '../../types';
import Card from '../shared/Card';
import { getAdvertisements, generateImageFromPrompt } from '../../services/geminiService';
import { TRANSLATIONS } from '../../constants';

interface AdvertisementsWidgetProps {
  language: Language;
}

const AdvertisementsWidget: React.FC<AdvertisementsWidgetProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAds = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // 1. Fetch ad details
        const adDetails = await getAdvertisements();
        // Set ads initially without images so UI can update with text
        setAds(adDetails);

        // 2. Fetch images for each ad concurrently
        const imagePromises = adDetails.map((ad, index) =>
          generateImageFromPrompt(ad.imagePrompt).then(imageUrl => {
            // Update state as each image comes in
            setAds(prevAds => {
                const newAds = [...prevAds];
                if (newAds[index]) {
                  newAds[index] = { ...newAds[index], imageUrl };
                }
                return newAds;
            });
          })
        );

        await Promise.all(imagePromises);

      } catch (err) {
        setError(t.adsError);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAds();
  }, [language, t.adsError]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-[250px]">
          <svg className="animate-spin h-8 w-8 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>{t.loadingAds}</p>
        </div>
      );
    }
    
    if (error) {
      return <p className="text-center text-red-500 p-8">{error}</p>;
    }

    if (ads.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad, index) => (
            <div key={index} className="border border-border-light dark:border-border-dark rounded-lg overflow-hidden bg-background-light dark:bg-background-dark flex flex-col">
              <div className="h-48 bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
                {ad.imageUrl ? (
                  <img src={ad.imageUrl} alt={ad.productName} className="w-full h-full object-cover" />
                ) : (
                  <svg className="animate-spin h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <p className="text-xs font-semibold text-secondary uppercase">{ad.company}</p>
                <h5 className="font-bold text-lg text-primary mt-1">{ad.productName}</h5>
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-400 flex-grow">{ad.description}</p>
                <div className="mt-4">
                    <button className="w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light">
                        {ad.callToActionText}
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <Card title={t.advertisements}>
      {renderContent()}
    </Card>
  );
};

export default AdvertisementsWidget;