
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RouteRecommendation } from "@/services/WeatherService";
import { Navigation, Clock } from "lucide-react";

interface RouteRecommendationCardProps {
  route: RouteRecommendation;
}

const RouteRecommendationCard = ({ route }: RouteRecommendationCardProps) => {
  // Determine the color based on weather suitability
  const getBadgeColor = (suitability: string) => {
    switch (suitability.toLowerCase()) {
      case "excellent":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "good":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "moderate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "poor":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card className="backdrop-blur-sm bg-white/30 dark:bg-black/30 border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">{route.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Navigation className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              {route.description}
            </CardDescription>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-sm font-medium">{route.travelTime}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center">
            <span className={`text-xs px-2 py-0.5 rounded-full ${getBadgeColor(route.weatherSuitability)}`}>
              {route.weatherSuitability}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{route.recommendation}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteRecommendationCard;
