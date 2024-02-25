import formService from "../services/form";

const addPerson = (
  personObject,
  persons,
  setPersons,
  setFilteredPersons,
  setAddedMessage,
  setErrorMessage
) => {
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
        .update(personObject)
        .then((updatedPerson) => {
          const response = formService.updateObject(updatedPerson, persons);

          setPersons(response);
          setFilteredPersons(response);

          setAddedMessage(
            `Note '${personObject.name}' number was changed into the server`
          );
          setTimeout(() => {
            setAddedMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
      return;
    } else {
      return;
    }
  }

  formService
    .create(personObject)
    .then((personAdded) => {
      setFilteredPersons(persons.concat(personAdded));
      setPersons(persons.concat(personAdded));
      setAddedMessage(`Note '${personObject.name}' was added into the server`);
      setTimeout(() => {
        setAddedMessage(null);
      }, 5000);
    })
    .catch((error) => {
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    });
};

export default addPerson;
