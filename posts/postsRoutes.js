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
  try {

  }
  catch (err) {

  }
})

// POST
router.post(`/`, async (req, res) => {
  try {

  }
  catch (err) {

  }
})

// PUT
router.put(`/`, async (req, res) => {
  try {

  }
  catch (err) {

  }
})


// DELETE
router.delete(`/`, async (req, res) => {
  try {

  }
  catch (err) {

  }
})

module.exports = router