import axios from 'axios'
//import { useNotificationDispatch } from './NotificationContext'

const baseUrl = 'http://localhost:3001/anecdotes'

/*
const handleErr= (error) => {
  const notificationDispatch = useNotificationDispatch()

    notificationDispatch({
      type: 'SET',
      payload: `${error}`
    })
  
    setTimeout(() => {
      notificationDispatch({
        type: 'CLEAR',
      })
    }, 5000)

}

*/
export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote => {
  
  axios.post(baseUrl, newAnecdote).then(res => res.data).catch(error => {

   
  })
  
}
 




export const updateAnecdote = updatedAnecdote =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)