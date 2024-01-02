import { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('') 
  const [newBlogAuthor, setNewBlogAuthor] = useState('') 
  const [newBlogUrl, setNewBlogUrl] = useState('') 

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author:newBlogAuthor,
      url: newBlogUrl,
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')  
 }

  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }
  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        title:
        <input
          value={newBlogTitle}
          onChange={handleBlogTitleChange}
        />   <br/>
        author:
        <input
          value={newBlogAuthor}
          onChange={handleBlogAuthorChange}
        /> <br/>
        url:
         <input
          value={newBlogUrl}
          onChange={handleBlogUrlChange}
        /><br/>
        <button type="submit">save</button>
      </form>  
    </div>
  )
}

export default BlogForm