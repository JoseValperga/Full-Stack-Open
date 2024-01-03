const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", excercises: 10 },
      { name: "Using props to pass data", excercises: 7 },
      { name: "State of a component", excercises: 14 },
    ],
  };

  const Header = ({ course }) => {
    return (
      <>
        <h1>{course}</h1>
      </>
    );
  };

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

  const Total = ({ parts }) => {
    return (
      <>
        <p>
          Number of excercises{" "}
          {parts[0].excercises + parts[1].excercises + parts[2].excercises}
        </p>
      </>
    );
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
