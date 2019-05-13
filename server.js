const express = require('express')

const server = express()
server.use(express())

server.use(`/`, (req, res) => res.send(`Welcome to the POSTS API server`))

module.exports = server