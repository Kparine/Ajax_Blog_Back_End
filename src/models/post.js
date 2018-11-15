const uuid = require('uuid/v4')
const { manageFile } = require('../../utils/index.js')
const { read, write } = manageFile('../db/posts.json')

//CREATE FUNCTION
function create(body){
  const error = []
  const name = body.name

  if(!name){
    error.push('Please Provide Name')
  }
  if(typeof name !== "string"){
    error.push('Completed should be a string')
  }

  if(error.length) return { error }

  const post = {
    id: uuid(),
    name,
    content
  }

  const posts = read()
  
  posts.push(post)
  
  write(posts)

  return post
}

//GET ALL FUNCTION
function getAll(id) {
  const posts = read()
  return id ? posts.slice(0, id) : posts
}

//GET ONE FUNCTION
function getOne(id) {
  const posts = read()

  const post = posts.find(ele => ele.id === id)

  if (!post) {
    return {
      error: ['Post not found']
    }
  }
  return post
}

//UPDATE FUNCTION
function update(id, body) {
  const posts = read()
  const name = body.name
  const onePost = posts.find(ele => ele.id === id)

  if (!onePost) {
    return {
      error: ['Post not found. Could not update']
    }
  }
  const post = {
    id: uuid(),
    name,
    content
  }
  posts.splice(1, 0, post)
  write(posts)
  return post
}

//DELETE FUNCTION
function remove(id) {
  const posts = read()
  const idx = posts.findIndex(ele => ele.id === id)

  if (idx === -1) return {
    error: ['Post not found, could not delete']
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