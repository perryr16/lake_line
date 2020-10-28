const fetch = require('node-fetch')

const { MAP_KEY } = process.env
const API_URL = `https://www.mapquestapi.com/geocoding/v1/address`

const getLat = async query => {
  const url = new URL(API_URL)
  url.searchParams.set('key', MAP_KEY)
  url.searchParams.set('location', query)

  const response = await fetch(url)
    .then(response => response.json())
  // const apiResults = await response.json()
  const lat = response.results[0].locations[0].latLng.lat
  return lat
}

const getLon = async query => {
  const url = new URL(API_URL)
  url.searchParams.set('key', MAP_KEY)
  url.searchParams.set('location', query)

  const response = await fetch(url)
    .then(response => response.json())

  const lon = response.results[0].locations[0].latLng.lng
  return lon
}

module.exports = { getLat, getLon }