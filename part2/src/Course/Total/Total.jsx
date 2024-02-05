const Total = ({ parts }) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0);

  return (
    <>
      <p>
        <b>total of {total}</b>
      </p>
    </>
  );
};

export default Total;
