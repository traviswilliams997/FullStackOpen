import { useState } from 'react'


const Blog = ({ blog, incrementLikes, removeBlog, user}) => {
  const [showFullBlog, setShowFullBlog] = useState(false)

  const handleShowFullBlog = () => {
    setShowFullBlog(!showFullBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

   const handleLikes = () => {
    incrementLikes(blog.id)
   }
   const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
   }


  if(!showFullBlog){
    return (
      <div style={blogStyle}>
        {blog.title} {blog.user.name}
        <button onClick={handleShowFullBlog}>view</button>
      </div>
    )
  }

  if(showFullBlog && blog.user.username == user.username){
    return (
    <div style={blogStyle}>
      <div>{blog.title} <button onClick={handleShowFullBlog}>hide</button></div>
      {blog.url} <br />
      <div> {blog.likes} <button onClick={handleLikes}>Like</button></div>
      {blog.user.name} <br />
     <button onClick={handleRemove}> remove</button>
  </div> 
  )
  }

  if(showFullBlog && blog.user.username != user.username){
    return (
    <div style={blogStyle}>
      <div>{blog.title} <button onClick={handleShowFullBlog}>hide</button></div>
      {blog.url} <br />
      <div> {blog.likes} <button onClick={handleLikes}>Like</button></div>
      {blog.user.name} <br />
  </div> 
  )
  }
   

}


export default Blog