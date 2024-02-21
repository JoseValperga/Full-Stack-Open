import { useState, useEffect } from "react";
import axios from "axios";
//import Languages from "./components/Languages";
import Countries from "./components/Countries";

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
      {countries.length === 1 && <Countries countries={countries} />}
    </div>
  );
};

export default App;
