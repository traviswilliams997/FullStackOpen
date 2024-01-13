import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    users: [],
  },
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload
      return state
    },
    setUsers(state, action) {
      state.users = action.payload
      return state
    },
    appendUser(state, action) {
      state.users.push(action.payload)
    },
  },
})

export const { setUsers, appendUser, setCurrentUser } = userSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    console.log('init', users)

    dispatch(setUsers(users))
  }
}

export const resetUser = (user) => {
  return async (dispatch) => {
    dispatch(setCurrentUser(user))
    blogService.setToken(user.token)
  }
}
export const loginUser = (user) => {
  return async (dispatch) => {
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    console.log(user)
    dispatch(setCurrentUser(user))
    blogService.setToken(user.token)
  }
}

export const logOutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setCurrentUser(null))
  }
}

export default userSlice.reducer
