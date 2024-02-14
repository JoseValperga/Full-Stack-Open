const Part = ({ part, excercises }) => {
  return (
    <div>
      <p>
        {part} {excercises}
      </p>
    </div>
  );
};

const Content = ({ parts }) => {
  return parts.map((objeto) => {
    return (
      <div key={objeto.name}>
        <Part part={objeto.name} excercises={objeto.excercises} />
      </div>
    );
  });
};

export default Content;
