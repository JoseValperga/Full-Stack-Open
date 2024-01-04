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

  const Statisctics = ({ good, neutral, bad, totalClicks }) => {
    if (totalClicks === 0) {
      return "No feedback given";
    }
    
    return (
      <ul>
        <li>
          {"good"} {good}
        </li>
        <li>
          {"neutral"} {neutral}
        </li>
        <li>
          {"bad"} {bad}
        </li>
        <li>
          {"all"} {totalClicks}
        </li>
        <li>
          {"average "}
          {totalClicks > 0 ? (good * 1 + bad * -1) / totalClicks : " "}
        </li>
        <li>
          {"positive "}
          {totalClicks > 0 ? ((good * 1) / totalClicks) * 100 : " "}
          {"%"}
        </li>
      </ul>
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
