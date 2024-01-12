import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
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
      <form onSubmit={addBlog}>
        title:
        <input
          id="title-input"
          value={newBlogTitle}
          onChange={handleBlogTitleChange}
          placeholder="Title..."
        />{' '}
        <br />
        author:
        <input
          id="author-input"
          value={newBlogAuthor}
          onChange={handleBlogAuthorChange}
          placeholder="Author..."
        />{' '}
        <br />
        url:
        <input
          id="url-input"
          value={newBlogUrl}
          onChange={handleBlogUrlChange}
          placeholder="Url..."
        />
        <br />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm
