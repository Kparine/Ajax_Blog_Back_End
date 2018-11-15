//INITIALIZE EXPRESS
const express = require('express')
const postCtrl = require('../controllers/posts.js')

//CREATE ROUTER
const router = express.Router()

//ADD THE ROUTES
router.post('/', postCtrl.create)
router.get('/', postCtrl.getAll)
router.get('/:id', postCtrl.getOne)
router.delete('/:id', postCtrl.remove)
router.put('/:id', postCtrl.update)

module.exports = router