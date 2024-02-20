const Languages = (languages) => {
  const temp = Object.values(languages);
  const languageValues = Object.values(temp[0]);

  return (
    <ul>
      {languageValues.map((language, index) => {
        return <li key={index}>{language}</li>;
      })}
    </ul>
  );
};

export default Languages;
