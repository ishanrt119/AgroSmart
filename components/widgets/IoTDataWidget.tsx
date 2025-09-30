
import React from 'react';
import { Language, SensorDataPoint } from '../../types';
import Card from '../shared/Card';
import { TRANSLATIONS } from '../../constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface IoTDataWidgetProps {
    language: Language;
}

const IoTDataWidget: React.FC<IoTDataWidgetProps> = ({ language }) => {
    const t = TRANSLATIONS[language];

    // Dummy Data
    const moistureData: SensorDataPoint[] = [
        { time: '00:00', value: 45 },
        { time: '04:00', value: 48 },
        { time: '08:00', value: 46 },
        { time: '12:00', value: 42 },
        { time: '16:00', value: 40 },
        { time: '20:00', value: 43 },
    ];

    const temperatureData: SensorDataPoint[] = [
        { time: '00:00', value: 18 },
        { time: '04:00', value: 17 },
        { time: '08:00', value: 20 },
        { time: '12:00', value: 25 },
        { time: '16:00', value: 24 },
        { time: '20:00', value: 21 },
    ];
    
    const data = moistureData.map((md, i) => ({
        time: md.time,
        [t.moisture]: md.value,
        [t.temperature]: temperatureData[i].value
    }));

    return (
        <Card title={t.iotData}>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.3)" />
                        <XAxis dataKey="time" stroke="currentColor" fontSize={12} />
                        <YAxis stroke="currentColor" fontSize={12} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                                borderColor: '#334155',
                                color: '#f1f5f9',
                                borderRadius: '0.5rem'
                            }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey={t.moisture} stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey={t.temperature} stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default IoTDataWidget;
