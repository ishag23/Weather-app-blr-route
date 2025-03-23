
import { 
  Cloud, 
  CloudDrizzle, 
  CloudLightning, 
  CloudRain, 
  CloudSnow, 
  Sun, 
  CloudFog, 
  CloudSun
} from "lucide-react";

interface WeatherIconProps {
  iconCode: string;
  size?: number;
  className?: string;
}

export const WeatherIcon = ({ iconCode, size = 24, className = "" }: WeatherIconProps) => {
  const getIconComponent = () => {
    // Map OpenWeatherMap icon codes to Lucide icons
    switch (iconCode) {
      case "01d":
        return <Sun size={size} className={className} />;
      case "01n":
        return <Sun size={size} className={className} />;
      case "02d":
      case "02n":
        return <CloudSun size={size} className={className} />;
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return <Cloud size={size} className={className} />;
      case "09d":
      case "09n":
        return <CloudDrizzle size={size} className={className} />;
      case "10d":
      case "10n":
        return <CloudRain size={size} className={className} />;
      case "11d":
      case "11n":
        return <CloudLightning size={size} className={className} />;
      case "13d":
      case "13n":
        return <CloudSnow size={size} className={className} />;
      case "50d":
      case "50n":
        return <CloudFog size={size} className={className} />;
      default:
        return <Sun size={size} className={className} />;
    }
  };

  return getIconComponent();
};

export default WeatherIcon;
