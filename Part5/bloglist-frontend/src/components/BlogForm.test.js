import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('Title...')
  const authorInput = screen.getByPlaceholderText('Author...')
  const urlInput = screen.getByPlaceholderText('Url...')

  const sendButton = screen.getByText('save')

  await user.type(titleInput, 'First Post')
  await user.type(authorInput, 'Me')
  await user.type(urlInput, 'www.blog.com')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('First Post')
  expect(createBlog.mock.calls[0][0].author).toBe('Me')
  expect(createBlog.mock.calls[0][0].url).toBe('www.blog.com')

})