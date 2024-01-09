import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
const anecdotes = useSelector(state => state)
const sortedAnecdotes = [...anecdotes]
sortedAnecdotes.sort((a, b) => b.votes - a.votes)

const dispatch = useDispatch()

const vote = (id) => {
  dispatch(incrementVote(id))
  console.log('vote', id)
}

return (
  <div>
    {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
  </div>
)


}

export default AnecdoteList