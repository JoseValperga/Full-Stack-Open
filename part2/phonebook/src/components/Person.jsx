const Person = ({ person, personToDelete }) => {
  return (
    <li>
      {person.name} {person.number}{" "}
      <button onClick={personToDelete}>Delete</button>
    </li>
  );
};

export default Person;
