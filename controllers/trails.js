const express = require('express')
const { Trail, Comment } = require('../models/schema')
const router = express.Router()

router.get('/', async (req, res) => {
  const trails = await Trail.query()
  res.json(trails)
})

router.get('/:id', async (req, res) => {
  const trail = await Trail.query().findById(req.params.id).eager('comments')
  res.json(trail)
})

router.post('/', async (req, res) => {
  const newTrail = req.body
  const trail = await Trail.query()
                           .allowGraph('[name, description, lat, lon, length, rating, location, state]')
                           .insert(newTrail)
  res.send(trail)
} )

module.exports = router;