import Person from "./Person";
import formService from "../services/form";

const Numbers = ({
  filteredPersons,
  persons,
  setPersons,
  setFilteredPersons,
  setErrorMessage
}) => {
  const idPersonToDelete = ({ id, name }) => {
    if (window.confirm(`Delete ${name}?`))
      formService.deletePerson(id).then((respuesta) => {
        setPersons(persons.filter((n) => n.id !== respuesta.id));
        setFilteredPersons(
          filteredPersons.filter((n) => n.id !== respuesta.id)
        );
      }).catch((error)=>{
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);});
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
