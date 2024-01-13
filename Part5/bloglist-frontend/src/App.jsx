import { useState, useEffect, useRef } from 'react'
import { useAppSelector, useAppDispatch } from './redux/redux-hooks'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

import {
  initializeBlogs,
  incrementLikes,
  removeBlog,
} from './reducers/blogReducer'
import { updateNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const blogs = useAppSelector(({ blogs }) => {
    return blogs
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('handleLogin error', exception.message)
      dispatch(updateNotification('Wrong credentials', 5))
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const addBlogHelper = () => {
    blogFormRef.current.toggleVisibility()
  }
  const handleLikes = (blog, likesErrorHandling) => {
    dispatch(incrementLikes(blog.id, likesErrorHandling))
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog post" ref={blogFormRef}>
      <BlogForm addBlogHelper={addBlogHelper} />
    </Togglable>
  )

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  return (
    <div>
      <Notification />
      {!user && (
        <div>
          <h2>log in to application</h2>
          {loginForm()}
        </div>
      )}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogOut}>Logout</button>
          <h3>Create new blog</h3>
          {blogForm()}
          <br />
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLikes={handleLikes}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
