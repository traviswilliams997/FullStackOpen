import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { useAppSelector, useAppDispatch } from '../redux/redux-hooks'
import { testUseAppSelector } from '../redux/test-app-selector'

jest.mock('../redux/redux-hooks')

describe('<BlogForm /> ', () => {
  beforeEach(() => {
    useAppSelector.mockImplementation(testUseAppSelector)
    useAppDispatch.mockImplementation(() => jest.fn())
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  test('updates parent state and calls onSubmit', async () => {
    const addBlogHelper = jest.fn()
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm addBlogHelper={addBlogHelper} />)

    const titleInput = screen.getByPlaceholderText('Title...')
    const authorInput = screen.getByPlaceholderText('Author...')
    const urlInput = screen.getByPlaceholderText('Url...')

    const sendButton = screen.getByText('save')

    await user.type(titleInput, 'First Post')
    await user.type(authorInput, 'John Smith')
    await user.type(urlInput, 'www.blog.com')

    await user.click(sendButton)

    expect(useAppDispatch).toHaveBeenCalled()
    expect(addBlogHelper.mock.calls).toHaveLength(1)
    expect(addBlogHelper.mock.calls[0][0].title).toBe('First Post')
    expect(addBlogHelper.mock.calls[0][0].author).toBe('John Smith')
    expect(addBlogHelper.mock.calls[0][0].url).toBe('www.blog.com')
  })
})
