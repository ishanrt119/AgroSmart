
import React, { useState } from 'react';
import { CropRecommendation, Language } from '../../types';
import Card from '../shared/Card';
import { getCropRecommendations } from '../../services/geminiService';
import { TRANSLATIONS } from '../../constants';

interface CropRecommendationWidgetProps {
  language: Language;
}

const CropRecommendationWidget: React.FC<CropRecommendationWidgetProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [season, setSeason] = useState('Rabi');
  const [soilType, setSoilType] = useState('Alluvial');
  const [altitude, setAltitude] = useState(1500);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setRecommendations([]);
    try {
      const result = await getCropRecommendations(season, soilType, altitude);
      setRecommendations(result);
    } catch (err) {
      setError(t.recommendationError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card title={t.cropRecommendation}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.season}</label>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-white dark:bg-slate-800"
            >
              <option>{t.rabi}</option>
              <option>{t.kharif}</option>
              <option>{t.zaid}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.soilType}</label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-white dark:bg-slate-800"
            >
              <option>{t.alluvial}</option>
              <option>{t.black}</option>
              <option>{t.red}</option>
              <option>{t.laterite}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.altitude}</label>
            <input
              type="number"
              value={altitude}
              onChange={(e) => setAltitude(parseInt(e.target.value, 10))}
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-white dark:bg-slate-800"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:bg-gray-400"
        >
          {isLoading ? t.loadingRecommendations : t.getRecommendation}
        </button>
      </form>

      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {recommendations.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-semibold mb-2">{t.recommendationsForYou}</h4>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.cropName} className="p-4 border rounded-lg bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark">
                <h5 className="font-bold text-primary">{rec.cropName}</h5>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                  {rec.recommendationReasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-border-light dark:border-border-dark grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                    <p><span className="font-semibold">Sowing:</span> {rec.sowingSeason}</p>
                    <p><span className="font-semibold">Period:</span> {rec.growingPeriod}</p>
                    <p><span className="font-semibold">Water:</span> {rec.waterNeeds}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default CropRecommendationWidget;