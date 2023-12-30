const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'First Post',
    author: 'Travis',
    url: 'www.someUrl.com',
    likes: 3
  },
  {
    title: 'Second Post',
    author: 'Carley',
    url: 'www.anotherUrl.com',
    likes: 5
  },
]


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}