import { useState } from 'react'


function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let all = good + neutral + bad;
  let score = (good*1) + (neutral*0) + (bad*-1);
  let average = (score * 100)/all;
  let positive = (good/all) * 100;

  return (
    <div>
      <h1>give feedback</h1>
      <Rating text='good' count={good} setCount={setGood} />
      <Rating text='neutral' count={neutral} setCount={setNeutral} />
      <Rating text='bad' count={bad} setCount={setBad} />
      <h1>statistics</h1>
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  )
}

function Rating({ text, count, setCount }) {
  const handleClick = () => {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

function Statistics({ good, neutral, bad, all ,average, positive }) {
  if (all == 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average.toFixed(2)} />
          <StatisticLine text="positive" value={`${positive.toFixed(2)}%`} />
        </tbody>
      </table>
    )
  }
}

function StatisticLine({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

export default App
