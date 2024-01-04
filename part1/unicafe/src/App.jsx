import { useState } from "react";

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

  const StatisticLine = ({ text, value }) => {
    return (
      <div>
        {text}
        {value}
      </div>
    );
  };

  const Statisctics = ({ good, neutral, bad, totalClicks }) => {
    const goodValue = 1;
    const badValue = -1;

    const average = (good * goodValue + bad * badValue) / totalClicks;
    const positive = (good * goodValue) / totalClicks;

    if (totalClicks === 0) {
      return "No feedback given";
    }

    return (
      <div>
        <StatisticLine text={"good "} value={good} />
        <StatisticLine text={"neutral "} value={neutral} />
        <StatisticLine text={"bad "} value={bad} />
        <StatisticLine text={"all "} value={totalClicks} />
        <StatisticLine text={"average "} value={average} />
        <StatisticLine text={"positive "} value={positive} />
      </div>
    );
  };

  return (
    <div>
      <h1>{"give feedback"}</h1>
      <button onClick={handleGoodClick}> good </button>
      <button onClick={handleNeutralClick}> neutral </button>
      <button onClick={handleBadClick}> bad </button>
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
