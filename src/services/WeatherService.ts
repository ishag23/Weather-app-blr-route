const API_KEY = "557e09c8df2600fb037f78e93b250c1c"; // OpenWeatherMap API key
const BLR_LAT = 12.9716;
const BLR_LON = 77.5946;

export interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  cityName: string;
  weatherCondition: string;
}

export interface ForecastData {
  time: string;
  temperature: number;
  description: string;
  icon: string;
}

// Temporary mock data for fallback
const mockWeatherData: WeatherData = {
  temperature: 28,
  description: "Partly cloudy",
  icon: "02d",
  humidity: 65,
  windSpeed: 12,
  cityName: "Bangalore",
  weatherCondition: "Clouds",
};

const mockForecast: ForecastData[] = [
  {
    time: "9:00 AM",
    temperature: 26,
    description: "Sunny",
    icon: "01d",
  },
  {
    time: "12:00 PM",
    temperature: 30,
    description: "Partly cloudy",
    icon: "02d",
  },
  {
    time: "3:00 PM",
    temperature: 29,
    description: "Scattered clouds",
    icon: "03d",
  },
  {
    time: "6:00 PM",
    temperature: 27,
    description: "Light rain",
    icon: "10d",
  },
  {
    time: "9:00 PM",
    temperature: 25,
    description: "Clear",
    icon: "01n",
  },
];

export interface RouteRecommendation {
  id: number;
  title: string;
  description: string;
  travelTime: string;
  weatherSuitability: string;
  recommendation: string;
}

export const getWeatherData = async (): Promise<WeatherData> => {
  try {
    // Using real API with the provided key
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${BLR_LAT}&lon=${BLR_LON}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Weather data fetch failed");
    }
    const data = await response.json();
    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      cityName: data.name,
      weatherCondition: data.weather[0].main,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return mockWeatherData; // Fallback to mock data in case of error
  }
};

export const getForecastData = async (): Promise<ForecastData[]> => {
  try {
    // Using real API with the provided key
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${BLR_LAT}&lon=${BLR_LON}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Forecast data fetch failed");
    }
    const data = await response.json();
    return data.list.slice(0, 5).map((item: any) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temperature: item.main.temp,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    }));
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    return mockForecast; // Fallback to mock data in case of error
  }
};

export const getRouteRecommendations = (weatherCondition: string): RouteRecommendation[] => {
  const commonRoutes = [
    {
      id: 1,
      title: "Electronic City to Whitefield",
      description: "Via Outer Ring Road",
      travelTime: "1h 30m",
      weatherSuitability: "",
      recommendation: "",
    },
    {
      id: 2,
      title: "MG Road to Indiranagar",
      description: "Via Old Airport Road",
      travelTime: "30m",
      weatherSuitability: "",
      recommendation: "",
    },
    {
      id: 3,
      title: "Koramangala to HSR Layout",
      description: "Via Inner Ring Road",
      travelTime: "20m",
      weatherSuitability: "",
      recommendation: "",
    },
    {
      id: 4,
      title: "Jayanagar to JP Nagar",
      description: "Via Bannerghatta Road",
      travelTime: "25m",
      weatherSuitability: "",
      recommendation: "",
    },
  ];

  // Modify recommendations based on weather conditions
  return commonRoutes.map(route => {
    const routeCopy = { ...route };
    
    switch (weatherCondition.toLowerCase()) {
      case "rain":
      case "drizzle":
      case "thunderstorm":
        routeCopy.weatherSuitability = "Poor";
        routeCopy.recommendation = "Avoid if possible. Heavy traffic expected due to rain.";
        break;
      case "clouds":
        routeCopy.weatherSuitability = "Good";
        routeCopy.recommendation = "Moderate traffic expected, good driving conditions.";
        break;
      case "clear":
        routeCopy.weatherSuitability = "Excellent";
        routeCopy.recommendation = "Clear weather, optimal driving conditions.";
        break;
      case "fog":
      case "mist":
        routeCopy.weatherSuitability = "Poor";
        routeCopy.recommendation = "Reduced visibility, drive carefully.";
        break;
      default:
        routeCopy.weatherSuitability = "Moderate";
        routeCopy.recommendation = "Standard driving conditions.";
    }
    
    return routeCopy;
  });
};
