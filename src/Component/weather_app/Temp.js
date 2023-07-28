import React, { useState, useEffect } from "react";
import Weather from "./Weather";
import "./stle_weather.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Jind");
  const [tempInfo, setTempInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getWeatherInfo = async () => {
    try {
      let url = `http://api.weatherstack.com/current?access_key=589f65602dde1b1bcdcb711ca9af3bc7&query=${searchValue}`;

      let res = await fetch(url);
      let data = await res.json();

      if (data.success === false) {
        setError("Invalid location. Please try again.");
        setLoading(false);
        setTempInfo({});
      } else {
        setError("");
        setLoading(false);
        const { temperature, humidity, pressure } = data.current;
        const { weather_descriptions: weathermood } = data.current;
        const { name: cityName } = data.location;
        const { country, localtime: sunset } = data.location;
        const { wind_speed: speed } = data.current;

        const myNewWeatherInfo = {
          temp: temperature,
          humidity,
          pressure,
          weathermood: weathermood[0],
          name: cityName,
          speed,
          country,
          sunset: sunset.split(" ")[1], // Extracting time from the localtime
        };

        setTempInfo(myNewWeatherInfo);
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      setLoading(false);
      setTempInfo({});
    }
  };

  useEffect(() => {
    setLoading(true);
    getWeatherInfo();
  }, [searchValue]);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button className="searchButton" type="button" onClick={getWeatherInfo}>
            Search
          </button>
        </div>
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
      </div>

      <Weather {...tempInfo} />
    </>
  );
};

export default Temp;
