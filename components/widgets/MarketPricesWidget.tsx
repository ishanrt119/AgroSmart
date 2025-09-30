import React from 'react';
import { Language, MarketPrice } from '../../types';
import Card from '../shared/Card';
import { TRANSLATIONS } from '../../constants';

interface MarketPricesWidgetProps {
    language: Language;
}

const MarketPricesWidget: React.FC<MarketPricesWidgetProps> = ({ language }) => {
    const t = TRANSLATIONS[language];
    // Dummy Data
    const marketData: MarketPrice[] = [
        { crop: 'Wheat', price: 2100, change: 25 },
        { crop: 'Maize', price: 1950, change: -10 },
        { crop: 'Potato', price: 1500, change: 50 },
        { crop: 'Tomato', price: 2500, change: -75 },
        { crop: 'Ginger', price: 8000, change: 150 },
    ];

    return (
        <Card title={t.marketPrices}>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">{t.crop}</th>
                            <th scope="col" className="px-4 py-3 text-right">{t.price}</th>
                            <th scope="col" className="px-4 py-3 text-right">{t.change}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marketData.map((item) => (
                            <tr key={item.crop} className="border-b dark:border-gray-700">
                                <th scope="row" className="px-4 py-3 font-medium whitespace-nowrap text-gray-900 dark:text-gray-100">{item.crop}</th>
                                <td className="px-4 py-3 text-right text-gray-900 dark:text-gray-100">₹{item.price.toLocaleString('en-IN')}</td>
                                <td className={`px-4 py-3 text-right font-semibold ${item.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {item.change > 0 ? '▲' : '▼'} {Math.abs(item.change)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default MarketPricesWidget;