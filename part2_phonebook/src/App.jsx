import { useState } from "react";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

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
