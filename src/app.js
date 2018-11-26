const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())


const postRoutes = require('../src/routes/posts.js')
app.use('/posts', postRoutes)

//ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err)
  const status = err.status || 500
  res.status(status).json({ error: err })
})

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Not Found' }})
})

app.listen(port, function () {
  console.log(`Howdy From Port ${port}`)
})

// HEROKU DEPLOYED LINK
// To https://git.heroku.com/secret-scrubland-84127.git

module.exports = app