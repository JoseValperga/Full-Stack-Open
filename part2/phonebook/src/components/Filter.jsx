import { useState } from "react";

const Filter = ({ persons, setFilteredPersons }) => {
  const [filterName, setFilterName] = useState("");

  const handleFilterName = (event) => {
    setFilterName(event.target.value);
    filterPersons(event.target.value);
  };

  const filterPersons = (filterName) => {
    const filtered = persons.filter((person) =>
      person.name.includes(filterName)
    );
    setFilteredPersons(filtered);
  };

  return (
    <div>
      filter shown with:{" "}
      <input value={filterName} onChange={handleFilterName} />{" "}
    </div>
  );
};
export default Filter;
