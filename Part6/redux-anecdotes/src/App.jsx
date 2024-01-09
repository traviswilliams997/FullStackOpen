import AnecdoteForm from './components/AnecdotesForm'
import AnecdoteList  from './components/AnecdoteList'
import Filter from './components/Filter'
const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App