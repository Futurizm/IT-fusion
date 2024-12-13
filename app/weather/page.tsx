"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, CloudDrizzle, CloudRain, Sun, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout";

interface ForecastDay {
  date: string;
  temp: string;
  weather: string;
}

export default function WeatherForecast() {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      const lat = 44.34;
      const lon = 10.99;
      const apiKey = "28780b8748a7bae6a8dbd31540a1fd81";

      try {
        console.log("Fetching forecast data...");
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=Pavlodar&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(
            `API Error: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("API response:", data);

        if (data && data.list && Array.isArray(data.list)) {
          const dailyForecasts = data.list.reduce((acc: any, curr: any) => {
            const date = new Date(curr.dt * 1000).toISOString().split("T")[0];
            if (!acc[date]) {
              acc[date] = {
                temp: curr.main.temp,
                weather: curr.weather[0].description,
                count: 1,
              };
            } else {
              acc[date].temp += curr.main.temp;
              acc[date].count += 1;
            }
            return acc;
          }, {});

          const formattedForecast = Object.keys(dailyForecasts).map((date) => {
            const { temp, weather, count } = dailyForecasts[date];
            return {
              date,
              temp: (temp / count).toFixed(1),
              weather,
            };
          });

          setForecast(formattedForecast.slice(0, 8));
        } else {
          throw new Error('Unexpected response format or missing "list" data.');
        }
      } catch (error: any) {
        console.error("Error fetching forecast data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForecastData();
  }, []);

  const getWeatherIcon = (weather: string) => {
    const lowerWeather = weather.toLowerCase();
    if (lowerWeather.includes("rain"))
      return <CloudRain className="h-6 w-6 text-blue-500" />;
    if (lowerWeather.includes("drizzle"))
      return <CloudDrizzle className="h-6 w-6 text-blue-300" />;
    if (lowerWeather.includes("cloud"))
      return <Cloud className="h-6 w-6 text-gray-500" />;
    return <Sun className="h-6 w-6 text-yellow-500" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };


  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <Card className="w-full max-w-4xl border-destructive">
          <CardContent className="pt-6">
            <p className="text-center text-destructive">Error: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex justify-center items-center h-100vh bg-gray-100 p-4">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              7-Day Weather Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
              {forecast.map((day, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      {getWeatherIcon(day.weather)}
                      <span className="text-2xl font-bold">{day.temp}°C</span>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">
                        {formatDate(day.date)}
                      </p>
                      <p className="mt-1 capitalize text-sm">{day.weather}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
