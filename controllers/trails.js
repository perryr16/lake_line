const express = require('express')
const { Trail } = require('../models/schema')
const mapquest = require('../services/mapquest')
// const { Trail, Comment } = require('../models/schema')
const router = express.Router()
const { raw } = require('objection')

// All Trails
router.get('/', async (req, res, next) => {
  try {
    if (!req.query.location) {
      const trails = await Trail.query()
      res.json({resultsLength: trails.length, results: trails})
    } else {
      const locationTrails = await Trail.query().whereRaw("lower(location) LIKE '%' || LOWER(?) || '%'", `${req.query.location}`)
      res.json({resultsLength: locationTrails.length, results:locationTrails})
    }
  } catch (error) {
    res.json({error: error.message})
  }
  // res.json(trails)
})
// Trail by Id
router.get('/:id', async (req, res) => {
  // const trail = await Trail.query().findById(req.params.id).withGraphFetched('comments')
  const trail = await Trail.query().findById(req.params.id)
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


// // Create comment attatched to trail
// router.post('/:id/comments', async (req, res) => {
//   const trail = await Trail.query().findById(req.params.id)
//   await trail.$relatedQuery('comments')
//              .allowInsert('[comment, creator]')
//              .insert(req.body)

//   res.send(trail)
// })

// Delete trail by id
router.delete('/:id', async (req, res) => {
  await Trail.query().deleteById(req.params.id)

  res.redirect('/trails')
})

// // Delete comment
// router.delete('/:id/comments/:commentId', async (req, res) => {
//   await Comment.query().deleteById(req.params.commentId)

//   res.redirect(`/trails/${req.params.id}`)
// })

// router.get('/populateDb/lat', async (req, res, next) => {
//   try {
//     if (!req.query.location) throw new Error('Search param (`location`) required')
//     res.json(await mapquest.getLat(req.query.location))
//   } catch (error) {
//     res.json({error: error.message})
//   }
// })

module.exports = router;