const listHelper = require('../utils/list_helper')

describe('total likes', () => {

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
  ]

  const listWithTwoBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Another post',
      author: 'Random author',
      url: 'www.someUrl.com',
      likes: 10,
      __v: 0
    }
  ]
  const listWithNoBlog = [
  ]

  test('total likes one blog', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })

  test('total likes two blogs', () => {
    expect(listHelper.totalLikes(listWithTwoBlog)).toBe(15)
  })

  test('total likes no blog', () => {
    expect(listHelper.totalLikes(listWithNoBlog)).toBe(0)
  })
})