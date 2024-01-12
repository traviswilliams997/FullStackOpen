import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(
    'No notification yet...'
  )
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await blogService.getAll()
      const sortedBlogs = [...blogs]
      sortedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    fetchBlogs()
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
      setNotificationMessage('Wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    const returnedBlog = await blogService.create(blogObject)

    setBlogs(blogs.concat(returnedBlog))
    setNotificationMessage(`Added blog post "${returnedBlog.title}"`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const incrementLikes = async (id) => {
    const blog = await blogs.find((blog) => blog.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      const returnedBlog = await blogService.update(id, changedBlog)
      const newBlogs = blogs.map((blog) =>
        blog.id !== id ? blog : returnedBlog
      )
      newBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(newBlogs)
    } catch (error) {
      setNotificationMessage(`${error.message}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    }
  }

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id)
      const newBlogs = blogs.filter((b) => b.id !== id)
      setBlogs(newBlogs)
    } catch (error) {
      setNotificationMessage(`${error.message}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog post" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
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
      <Notification message={notificationMessage} />
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
              incrementLikes={incrementLikes}
              removeBlog={removeBlog}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
