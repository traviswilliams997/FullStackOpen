import { useState } from 'react'

const Blog = ({ blog, user, incrementLikes, removeBlog }) => {
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

  const handleLikes = () => {
    incrementLikes(blog.id)
  }
  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
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
