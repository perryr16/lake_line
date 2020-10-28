const express = require('express')
const { Trail, Comment } = require('../models/schema')
const router = express.Router()

// All Trails
router.get('/', async (req, res) => {
  const trails = await Trail.query()
  res.json(trails)
})

// Trail by Id
router.get('/:id', async (req, res) => {
  const trail = await Trail.query().findById(req.params.id).eager('comments')
  res.json(trail)
})

// Create Trail
router.post('/', async (req, res) => {
  const newTrail = req.body
  const trail = await Trail.query()
                           .allowGraph('[name, description, lat, lon, length, rating, location, state]')
                           .insert(newTrail)
  res.send(trail)
} )

// Create comment attatched to trail
router.post('/:id/comments', async (req, res) => {
  const trail = await Trail.query().findById(req.params.id)
  await trail.$relatedQuery('comments')
             .allowInsert('[comment, creator]')
             .insert(req.body)

  res.send(trail)
})

// Delete trail by id
router.delete('/:id', async (req, res) => {
  await Trail.query().deleteById(req.params.id)

  res.redirect('/trails')
})

// Delete comment
router.delete('/:id/comments/:commentId', async (req, res) => {
  await Comment.query().deleteById(req.params.commentId)

  res.redirect(`/trails/${req.params.id}`)
})

module.exports = router;