const Person = ({ person }) => {
  return (
    <li>
      {person.id} {person.name} {person.number}
    </li>
  );
};

export default Person;
