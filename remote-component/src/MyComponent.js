import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Dynamically import axios
      const { default: axios } = await import('axios');
      try {
        const weatherReport = await axios.get('https://api.weather.gov/gridpoints/PSR/165,59/forecast');
        console.log('weatherReport', weatherReport.data.properties.periods[0].detailedForecast);
        setWeatherData(weatherReport.data.properties.periods[0].detailedForecast);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ border: '1px solid blue', padding: '10px', margin: '10px' }}>
      <h3>Hello from My Component!</h3>
      <p>This component is being exposed via Module Federation.</p>
      {weatherData && <p>Scottsdale weather: {weatherData}</p>}
    </div>
  );
};

export default MyComponent;