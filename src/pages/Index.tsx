
import { useEffect, useState } from "react";
import { 
  getWeatherData, 
  getForecastData, 
  getRouteRecommendations,
  WeatherData,
  ForecastData,
  RouteRecommendation
} from "@/services/WeatherService";
import WeatherCard from "@/components/WeatherCard";
import ForecastSection from "@/components/ForecastSection";
import RouteRecommendationCard from "@/components/RouteRecommendationCard";
import { MapPin, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [routeRecommendations, setRouteRecommendations] = useState<RouteRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const weather = await getWeatherData();
      setWeatherData(weather);
      
      const forecast = await getForecastData();
      setForecastData(forecast);
      
      const routes = getRouteRecommendations(weather.weatherCondition);
      setRouteRecommendations(routes);
      
      toast({
        title: "Updated",
        description: "Weather data has been refreshed",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch weather data",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading && !weatherData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Bangalore Weather Guide</h1>
          <div className="flex items-center justify-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Bengaluru, Karnataka</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4"
            onClick={fetchData}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </header>

        {weatherData && (
          <div className="grid gap-8">
            <section className="max-w-md mx-auto w-full">
              <WeatherCard weatherData={weatherData} />
            </section>

            <section className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Today's Forecast</h2>
              <ForecastSection forecastData={forecastData} />
            </section>

            <section className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Route Recommendations</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {routeRecommendations.map((route) => (
                  <RouteRecommendationCard key={route.id} route={route} />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
