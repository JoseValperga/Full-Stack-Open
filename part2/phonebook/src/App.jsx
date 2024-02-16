import { useState, useEffect } from "react";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";
import formService from "./services/form";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    formService.getAll().then((initialPersons) => {
      setPersons(initialPersons), setFilteredPersons(initialPersons);
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

    formService.create(personObject).then((personAdded) => {
      setFilteredPersons(persons.concat(personAdded));
      setPersons(persons.concat(personAdded));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setFilteredPersons={setFilteredPersons} />

      <h2>add a new</h2>
      <Form addPerson={addPerson} />

      <h2>Numbers</h2>
      <Numbers
        filteredPersons={filteredPersons}
        persons={persons}
        setPersons={setPersons}
        setFilteredPersons={setFilteredPersons}
      />
    </div>
  );
};

export default App;
