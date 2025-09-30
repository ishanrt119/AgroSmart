import React from 'react';
import { WaterStorageData, Language } from '../../types';
import Card from '../shared/Card';
import { TRANSLATIONS } from '../../constants';

interface WaterStorageWidgetProps {
    language: Language;
}

const WaterStorageWidget: React.FC<WaterStorageWidgetProps> = ({ language }) => {
    const t = TRANSLATIONS[language];
    
    // Dummy Data
    const waterData: WaterStorageData = {
        levelPercent: 75,
        capacityLiters: 5000,
    };

    const currentLiters = (waterData.capacityLiters * waterData.levelPercent / 100).toLocaleString('en-IN');
    const capacityLitersFormatted = waterData.capacityLiters.toLocaleString('en-IN');

    return (
        <Card title={t.waterStorage}>
            <div className="flex flex-col items-center space-y-4">
                <div className="relative w-32 h-48 bg-gray-200 dark:bg-slate-700 rounded-lg border-2 border-gray-300 dark:border-slate-600 overflow-hidden">
                    <div 
                        className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all duration-500"
                        style={{ height: `${waterData.levelPercent}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                            {waterData.levelPercent}%
                        </span>
                    </div>
                </div>
                <div className="text-center">
                    <p className="font-semibold text-lg">{t.tankLevel}</p>
                    <p className="text-gray-500 dark:text-gray-400">
                        {currentLiters} / {capacityLitersFormatted} {t.liters}
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default WaterStorageWidget;