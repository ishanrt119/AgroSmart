import React from 'react';
import { Language } from '../types';
import WeatherWidget from './widgets/WeatherWidget';
import SoilHealthWidget from './widgets/SoilHealthWidget';
import CropRecommendationWidget from './widgets/CropRecommendationWidget';
import IoTDataWidget from './widgets/IoTDataWidget';
import MarketPricesWidget from './widgets/MarketPricesWidget';
import CommunityForumWidget from './widgets/CommunityForumWidget';
import { TRANSLATIONS } from '../constants';
import WaterStorageWidget from './widgets/WaterStorageWidget';
import AdvertisementsWidget from './widgets/AdvertisementsWidget';
import GovernmentSchemesWidget from './widgets/GovernmentSchemesWidget';

interface DashboardProps {
    language: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ language }) => {
    const t = TRANSLATIONS[language];
    return (
        <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground-light dark:text-foreground-dark">{t.dashboardTitle}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-1 space-y-6">
                    <WeatherWidget language={language} />
                    <SoilHealthWidget language={language} />
                    <WaterStorageWidget language={language} />
                </div>

                {/* Middle Column */}
                <div className="lg:col-span-2 space-y-6">
                    <CropRecommendationWidget language={language} />
                    <IoTDataWidget language={language} />
                </div>
            </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <MarketPricesWidget language={language} />
                 <CommunityForumWidget language={language} />
            </div>
            <AdvertisementsWidget language={language} />
            <GovernmentSchemesWidget language={language} />
        </div>
    );
};

export default Dashboard;