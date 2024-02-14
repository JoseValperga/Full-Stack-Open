import Person from "./Person";

const Numbers = ({ filteredPersons }) => {
  return (
    <ul>
      {filteredPersons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </ul>
  );
};
export default Numbers;
