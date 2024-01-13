import blogReducer from './blogReducer'
import deepFreeze from 'deep-freeze'

describe('blogReducer', () => {
  test('returns new state with action blogs/setBlogs', () => {
    const state = []
    const action = {
      type: 'blogs/setBlogs',
      payload: [
        {
          title: 'first blog',
          author: 'person 1',
          url: 'www.google.com',
        },
      ],
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState.title).toBe(action.payload.title)
    expect(newState.author).toBe(action.payload.author)
    expect(newState.url).toBe(action.payload.url)
  })

  test('returns new state with action blogs/appendBlog', () => {
    const state = [
      {
        title: 'first blog',
        author: 'person 1',
        url: 'www.google.com',
      },
      {
        title: 'second blog',
        author: 'person 2',
        url: 'www.google2.com',
      },
    ]

    const action = {
      type: 'blogs/appendBlog',
      payload: {
        title: 'third blog',
        author: 'person 3',
        url: 'www.google3.com',
      },
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(3)

    expect(newState).toContainEqual(state[0])

    expect(newState).toContainEqual({
      title: 'third blog',
      author: 'person 3',
      url: 'www.google3.com',
    })
  })
})
