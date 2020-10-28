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


  // const keyResults = apiResults.trails.filter(trail => trail.name.includes(keyword))
  const keyResults = response.trails.filter(trail => trail.name.toLowerCase().includes(keyword))

  return { 'resultsLength': keyResults.length, 'results': keyResults }
}

const populateDB = async (req) => {
  const results = await getTrails(req)
  const newTrails = results["results"]
  const formatTrails = []
  newTrails.forEach( newTrail => 
    formatTrails.push({
      name: newTrail['name'],
      summary: newTrail['summary'],
      difficulty: newTrail['difficulty'],
      url: newTrail['url'],
      imgMedium: newTrail['imgMedium'],
      lat: newTrail['lat'],
      lon: newTrail['lon'],
      length: newTrail['length'],
      stars: newTrail['stars'],
      location: newTrail['location'],
      ascent: newTrail['ascent'],
      descent: newTrail['descent'],
      high: newTrail['high'],
      low: newTrail['low'],
      conditionStatus: newTrail['conditionStatus'],
    })
  )
  // console.log(formatTrails);
  // const trail1 = await Trail.query().findById(1)
  // console.log(trail1)
  // console.log(formatTrails[1])
  const trails = await Trail.query().insert(formatTrails)
  
  // return formatTrails
  return {results: trails.length, newTrails: trails}
}

module.exports = { getTrails, populateDB }


// Trail.query().allowGraph('[name, description, lat, lon, length, rating, location, state]').insert(formatTrails)
      // newTrails.forEach( newTrail => {  
  //   let x = {    
  //     name: newTrail['name'],
  //     summary: newTrail['summary'],
  //     difficulty: newTrail['difficulty'],
  //     url: newTrail['url'],
  //     imgMedium: newTrail['imgMedium'],
  //     lat: newTrail['lat'],
  //     lon: newTrail['lon'],
  //     length: newTrail['length'],
  //     stars: newTrail['stars'],
  //     location: newTrail['location'],
  //     ascent: newTrail['ascent'],
  //     descent: newTrail['descent'],
  //     high: newTrail['high'],
  //     low: newTrail['low'],
  //     conditionStatus: newTrail['conditionStatus'],
  //   }

    // const trail = await Trail.query().insert(x)

  // })
  // newTrails.forEach( (newTrail) => {
  //   const trail = Trail.query()
  //     // .allowGraph('[name, description, lat, lon, length, rating, location, state]')
  //     .insert(newTrail)
  //   }
  // )
