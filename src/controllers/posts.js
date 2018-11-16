const postModel = require('../models/post.js')


//CREATE
function create(req, res, next){
  const data = postModel.create(req.body)

  if (data.errors) {
    return next({ status: 400, message: `Create Post Failed`, errors: data.errors })
  }
  res.status(201).json(data)
}

//GET ALL 
function getAll(req, res, next){
  const limit = req.query.limit
  const data = postModel.getAll(limit)
  let result = []
  
  if (result.errors) {
    return next({
      status: 400,
      message: `Could Not Find Post`,
      errors: result.errors
    })
  }
  res.status(200).json({
    data
  })
}

//GET ONE
function getOne(req, res, next) {
  const data = postModel.getOne(req.params.id)

  if(!data) return next({status: 404, message: data })

  res.status(200).send(data)
}

//UPDATE
function update(req, res, next) {
const id = req.params.id
const body = req.body  
const data = postModel.update(id, body)

  if(data.errors) {
    return next({
      status: 404,
      message: `Could Not Update Blog`,
      errors: data.errors
    })
  }
  res.status(201).json(
    data
  )
}

//DELETE
function remove(req, res, next) {
  const id = req.params.id
  const post = postModel.remove(id)

  if (!post) return next({
    status: 400,
    message: 'Delete Failed' })
  
    res.status(200).send(post)
}

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove
}