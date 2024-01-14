const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate([
    { path: 'user', select: 'username , name' },
    'comments',
  ])

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  try {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id,
      comments: body.comments,
    })
    const savedBlog = await blog.save()

    await savedBlog.populate([
      { path: 'user', select: 'username , name' },
      'comments',
    ])

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (exception) {
    console.log(exception)
    response.status(400).json(exception.message)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  await updatedBlog.populate([
    { path: 'user', select: 'username , name' },
    'comments',
  ])

  try {
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})
blogsRouter.put('/:id/comments', async (request, response, next) => {
  const body = request.body
  console.log('vody', body)
  const newComment = new Comment({
    content: body.content,
  })
  const savedComment = await newComment.save()
  const blog = await Blog.findById(request.params.id)
  console.log('blog', blog)
  blog.comments.push(savedComment)

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  await updatedBlog.populate([
    { path: 'user', select: 'username , name' },
    'comments',
  ])

  try {
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
