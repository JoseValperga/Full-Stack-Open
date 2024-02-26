import Button from "./Button";
/*
const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};
*/

const Person = ({ person, personToDelete }) => {
  return (
    <li>
      {person.name} {person.number}{" "}
      <Button handleClick={personToDelete} text={"Delete"}/>
    </li>
  );
};

/*

const Person = ({ person, personToDelete }) => {
  return (
    <li>
      {person.name} {person.number}{" "}
      <button onClick={personToDelete}>Delete</button>
    </li>
  );
};
*/
export default Person;
