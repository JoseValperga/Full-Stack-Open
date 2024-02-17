import formService from "../services/form"

const addPerson = (personObject, persons, setPersons, setFilteredPersons) => {
    const isRepeated = persons.find(
      (object) => object.name === personObject.name
    );

    if (isRepeated) {
      personObject.id = isRepeated.id;
      if (
        window.confirm(
          `${personObject.name} is already added to phonebook, replace de old number with a new one?`
        )
      ) {
        formService
          .update(personObject.id, personObject)
          .then((updatedPerson) => {
            const response = formService.updateObject(updatedPerson, persons);
            setPersons(response);
            setFilteredPersons(response);
          })
          .catch((error) => {
            console.log(error.message);
          });
        return;
      } else {
        return;
      }
    }

    formService.create(personObject).then((personAdded) => {
      setFilteredPersons(persons.concat(personAdded));
      setPersons(persons.concat(personAdded));
    });
  };

  export default addPerson;
