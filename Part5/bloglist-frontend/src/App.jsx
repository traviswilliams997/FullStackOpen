import { useState, useEffect, useRef } from 'react'
import { useAppSelector, useAppDispatch } from './redux/redux-hooks'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import loginService from './services/login'

import { initializeBlogs } from './reducers/blogReducer'
import { resetUser, loginUser, logOutUser } from './reducers/userReducer'

import { updateNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  const blogs = useAppSelector(({ blogs }) => {
    return blogs
  })

  const user = useAppSelector(({ user }) => {
    return user
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(resetUser(user))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      dispatch(loginUser(user))
    } catch (exception) {
      dispatch(updateNotification('Wrong credentials', 5))
    }
    setUsername('')
    setPassword('')
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    dispatch(logOutUser())
    setUsername('')
    setPassword('')
  }

  const addBlogHelper = () => {
    blogFormRef.current.toggleVisibility()
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
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
