import { useState, useEffect, useRef } from 'react'
import { useAppSelector, useAppDispatch } from './redux/redux-hooks'
import { incrementLikes, removeBlog } from './reducers/blogReducer'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import loginService from './services/login'

import { initializeBlogs } from './reducers/blogReducer'
import { updateNotification } from './reducers/notificationReducer'

import {
  resetUser,
  loginUser,
  logOutUser,
  initializeUsers,
} from './reducers/userReducer'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from 'react-router-dom'

const App = () => {
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  const blogs = useAppSelector(({ blogs }) => {
    return blogs
  })

  const user = useAppSelector(({ user }) => {
    return user.currentUser
  })

  const users = useAppSelector(({ user }) => {
    return user.users
  })

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
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
  const likesErrorHandling = (error) => {
    dispatch(updateNotification(`${error.message}`, 5))
  }
  const handleLikes = (foundBlog) => {
    dispatch(incrementLikes(foundBlog.id, likesErrorHandling))
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
  const home = () => (
    <div>
      {!user && (
        <div>
          <h2>log in to application</h2>
          {loginForm()}
        </div>
      )}
      {user && (
        <div>
          <h2>Blog App</h2>
          {blogForm()}
          <br />
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {' '}
                {blog.title} {blog.author}
              </Link>
            </li>
          ))}
        </div>
      )}
    </div>
  )
  const usersPage = () => (
    <div>
      {!user && (
        <div>
          <h2>log in to application</h2>
          {loginForm()}
        </div>
      )}

      {user && users && (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogOut}>Logout</button>
          <h2>users</h2>
          <div>............. blogs created</div>
          {users.map((user) => (
            <div key={user.id}>
              <Link to={`/users/${user.id}`}>
                {' '}
                {user.name} {user.blogs.length}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const User = ({ userArr }) => {
    const id = useParams().id
    const foundUser = userArr.find((u) => u.id === id)
    if (!foundUser) {
      return null
    }
    return (
      <div>
        <h2>{foundUser.username}</h2>
        <div>added blogs</div>
        {foundUser.blogs.map((blog) => (
          <li key={blog.id}> {blog.title}</li>
        ))}
      </div>
    )
  }
  const BlogView = ({ blogArr }) => {
    const id = useParams().id
    const foundBlog = blogArr.find((b) => b.id === id)
    if (!foundBlog) {
      return null
    }
    return (
      <div>
        <h1>
          {foundBlog.title} {foundBlog.author}
        </h1>
        <div>{foundBlog.url}</div>
        <div>
          {foundBlog.likes}{' '}
          <button onClick={() => handleLikes(foundBlog)}>Like</button>
        </div>
        <div>added by {foundBlog.user.username}</div>
      </div>
    )
  }

  return (
    <Router>
      <Notification />{' '}
      {user && (
        <div>
          <Link to="/">blogs </Link>
          <Link to="/users">users </Link>
          {user && user.name} logged in
          <button onClick={handleLogOut}> Logout</button>
        </div>
      )}
      <Routes>
        <Route path="/users/:id" element={<User userArr={users} />} />
        <Route path="/users" element={usersPage()} />
        <Route path="/blogs/:id" element={<BlogView blogArr={blogs} />} />
        <Route path="/" element={home()} />
      </Routes>
    </Router>
  )
}

export default App
