import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />  when user is same as poster', () => {

  test('renders content', () => {
    const blog = {
      title: 'Blog',
      url: 'www.test.com',
      likes: 2,
      user: {
        name: 'Williams',
        username: 'Travis',
        id: '1111111'
      }
    }

    const user = {
      name: 'Williams',
      username: 'Travis',
      id: '1111111'
    }

    const { container } = render(<Blog blog={blog} user={user}/>)

    const minimizedBlogDiv = container.querySelector('#minimized-blog')
    const button = screen.getByText('view')

    expect(minimizedBlogDiv).toBeDefined()
    expect(minimizedBlogDiv).toHaveTextContent('Blog')
    expect(minimizedBlogDiv).toHaveTextContent('Williams')
    expect(minimizedBlogDiv).not.toHaveTextContent('www.test.com')
    expect(button).toBeDefined()
    expect(button).toHaveTextContent('view')
    expect(button).not.toHaveTextContent('hide')
  })

  test('clicking view button shows url and likes and remove button', async () => {

    const blog = {
      title: 'Blog',
      url: 'www.test.com',
      likes: 2,
      user: {
        name: 'Williams',
        username: 'Travis',
        id: '1111111'
      }
    }

    const user = {
      name: 'Williams',
      username: 'Travis',
      id: '1111111'
    }

    const { container } =  render(<Blog blog={blog} user={user}/>)

    const minimizedBlogDiv = container.querySelector('#minimized-blog')
    expect(minimizedBlogDiv).toHaveStyle('display: block')

    const expandedBlogDiv = container.querySelector('#expanded-blog')
    expect(expandedBlogDiv).toHaveStyle('display: none')

    const testUser = userEvent.setup()
    const button = screen.getByText('view')
    expect(button).toBeDefined()
    await testUser.click(button)


    expect(expandedBlogDiv).toHaveStyle('display: block')
    expect(minimizedBlogDiv).toHaveStyle('display: none')
    expect(expandedBlogDiv).toHaveTextContent('Blog')
    expect(expandedBlogDiv).toHaveTextContent('www.test.com')
    expect(expandedBlogDiv).toHaveTextContent('Williams')
    expect(expandedBlogDiv).toHaveTextContent('2')
    const newButton = screen.getByText('hide')
    expect(newButton).toBeDefined()

    const removeButton = screen.getByText('remove')
    expect(removeButton).toBeDefined()

  })

  test('clicking likes button twice calls event handler twice', async () => {
    const incrementLikes = jest.fn()


    const blog = {
      title: 'Blog',
      url: 'www.test.com',
      likes: 2,
      user: {
        name: 'Williams',
        username: 'Travis',
        id: '1111111'
      }
    }

    const user = {
      name: 'Williams',
      username: 'Travis',
      id: '1111111'
    }

    render(<Blog blog={blog} incrementLikes={incrementLikes} user={user}/>)

    const testUser = userEvent.setup()
    const button = screen.getByText('view')
    expect(button).toBeDefined()
    await testUser.click(button)

    const likesButton = screen.getByText('Like')
    expect(likesButton).toBeDefined()
    await testUser.click(likesButton)
    await testUser.click(likesButton)

    expect(incrementLikes.mock.calls).toHaveLength(2)


  })
})


describe('<Blog />  when user different than  poster', () => {

  test('clicking view button shows url and likes and remove button', async () => {

    const blog = {
      title: 'Blog',
      url: 'www.test.com',
      likes: 2,
      user: {
        name: 'Williams',
        username: 'Travis',
        id: '1111111'
      }
    }

    const user = {
      name: 'Jacob',
      username: 'Jacob',
      id: '1111111'
    }

    const { container } =  render(<Blog blog={blog} user={user}/>)
    const minimizedBlogDiv = container.querySelector('#minimized-blog')
    expect(minimizedBlogDiv).toHaveStyle('display: block')

    const expandedBlogDiv = container.querySelector('#expanded-blog')
    expect(expandedBlogDiv).toHaveStyle('display: none')

    const testUser = userEvent.setup()
    const button = screen.getByText('view')
    expect(button).toBeDefined()
    await testUser.click(button)

    expect(expandedBlogDiv).toHaveStyle('display: block')
    expect(minimizedBlogDiv).toHaveStyle('display: none')
    expect(expandedBlogDiv).toHaveTextContent('Blog')
    expect(expandedBlogDiv).toHaveTextContent('www.test.com')
    expect(expandedBlogDiv).toHaveTextContent('Williams')
    expect(expandedBlogDiv).toHaveTextContent('2')
    const newButton = screen.getByText('hide')
    expect(newButton).toBeDefined()


    const getRemoveButton = () => {
      screen.getByText('remove')
    }
    expect(getRemoveButton).toThrow('Unable to find an element with the text: remove. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.')
  })
})
