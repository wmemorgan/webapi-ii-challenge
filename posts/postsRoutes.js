const express = require('express')
// Import database methods
const db = require('../data/db')
// Instantiate router
const router = express.Router()

// GET
router.get(`/`, async (req, res) => {
  try {
    let data = await db.find()
    res.send(data)
  }
  catch (err) {
    res.status(500).json({error: `The posts information could not be retrieved.`})
  }
})

router.get(`/:id`, async (req, res) => {
  const { id } = req.params
  console.log(`GET request on ID ${id}`)
  try {
    let data = await db.findById(id)
    if (data.length === 0) {
      res.status(404).json({message: `Post ID ${id} does not exist.`})
    } else {
      res.send(data)
    }
  }
  catch (err) {
    res.status(500).json({error: `The post information could not be retrieved.`})
  }
})

// POST
router.post(`/`, async (req, res) => {
  console.log(`POST request contents: `, req.body)
  const { title, contents } = req.body
  try {
    if (!title || !contents) {
      res.status(400).json({ errorMessage: `Please provide title and contents for this post.`})
    } else {
      // Create new database record
      let newId = await db.insert(req.body)
      // Retrieve newly created record
      let data = await db.findById(newId.id)
      res.status(201).send(data)
    }
  }
  catch (err) {
    res.status(500).json({error: `There was an error while saving the post to the database.`})
  }
})

// PUT
router.put(`/:id`, async (req, res) => {
  const { id } = req.params
  const { title, contents } = req.body
  console.log(`PUT request on ID ${id}`)
  try {
    // Edge case check - content submission
    if (!title || !contents) {
      res.status(400).json({errorMessage: `Please provide title and contents for the post.`})
    } else {
      let record = await db.findById(id)
      // Edge case check - post ID
      if (record.length === 0) {
        res.status(404).json({message: `Post ID ${id} does not exist`})
      } else {
        let updateRecordCount = await db.update(id, req.body)
        console.log(`updateRecordCount: ${updateRecordCount}`)
        if (updateRecordCount === 1) {
          let data = await db.findById(id)
          res.send(data)
        } else throw err
      }
    }
 
  }
  catch (err) {
    res.status(500).json({error: `The post information could not be modified.`})
  }
})


// DELETE
router.delete(`/:id`, async (req, res) => {
  const { id } = req.params
  try {
    let record = await db.findById(id)
    // Edge case check - post ID
    if (record.length === 0) {
      res.status(404).json({ message: `Post ID ${id} does not exist.`})
    } else {
      await db.remove(id)
      res.send(record)
    }
  }
  catch (err) {
    res.status(500).json({ error: `The post could not be removed` })
  }
})

module.exports = router