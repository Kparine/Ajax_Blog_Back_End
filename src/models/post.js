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
  const errors = []
  const {
    title,
    content
  } = newPost

  //TEST CASES FOR CREATE FUNCTION
  if (!title || !content) {
    errors.push('Please Provide Title And Content')
  }
  if(title.length > 60){
    errors.push('Title Should Be Less Than 60 Characters')
  }
  if(content.length > 300){
    errors.push('Post Should Less Than 300 Characters')
  }
  if (errors.length) return {
    errors
  }
  
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
  const errors = []
  const { title, content } = body
  const posts = read()
  const post = posts.find(ele => ele.id === id)

  if (post < 0) {
    errors.push('Could Not Find Post To Edit')
  }
  if (!title || !content) {
    errors.push('Please Provide Title And Content')
  }
  // if(title.length > 60){
  //   errors.push('Title Should Be Less Than 60 Characters')
  // }
  // if(content.length > 300){
  //   errors.push('Post Should Less Than 300 Characters')
  // }
  if (errors.length) return {
    errors
  }

  if (errors.length < 1) {
    post.title = title
    post.content = content
    write(posts)
  } else {
    post.errors = errors
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