const express = require('express')
const postsRoutes = require('./posts/postsRoutes')

const server = express()
server.use(express.json())

server.use(`/api/posts`, postsRoutes)
server.use(`/`, (req, res) => res.send(`Welcome to the POSTS API server`))

module.exports = server