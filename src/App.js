import './App.css';
import { Search, MapPin, Wind, RefreshCcw } from 'react-feather'; // Import RefreshCcw icon
import getWeather from './api/api';
import { useState, useEffect } from 'react'; // Import useEffect hook
import dateFormat from 'dateformat';

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    // Load weather data for default city when component mounts
    getWeatherbyCity();
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  const getWeatherbyCity = async () => {
    const weatherData = await getWeather(city);
    setWeather(weatherData);
  }

  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT");
  } // For render the new date time

  const refreshWeather = () => {
    getWeatherbyCity(); // Call getWeatherbyCity function to refresh weather data
  }

  return (
    <div className="app">
      <h1>Dubbizle Weather App</h1>
      <div className="input-wrapper">
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)}
          placeholder='Enter City Name' />
        <button onClick={() => getWeatherbyCity()}>
          <Search></Search>
        </button>
        {/* Add Refresh Button */}
        <button className="refresh-button" onClick={refreshWeather}>
            <RefreshCcw size={20}></RefreshCcw> 
          </button>
      </div>

      {weather && weather.weather &&
        <div className="content">

          <div className="location d-flex">
            <MapPin></MapPin>
            <h2>{weather.name} <span>({weather.sys.country})</span></h2>
          </div>
          <p className="datetext">{renderDate()}</p>

          <div className="weatherdesc d-flex flex-c">
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="" />
            <h3>{weather.weather[0].description}</h3>
          </div>

          <div className="tempstats d-flex flex-c">
            <h1>{weather.main.temp} <span>&deg;C</span></h1>
            <h3>Feels Like {weather.main.feels_like} <span>&deg;C</span></h3>
          </div>

          <div className="windstats d-flex">
            <Wind></Wind>
            <h3>Wind is {weather.wind.speed} Knots in {weather.wind.deg}&deg;</h3>
          </div>

        </div>
      }

      {!weather.weather && <div className="content">
        <h4>No Data found !</h4>
      </div>}

      {/* <p>{JSON.stringify(weather)}</p> */}

    </div>
  );
}

export default App;
