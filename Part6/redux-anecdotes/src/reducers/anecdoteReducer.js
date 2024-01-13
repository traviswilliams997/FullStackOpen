import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const incrementVote = (id) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    const anecdote = await anecdotes.find((a) => a.id === id)
    const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const returnedAnecdote = await anecdoteService.update(id, changedAnecdote)
    const newAnecdotes = anecdotes.map((anecdote) =>
      anecdote.id !== id ? anecdote : returnedAnecdote
    )
    dispatch(setAnecdotes(newAnecdotes))
  }
}

export default anecdoteSlice.reducer
