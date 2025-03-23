
// This service can be expanded later for more advanced route functionality
// Currently using the basic functions from WeatherService

export const getEstimatedTravelTimeIncrease = (weatherCondition: string): number => {
  // Return percentage increase in travel time based on weather
  switch (weatherCondition.toLowerCase()) {
    case "rain":
    case "drizzle":
      return 30; // 30% increase in travel time
    case "thunderstorm":
      return 50; // 50% increase
    case "snow":
      return 70; // 70% increase
    case "fog":
    case "mist":
      return 40; // 40% increase
    case "clouds":
      return 10; // 10% increase
    case "clear":
      return 0; // No increase
    default:
      return 15; // 15% increase for unknown conditions
  }
};

export const getTrafficCondition = (weatherCondition: string): string => {
  switch (weatherCondition.toLowerCase()) {
    case "rain":
    case "drizzle":
    case "thunderstorm":
    case "snow":
      return "Heavy";
    case "fog":
    case "mist":
      return "Moderate to Heavy";
    case "clouds":
      return "Moderate";
    case "clear":
      return "Light to Moderate";
    default:
      return "Moderate";
  }
};
