import React, { useState, useEffect } from 'react';
import { WeatherData, Language } from '../../types';
import Card from '../shared/Card';
import { TRANSLATIONS, ICONS } from '../../constants';
import { getWeatherData } from '../../services/weatherService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WeatherWidgetProps {
    language: Language;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ language }) => {
    const t = TRANSLATIONS[language];
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const yearlyRainfallData = [
        { month: 'Jan', rainfall: 20 },
        { month: 'Feb', rainfall: 35 },
        { month: 'Mar', rainfall: 70 },
        { month: 'Apr', rainfall: 150 },
        { month: 'May', rainfall: 250 },
        { month: 'Jun', rainfall: 400 },
        { month: 'Jul', rainfall: 450 },
        { month: 'Aug', rainfall: 420 },
        { month: 'Sep', rainfall: 300 },
        { month: 'Oct', rainfall: 120 },
        { month: 'Nov', rainfall: 25 },
        { month: 'Dec', rainfall: 10 },
    ];

    useEffect(() => {
        const fetchWeather = async (showLoading: boolean) => {
            try {
                if (showLoading) {
                    setLoading(true);
                }
                setError(null);
                const data = await getWeatherData();
                setWeather(data);
                setLastUpdated(new Date());
            } catch (err) {
                setError(t.weatherError);
            } finally {
                if (showLoading) {
                    setLoading(false);
                }
            }
        };

        fetchWeather(true); // Initial fetch with loading indicator

        const intervalId = setInterval(() => fetchWeather(false), 2 * 60 * 1000); // Auto-refresh every 2 minutes

        return () => clearInterval(intervalId); // Cleanup interval on component unmount or dependency change
    }, [language, t.weatherError]);

    const getWeatherIcon = (condition: string): string => {
        const lowerCaseCondition = condition.toLowerCase();
        if (lowerCaseCondition.includes('rain') || lowerCaseCondition.includes('shower') || lowerCaseCondition.includes('drizzle')) {
            return ICONS.RAIN;
        }
        if (lowerCaseCondition.includes('clear') || lowerCaseCondition.includes('sunny')) {
            return ICONS.SUN;
        }
        if (lowerCaseCondition.includes('cloudy') || lowerCaseCondition.includes('overcast') || lowerCaseCondition.includes('mist') || lowerCaseCondition.includes('fog')) {
            return ICONS.CLOUD;
        }
        return ICONS.CLOUD; // Default icon
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center min-h-[320px]">
                    <p className="text-gray-500 dark:text-gray-400">{t.loadingWeather}</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex items-center justify-center min-h-[320px]">
                    <p className="text-red-500">{error}</p>
                </div>
            );
        }

        if (weather) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Current & Hourly Weather */}
                    <div className="flex flex-col">
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={getWeatherIcon(weather.condition)} />
                                    </svg>
                                    <div>
                                        <p className="text-4xl font-bold">{Math.round(weather.temperature)}°C</p>
                                        <p className="text-gray-500 dark:text-gray-400">{weather.condition}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICONS.DROPLET} />
                                    </svg>
                                    <div>
                                        <p className="font-semibold">{t.humidity}</p>
                                        <p>{weather.humidity}%</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold">{t.rainfall}</p>
                                        <p>{weather.rainfall} mm</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {weather.hourlyForecast && weather.hourlyForecast.length > 0 && (
                            <div className="mt-6 pt-4 border-t border-border-light dark:border-border-dark">
                                <div className="flex justify-between items-start text-sm -mx-1">
                                    {weather.hourlyForecast.map((hour, index) => (
                                        <div key={index} className="flex flex-col items-center space-y-1 text-center w-1/5 px-1">
                                            <p className="font-semibold text-xs text-gray-700 dark:text-gray-300">{hour.time}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={getWeatherIcon(hour.condition)} />
                                            </svg>
                                            <p className="font-bold text-base">{hour.temp}°</p>
                                            <div className="flex items-center space-x-1 text-xs text-blue-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICONS.DROPLET} />
                                                </svg>
                                                <span>{hour.humidity}%</span>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{hour.rainfall}mm</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {lastUpdated && (
                            <div className={`text-right text-xs text-gray-500 dark:text-gray-400 pt-2 ${weather.hourlyForecast && weather.hourlyForecast.length > 0 ? 'mt-2' : 'mt-4 border-t border-border-light dark:border-border-dark'}`}>
                                {t.lastUpdated}: {lastUpdated.toLocaleTimeString(language === 'hi' ? 'hi-IN' : 'en-US', { hour: 'numeric', minute: '2-digit' })}
                            </div>
                        )}
                    </div>
                    {/* Right Column: Yearly Rainfall Prediction */}
                    <div>
                        <h4 className="font-semibold text-foreground-light dark:text-foreground-dark">{t.yearlyRainfallPrediction}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t.locationJorethang}</p>
                        <div className="h-80 -ml-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={yearlyRainfallData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                                    <XAxis dataKey="month" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis 
                                      stroke="currentColor" 
                                      fontSize={12} 
                                      tickLine={false} 
                                      axisLine={false}
                                      label={{ value: t.rainfall_mm, angle: -90, position: 'insideLeft', offset: 10, style: { textAnchor: 'middle', fill: 'currentColor', fontSize: 12 } }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(30, 41, 59, 0.8)',
                                            borderColor: '#334155',
                                            color: '#f1f5f9',
                                            borderRadius: '0.5rem'
                                        }}
                                        cursor={{fill: 'rgba(128, 128, 128, 0.1)'}}
                                    />
                                    <Bar dataKey="rainfall" name={t.rainfall} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            );
        }
        
        return null;
    };

    return (
        <Card title={t.weather}>
            {renderContent()}
        </Card>
    );
};

export default WeatherWidget;