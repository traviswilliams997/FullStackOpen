import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'No Notifications Yet',
    reducers: {
      notificationChange(state, action){
        return action.payload
      },
      removeNotification(){
        return ''
      }
    },
})

export const { notificationChange, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer

