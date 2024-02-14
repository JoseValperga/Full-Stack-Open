import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data), setFilteredPersons(response.data);
    });
  }, []);

  const [filteredPersons, setFilteredPersons] = useState([...persons]);

  const addPerson = (personObject) => {
    const isRepeated = persons.find(
      (object) => object.name === personObject.name
    );

    if (isRepeated) {
      window.alert(`${personObject.name} is already added to phonebook`);
      return;
    }
    const id = persons.length + 1;
    personObject.id = id;
    setFilteredPersons(persons.concat(personObject));
    setPersons(persons.concat(personObject));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setFilteredPersons={setFilteredPersons} />

      <h2>add a new</h2>
      <Form addPerson={addPerson} />

      <h2>Numbers</h2>
      <Numbers filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
