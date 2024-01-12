// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => {
    return blog.likes
  })
  const reducer = (total, likes) => {
    return total + likes
  }

  return likes.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes,
}
