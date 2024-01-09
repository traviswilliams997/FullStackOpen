import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'No Notifications Yet',
    reducers: {
      notificationChange(state, action){
        return action.payload
      },
      clearNotification(){
        return ''
      }
    },
})

export const { notificationChange, clearNotification} = notificationSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(notificationChange(message))
    
     setTimeout(() => {
      dispatch(clearNotification())
    }, time*1000)
  }
} 



export default notificationSlice.reducer

