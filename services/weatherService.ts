import { WeatherData, HourlyForecast } from '../types';

const LOCATION = 'Jorthang, Sikkim';
const API_URL = `https://wttr.in/${LOCATION.replace(/ /g, '%20')}?format=j1`;

interface WttrHourly {
  time: string; // "0", "300", "600", etc.
  tempC: string;
  humidity: string;
  precipMM: string;
  weatherDesc: { value: string }[];
}

interface WttrDay {
  hourly: WttrHourly[];
}

interface WttrCondition {
  temp_C: string;
  humidity: string;
  precipMM: string;
  weatherDesc: { value: string }[];
}

interface WttrResponse {
  current_condition: WttrCondition[];
  weather: WttrDay[];
}

export const getWeatherData = async (): Promise<WeatherData> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: WttrResponse = await response.json();
    const currentCondition = data.current_condition[0];
    
    // Process hourly forecast for the next 5 intervals
    const currentHour = new Date().getHours();
    
    const todayHourly = data.weather[0].hourly;
    const tomorrowHourly = data.weather[1] ? data.weather[1].hourly : [];
    
    const upcomingToday = todayHourly.filter(hour => (parseInt(hour.time) / 100) >= currentHour);
    
    let forecastPool = upcomingToday;
    if (forecastPool.length < 5) {
      forecastPool = forecastPool.concat(tomorrowHourly);
    }

    const hourlyForecast: HourlyForecast[] = forecastPool.slice(0, 5).map(hour => {
      const forecastHour = parseInt(hour.time) / 100;
      const date = new Date();
      date.setHours(forecastHour, 0, 0, 0);

      const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: true });
      const formattedTime = timeFormatter.format(date);

      return {
        time: formattedTime,
        temp: parseInt(hour.tempC, 10),
        humidity: parseInt(hour.humidity, 10),
        rainfall: parseFloat(hour.precipMM),
        condition: hour.weatherDesc[0].value,
      };
    });

    return {
      temperature: parseInt(currentCondition.temp_C, 10),
      humidity: parseInt(currentCondition.humidity, 10),
      rainfall: parseFloat(currentCondition.precipMM),
      condition: currentCondition.weatherDesc[0].value,
      hourlyForecast,
    };
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    throw new Error("Could not fetch weather data from wttr.in");
  }
};