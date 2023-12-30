const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')





beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 10000)

test('unique identifier is id and not _id', async () => {
  const blog = await Blog.findOne({})
  expect(blog.id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Third Post',
    author: 'Audrey',
    url: 'wwww.thirdUrl.com',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd =  await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(
    'Third Post'
  )
})

test('likes defaults to 0 when created with no likes', async () => {
  const newBlog = {
    title: 'Fourth Post',
    author: 'Travis',
    url: 'wwww.nolikesUrl.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blog = await Blog.find({ title: 'Fourth Post' })
  expect(blog[0].likes).toBe(0)
})

test('a blog post with title will not be created', async () => {
  const newBlog = {
    author: 'Audrey',
    url: 'wwww.thirdUrl.com',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})
describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const title = blogsAtEnd.map(b => b.content)

    expect(title).not.toContain(blogToDelete.title)
  })
})



afterAll(async () => {
  await mongoose.connection.close()
})
