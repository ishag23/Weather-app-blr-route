
import { ForecastData } from "@/services/WeatherService";
import WeatherIcon from "./WeatherIcon";

interface ForecastSectionProps {
  forecastData: ForecastData[];
}

const ForecastSection = ({ forecastData }: ForecastSectionProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex space-x-4 py-4 min-w-max">
        {forecastData.map((forecast, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center p-4 rounded-lg backdrop-blur-sm bg-white/20 dark:bg-black/20 border border-gray-200 dark:border-gray-800 transition-all hover:bg-white/30 dark:hover:bg-black/30"
          >
            <span className="text-sm font-medium">{forecast.time}</span>
            <WeatherIcon iconCode={forecast.icon} size={32} className="my-2 text-blue-500" />
            <span className="text-lg font-bold">{Math.round(forecast.temperature)}°C</span>
            <span className="text-xs text-muted-foreground capitalize">{forecast.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastSection;
