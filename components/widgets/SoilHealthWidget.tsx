
import React from 'react';
import { SoilData, Language } from '../../types';
import Card from '../shared/Card';
import { TRANSLATIONS } from '../../constants';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

interface SoilHealthWidgetProps {
    language: Language;
}

const SoilHealthWidget: React.FC<SoilHealthWidgetProps> = ({ language }) => {
    const t = TRANSLATIONS[language];
    // Dummy Data
    const soilData: SoilData = {
        ph: 6.8,
        moisture: 45,
        nitrogen: 130, // kg/ha
        phosphorus: 40, // kg/ha
        potassium: 180, // kg/ha
    };
    
    const chartData = [
        { name: t.moisture, value: soilData.moisture, fill: '#3b82f6' }
    ];

    return (
        <Card title={t.soilHealth}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart 
                            innerRadius="70%" 
                            outerRadius="100%" 
                            data={chartData} 
                            startAngle={90} 
                            endAngle={-270}
                        >
                            <PolarAngleAxis
                                type="number"
                                domain={[0, 100]}
                                angleAxisId={0}
                                tick={false}
                            />
                            <RadialBar 
                                background 
                                dataKey="value"
                                cornerRadius={10} 
                            />
                            <text 
                                x="50%" 
                                y="50%" 
                                textAnchor="middle" 
                                dominantBaseline="middle" 
                                className="text-2xl font-bold fill-foreground-light dark:fill-foreground-dark"
                            >
                                {`${soilData.moisture}%`}
                            </text>
                             <text 
                                x="50%" 
                                y="65%" 
                                textAnchor="middle" 
                                dominantBaseline="middle" 
                                className="text-sm fill-gray-500 dark:fill-gray-400"
                            >
                                {t.moisture}
                            </text>
                        </RadialBarChart>
                    </ResponsiveContainer>
                </div>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>pH Level:</span> <span className="font-semibold">{soilData.ph}</span></div>
                    <div className="flex justify-between"><span>Nitrogen (N):</span> <span className="font-semibold">{soilData.nitrogen} kg/ha</span></div>
                    <div className="flex justify-between"><span>Phosphorus (P):</span> <span className="font-semibold">{soilData.phosphorus} kg/ha</span></div>
                    <div className="flex justify-between"><span>Potassium (K):</span> <span className="font-semibold">{soilData.potassium} kg/ha</span></div>
                </div>
            </div>
        </Card>
    );
};

export default SoilHealthWidget;
