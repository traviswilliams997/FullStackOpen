import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const resetUser = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user))
    blogService.setToken(user.token)
  }
}
export const loginUser = (user) => {
  return async (dispatch) => {
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    console.log(user)
    dispatch(setUser(user))
    blogService.setToken(user.token)
  }
}

export const logOutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setUser(null))
  }
}

export default userSlice.reducer
