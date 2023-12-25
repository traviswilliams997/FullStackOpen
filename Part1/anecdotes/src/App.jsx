import { useState } from 'react'

const Heading = ({ text }) =>(<h1>{text}</h1>)
const Displayanecdote = ({ anecdotes, index }) =>(<p>{anecdotes[index]}</p>)
const Votes = ({ points, position }) =>(<p>has {points[position]} votes</p>)
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const Dayanecdote = ({ anecdotes, points, selected, handleVoteClick, handleNextClick }) =>{
  return (
    <div>
      <Heading  text='Anecdote of the day'/>
      <Displayanecdote anecdotes={anecdotes} index={selected} />
      <Votes  points={points} position={selected} />
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleNextClick} text='next anecdote' />
    </div>
  )
}

const Topanecdote = ({ anecdotes, points, maxIndex }) =>{
  return (
    <div>
        <Heading  text='Anecdote with most votes'/>
        <Displayanecdote anecdotes={anecdotes} index={maxIndex} />
        <Votes  points={points} position={maxIndex} />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
    
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [maxVotes, setMaxVotes] = useState(0)
  const [maxVotesIndex, setMaxVotesIndex] = useState(0)

  const handleVoteClick = () => {
    const copy = [...points] 
    copy[selected] += 1  
    if(copy[selected ] > maxVotes){
      setMaxVotes(copy[selected ]);
      setMaxVotesIndex(selected);
    }
    setPoints(copy)
  }
  const handleNextClick = () => {
    const randomInt = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomInt)
  }
    
  return (
    <div>
      <Dayanecdote anecdotes={anecdotes} selected={selected} points={points} handleVoteClick={handleVoteClick} handleNextClick={handleNextClick}/>
      <Topanecdote anecdotes={anecdotes} points={points} maxIndex={maxVotesIndex} />
    </div>
  )
}

export default App