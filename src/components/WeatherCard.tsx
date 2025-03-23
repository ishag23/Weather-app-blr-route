
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherData } from "@/services/WeatherService";
import WeatherIcon from "./WeatherIcon";

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard = ({ weatherData }: WeatherCardProps) => {
  return (
    <Card className="w-full backdrop-blur-sm bg-white/30 dark:bg-black/30 border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{weatherData.cityName}</CardTitle>
        <div className="flex items-center">
          <WeatherIcon iconCode={weatherData.icon} size={36} className="text-blue-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div className="flex items-start justify-between">
            <p className="text-4xl font-bold">{Math.round(weatherData.temperature)}°C</p>
            <p className="text-sm capitalize text-muted-foreground mt-2">{weatherData.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Humidity</span>
              <span className="font-medium">{weatherData.humidity}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Wind</span>
              <span className="font-medium">{weatherData.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
