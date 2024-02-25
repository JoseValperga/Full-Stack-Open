import Person from "./Person";
import formService from "../services/form";

const Numbers = ({
  filteredPersons,
  persons,
  setPersons,
  setFilteredPersons,
  setErrorMessage,
}) => {
  const idPersonToDelete = ({ id, name }) => {
    if (window.confirm(`Delete ${name}?`))
      formService
        .deletePerson(id)
        .then(() => {
          const temp = persons.filter((n) => n.id !== id);
          const temp_2 = filteredPersons.filter((n) => n.id !== id)
          setPersons(temp);
          setFilteredPersons(temp_2);
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
  };

  return (
    <ul>
      {filteredPersons.map((person) => (
        <Person
          key={person.id}
          person={person}
          personToDelete={() => {
            idPersonToDelete(person);
          }}
        />
      ))}
    </ul>
  );
};
export default Numbers;
