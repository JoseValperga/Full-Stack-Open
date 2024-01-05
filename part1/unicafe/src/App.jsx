import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  const newValue = Number.isInteger(value)
    ? value
    : parseFloat(value.toFixed(1));

  return (
    <tr>
      <td>{text}</td>
      <td>{text !== "positive " ? newValue : newValue + "%"}</td>
    </tr>
  );
};

const Statisctics = ({ good, neutral, bad, totalClicks }) => {
  const goodValue = 1;
  const badValue = -1;

  const average = (good * goodValue + bad * badValue) / totalClicks;
  const positive = (good * goodValue * 100) / totalClicks;

  if (totalClicks === 0) {
    return "No feedback given";
  }

  return (
    <table>
      <tbody>
        <StatisticLine text={"good "} value={good} />
        <StatisticLine text={"neutral "} value={neutral} />
        <StatisticLine text={"bad "} value={bad} />
        <StatisticLine text={"all "} value={totalClicks} />
        <StatisticLine text={"average "} value={average} />
        <StatisticLine text={"positive "} value={positive} />
      </tbody>
    </table>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totalClicks, setTotalClicls] = useState(0);

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setTotalClicls(updatedGood + neutral + bad);
  };

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setTotalClicls(good + updatedNeutral + bad);
  };

  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setTotalClicls(good + neutral + updatedBad);
  };

  return (
    <div>
      <h1>{"give feedback"}</h1>
      <Button handleClick={handleGoodClick} text={" good "} />
      <Button handleClick={handleNeutralClick} text={" neutral "} />
      <Button handleClick={handleBadClick} text={" bad "} />
      <h1>statistics</h1>
      <Statisctics
        good={good}
        neutral={neutral}
        bad={bad}
        totalClicks={totalClicks}
      />
    </div>
  );
};

export default App;
