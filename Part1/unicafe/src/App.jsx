import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const all = good+neutral+bad; 
  const average = (good*1 + neutral*0 + bad*-1)/all; 
  const postive = (good/all)*100;
 
  return (
    <div>
      <Heading text='statistics' />
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>postive {postive}%</p>
    </div>
  )
}
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const Heading = ({text}) => <h1>{text}</h1>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }
  


  return (
    <div>
        <Heading text='give feeedback' />
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
        <Statistics good={good} neutral={neutral} bad={bad}  />
    </div>
  )
}

export default App