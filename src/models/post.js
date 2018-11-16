const uuid = require('uuid/v4')
const {
  manageFile
} = require('../../utils/index.js')
const {
  read,
  write
} = manageFile('../db/posts.json')

//GET ALL FUNCTION
function getAll(id) {
  const posts = read()
  const errors = []

  if (!data.length) {
    errors.push('No Current Posts')
    return {
      errors
    }
  }
  return id ? posts.slice(0, id) : posts
}

//GET ONE FUNCTION
function getOne(id) {
  const posts = read()
  const errors = []
  const post = posts.find(ele => ele.id === id)

  if (!post) {
    errors.push('No Current Posts')
    return {
      errors
    }

  }
  return post
}

//CREATE FUNCTION
function create(newPost) {
  const error = []
  const {
    title,
    content
  } = newPost

  if (title || content) {
    error.push('Please Provide Title And Content')
  }

  // if(title.length > 30){
  //   error.push('Title Should Be Less Than 30 Characters')
  // }

  // if(content.length > 300){
  //   error.push('Post Should Less Than 300 Characters')
  // }

  // if (error.length) return {
  //   error
  // }

  let post = {
    id: uuid(),
    title,
    content
  }
  const posts = read()
  posts.push(post)
  write(posts)
  return post
}

//UPDATE FUNCTION
function update(id, body) {
  const error = []
  const { title, content } = body
  const posts = read()
  const post = posts.find(ele => ele.id === id)

  if (post < 0) {
    error.push('Could Not Find Post To Edit')
  }

  if (!title) {
    error.push('Posts Require A Title')
  }

  if (!content) {
    error.push('Posts Require Content')
  }

  if (error.length < 1) {
    post.title = title
    post.content = content
    write(posts)
  } else {
    post.error = error
  }
  return post
}

//DELETE FUNCTION
function remove(id) {
  const posts = read()
  const idx = posts.findIndex(ele => ele.id === id)

  if (idx === -1) return {
    error: ['Post Not Found, Could Not Delete']
  }

  const savedPost = posts[idx]
  posts.splice(idx, 1)

  write(posts)

  return savedPost

}

module.exports = {
  create,
  getOne,
  getAll,
  remove,
  update
}