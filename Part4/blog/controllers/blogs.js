const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body
  try{
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    )

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    console.log(exception)
    response.status(400).json(exception.message)
  }
})

module.exports = blogsRouter