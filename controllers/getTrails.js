const express = require('express')
const { Trail, Comment } = require('../models/schema')
const router = express.Router()
const mapquest = require('../services/mapquest')
const hikingProject = require('../services/hikingProject')
const knexfile = require('../knexfile')

router.get('/getLat', async (req, res, next) => {
  try {
    if (!req.query.location) throw new Error('Search param (`location`) required')
    res.json(await mapquest.getLat(req.query.location))
  } catch (error) {
    res.json({ error: error.message })
  }
})
router.get('/getLon', async (req, res, next) => {
  try {
    if (!req.query.location) throw new Error('Search param (`location`) required')
    res.json(await mapquest.getLon(req.query.location))
  } catch (error) {
    res.json({ error: error.message })
  }
})

router.get('/', async (req, res, next) => {
  try {
    res.json(await hikingProject.getTrails(req))
  } catch (error) {
    res.json({ error: error.message })
  }
})

router.get('/populateDB', async (req, res, next) => {
  try {
    res.json(await hikingProject.populateDB(req))
  } catch (error) {
    res.json({ error: error.message })
  }
})


module.exports = router;