import { useState } from 'react'
import { useAppDispatch } from '../redux/redux-hooks'
import { createBlog } from '../reducers/blogReducer'
import { updateNotification } from '../reducers/notificationReducer'

const BlogForm = ({ addBlogHelper }) => {
  const dispatch = useAppDispatch()

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    const title = event.currentTarget.elements.title.value
    const author = event.currentTarget.elements.author.value
    const url = event.currentTarget.elements.url.value
    event.currentTarget.elements.title.value = ''
    event.currentTarget.elements.author.value = ''
    event.currentTarget.elements.url.value = ''

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    addBlogHelper(newBlog)

    dispatch(createBlog(newBlog))

    dispatch(updateNotification(`Added blog post "${newBlog.title}"`, 5))
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
          name="title"
          value={newBlogTitle}
          onChange={handleBlogTitleChange}
          placeholder="Title..."
        />{' '}
        <br />
        author:
        <input
          id="author-input"
          name="author"
          value={newBlogAuthor}
          onChange={handleBlogAuthorChange}
          placeholder="Author..."
        />{' '}
        <br />
        url:
        <input
          id="url-input"
          name="url"
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
