import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { compose } from 'redux'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    const sortedBlogs = [...blogs]
    sortedBlogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedBlogs))
  }
}
export const createBlog = (newObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.createNew(newObject)
    dispatch(appendBlog(newBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    await blogService.remove(id)
    const newBlogs = blogs.filter((b) => b.id !== id)
    dispatch(setBlogs(newBlogs))
  }
}

export const incrementLikes = (id, likesErrorHandling) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()

    try {
      const blog = await blogs.find((blog) => blog.id === id)
      const changedBlog = { ...blog, likes: blog.likes + 1 }
      const returnedBlog = await blogService.update(id, changedBlog)
      const newBlogs = blogs.map((blog) =>
        blog.id !== id ? blog : returnedBlog
      )
      const sortedBlogs = [...newBlogs]
      sortedBlogs.sort((a, b) => b.likes - a.likes)
      dispatch(setBlogs(sortedBlogs))
    } catch (error) {
      likesErrorHandling(error)
      dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)))
    }
  }
}

export const addComment = (id, commentContent) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    const comment = {
      content: commentContent,
    }
    try {
      const blog = await blogs.find((blog) => blog.id === id)
      const changedBlog = { ...blog }
      changedBlog.comments.push(comment)
      const returnedBlog = await blogService.addComment(id, comment)
      const newBlogs = blogs.map((blog) =>
        blog.id !== id ? blog : returnedBlog
      )
      const sortedBlogs = [...newBlogs]
      sortedBlogs.sort((a, b) => b.likes - a.likes)
      dispatch(setBlogs(sortedBlogs))
    } catch (error) {
      dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)))
    }
  }
}

export default blogSlice.reducer
