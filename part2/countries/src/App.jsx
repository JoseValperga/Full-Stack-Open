import { useState, useEffect } from "react";
import axios from "axios";
import Languages from "./components/Languages";

const App = () => {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (country) {
      axios
        .get(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => {
          setCountries(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [country]);

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div>
      find countries: <input value={country} onChange={handleCountryChange} />
      {countries.length > 10 && (
        <p>Too many matches, specify another filter.</p>
      )}
      {countries.length <= 10 && (
        <ul>
          {countries.slice(0, 10).map((country) => (
            <li key={country.name.common}>{country.name.common}</li>
          ))}
        </ul>
      )}
      {countries.length === 1 && (
        <div>
          {countries.map((countryData) => (
            <div key={countryData.name.common}>
              <h2>{countryData.name.common}</h2>
              <p>Capital: {countryData.capital}</p>
              <p>Population: {countryData.population}</p>
              <p>Region: {countryData.region}</p>
              <p>Area: {countryData.area}</p>
              <h3>Languajes</h3>
              <Languages languages={countryData.languages} />
              <img src={countryData.flags.png} alt="Country flag" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
