import { useState, useEffect } from "react";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";
import formService from "./services/form";
import addPerson from "./components/AddPerson";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    formService.getAll().then((initialPersons) => {
      setPersons(initialPersons), setFilteredPersons(initialPersons);
    });
  }, []);

  const [filteredPersons, setFilteredPersons] = useState([...persons]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setFilteredPersons={setFilteredPersons} />

      <h2>add a new</h2>
      <Form
        addPerson={addPerson}
        persons={persons}
        setPersons={setPersons}
        setFilteredPersons={setFilteredPersons}
      />

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
