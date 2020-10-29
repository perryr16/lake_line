const express = require('express')
const router = express.Router()

// All Trails
router.get('/', async (req, res) => {
  const routes = {routes: {
    "/trails": "all trails", 
    "/getTrails?location=<location>&keyword=<keyword>": "find trails using Hiking Project API",
    "/getTrails/populateDB?location=<location>&keyword=<keyword>": "populate the database with new trails from hiking project"
  }}
  res.json(routes)
  // res.json(trails)
})

module.exports = router;