import { useState } from 'react'
import { useAppDispatch } from '../redux/redux-hooks'
import { incrementLikes, removeBlog } from '../reducers/blogReducer'
import { updateNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useAppDispatch()
  const [fullBlogVisible, setFullBlogVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const hideWhenVisible = { display: fullBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: fullBlogVisible ? '' : 'none' }

  const likesErrorHandling = (error) => {
    dispatch(updateNotification(`${error.message}`, 5))
  }
  const handleLikes = () => {
    dispatch(incrementLikes(blog.id, likesErrorHandling))
  }
  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(removeBlog(blog.id))
      } catch (error) {
        dispatch(updateNotification(`${error.message}`, 5))
      }
    }
  }
  const handleShowFullBlog = () => {
    setFullBlogVisible(!fullBlogVisible)
  }
  if (blog.user.username === user.username) {
    return (
      <div className="blog" style={blogStyle}>
        <div style={hideWhenVisible} id="minimized-blog">
          {blog.title} {blog.user.name}
          <button id="view" onClick={handleShowFullBlog}>
            view
          </button>
        </div>

        <div style={showWhenVisible} id="expanded-blog">
          <div>
            {blog.title} <button onClick={handleShowFullBlog}>hide</button>
          </div>
          <div>{blog.url}</div>
          <div id="like">
            Likes: {blog.likes} <button onClick={handleLikes}>Like</button>
          </div>
          {blog.user.name}
          <button onClick={handleRemove}> remove</button>
        </div>
      </div>
    )
  }

  if (blog.user.username !== user.username) {
    return (
      <div className="blog" style={blogStyle}>
        <div style={hideWhenVisible} id="minimized-blog">
          <div>
            {blog.title} {blog.user.name}
          </div>
          <button onClick={handleShowFullBlog}>view</button>
        </div>
        <div style={showWhenVisible} id="expanded-blog">
          <div>
            {blog.title} <button onClick={handleShowFullBlog}>hide</button>
          </div>
          {blog.url} <br />
          <div>
            {' '}
            {blog.likes} <button onClick={handleLikes}>Like</button>
          </div>
          {blog.user.name} <br />
        </div>
      </div>
    )
  }
}

export default Blog
