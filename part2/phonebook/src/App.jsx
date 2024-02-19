import { useState, useEffect } from "react";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";
import formService from "./services/form";
import addPerson from "./components/AddPerson";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [addedMessage, setAddedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    formService.getAll().then((initialPersons) => {
      setPersons(initialPersons), setFilteredPersons(initialPersons);
    });
  }, []);

  const [filteredPersons, setFilteredPersons] = useState([...persons]);

  return (
    <div>
      <h1>Phonebook</h1>

      {addedMessage && <Notification message={addedMessage} />}
      {errorMessage && <Notification errorMessage={errorMessage} />}

      <Filter persons={persons} setFilteredPersons={setFilteredPersons} />

      <h2>add a new</h2>
      <Form
        addPerson={addPerson}
        persons={persons}
        setPersons={setPersons}
        setFilteredPersons={setFilteredPersons}
        setAddedMessage={setAddedMessage}
        setErrorMessage={setErrorMessage}
      />

      <h2>Numbers</h2>
      <Numbers
        filteredPersons={filteredPersons}
        persons={persons}
        setPersons={setPersons}
        setFilteredPersons={setFilteredPersons}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default App;
