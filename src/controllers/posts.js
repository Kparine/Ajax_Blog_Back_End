const postModel = require('../models/post.js')


//CREATE
function create(req, res, next){
  const newPost = postModel.create(req.body)

  if(newPost.error) return next( { status: 400, message: newPost })
  
  res.status(201).send({ data: newPost })
}

//GET ALL 
function getAll(req, res, next) {
  const id = req.params.id
  const data = postModel.getAll(id)
  let result = []
  
  if (result.errors) {
    return next({
      status: 400,
      message: `Could not find post`,
      errors: result.errors
    })
  }
  res.status(200).json({
    data
  })
}

//GET ONE
function getOne(req, res, next) {
  const post = postModel.getOne(req.params.id)

  if(!post) return next({status: 404, message: post })

  res.status(200).send(post)
}

//UPDATE
function update(req, res, next) {
const id = req.params.id  
const name = req.body.name
const result = postModel.update(id, req.body)

  if(result.errors) {
    return next({
      status: 404,
      message: `Could not update blog`,
      errors: result.errors
    })
  }
  res.status(200).json({
    data: result
  })
}

//DELETE

function remove(req, res, next) {
  const post = postModel.remove(req.params.id)

  if (!post) return next({
    status: 404,
    message: post
  })
  res.status(200).send(post)
}

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove
}