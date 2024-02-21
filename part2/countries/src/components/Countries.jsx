import Languages from "./Languages";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

const Countries = ({ countries }) => {
  const [temp, setTemp] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;
  const URL = import.meta.env.VITE_URL;
  const URL_ICON_1 = import.meta.env.VITE_URL_ICON_1;
  const URL_ICON_2 = import.meta.env.VITE_URL_ICON_2;
  const name = countries[0].capital[0];

  useEffect(() => {
    axios
      .get(`${URL}q=${name}&APPID=${apiKey}`)
      .then((response) => {
        setTemp(response.data.main.temp - 273.14);
        setWind(response.data.wind.speed);
        setIcon(response.data.weather[0].icon);
      })
      .catch((error) => {
        console.log("Error", error.message);
      });
  }, [apiKey, URL, name]);

  console.log("icon", icon);
  if (icon) {
    return (
      <div>
        {countries.map((countryData) => (
          <div key={countryData.name.common}>
            <h2>{countryData.name.common}</h2>
            <p>Capital: {countryData.capital}</p>
            <p>Population: {countryData.population}</p>
            <p>Region: {countryData.region}</p>
            <p>Area: {countryData.area}</p>
            <h3>Languages</h3>
            <Languages languages={countryData.languages} />
            <img src={countryData.flags.png} alt="Country flag" />
            <h3>Weather in {name}</h3>
            <p>
              Temp:{temp.toFixed(1)}
              {" °C"}
            </p>
            <img
              src={icon ? `${URL_ICON_1}${icon}${URL_ICON_2}` : " "}
              alt="Weather icon"
            />
            <p>
              Wind:{wind}
              {" m/s"}
            </p>
          </div>
        ))}
      </div>
    );
  }
};

Countries.propTypes = { countries: PropTypes.array.isRequired };

export default Countries;
