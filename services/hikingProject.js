const mapquest = require('./mapquest')
const fetch = require('node-fetch')
const url = require('url')
const { Trail } = require('../models/schema')


const { TRAIL_KEY } = process.env
const API_URL = 'https://www.hikingproject.com/data/get-trails'

const getTrails = async (req) => {
  const location = url.parse(req.url, true).query.location;
  const keyword = url.parse(req.url, true).query.keyword || '';
  const lon = await mapquest.getLon(location)
  const lat = await mapquest.getLat(location)

  const urlTrail = new URL(API_URL)
  urlTrail.searchParams.set('key', TRAIL_KEY)
  urlTrail.searchParams.set('lat', lat)
  urlTrail.searchParams.set('lon', lon)
  urlTrail.searchParams.set('maxResults', 500)


  const response = await fetch(urlTrail)
    .then(response => response.json())

  const keyResults = response.trails.filter(trail => trail.name.toLowerCase().includes(keyword))

  return { 'resultsLength': keyResults.length, 'results': keyResults }
}

const populateDB = async (req) => {
  const results = await getTrails(req)
  const newTrails = results["results"]
  newTrails.forEach( async (newTrail) => {
    const trailFormatted = {
      name: newTrail['name'],
      summary: newTrail['summary'],
      difficulty: newTrail['difficulty'],
      url: newTrail['url'],
      imgMedium: newTrail['imgMedium'],
      lat: newTrail['latitude'],
      lon: newTrail['longitude'],
      length: newTrail['length'],
      stars: newTrail['stars'],
      location: newTrail['location'],
      ascent: newTrail['ascent'],
      descent: newTrail['descent'],
      high: newTrail['high'],
      low: newTrail['low'],
      conditionStatus: newTrail['conditionStatus'],
    }
    try {
      await Trail.query().insert(trailFormatted)
    } catch {
    }
  })
  const trails = await Trail.query()

  return {results: trails.length, newTrails: trails}
}

module.exports = { getTrails, populateDB }