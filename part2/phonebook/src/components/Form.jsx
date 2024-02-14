import { useState } from "react";

const Form = ({ addPerson }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addPerson({ name: newName, number: newNumber });
    setNewName("");
    setNewNumber("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handlePersonChange} />
      </div>

      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default Form;
