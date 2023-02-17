import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="tooltip">
        <p className="label">{`Day ${label}`}</p>
        <p className="temperature">{`High: ${payload[0].value}°`}</p>
        <p className="temperature">{`Low: ${payload[1].value}°`}</p>
        <p className="description">{payload[2].value}</p>
      </div>
    );
  }

  return null;
};

const WeatherChart = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const API_KEY = "e4d8e6f3555d678ae563e3f0a2b7ade2";
    const CITY_ID = "2643743"; // London, UK
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?id=${CITY_ID}&units=imperial&appid=${API_KEY}`;

    axios
      .get(API_URL)
      .then((response) => {
        const data = response.data.list.map((item) => {
          return {
            day: new Date(item.dt * 1000).getDate(),
            high: item.main.temp_max,
            low: item.main.temp_min,
            description: item.weather[0].description,
          };
        });

        setWeatherData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // eslint-disable-next-line no-unused-vars
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMouseOver = (data, index) => {
    setActiveIndex(index);
  };

  return (
    <>
    
    <LineChart width={600} height={300} data={weatherData}>
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Line
        type="monotone"
        dataKey="high"
        stroke="#8884d8"
        dot={false}
        onMouseOver={handleMouseOver}
      />
      <Line
        type="monotone"
        dataKey="low"
        stroke="#82ca9d"
        dot={false}
        onMouseOver={handleMouseOver}
      />
      <Line
        type="monotone"
        dataKey="description"
        stroke="transparent"
        dot={false}
      />
    </LineChart>
    </>
  );
};

export default WeatherChart;
