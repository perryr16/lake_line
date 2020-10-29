const express = require('express')
const cors = require('cors')
const parser = require('body-parser')
const knex = require('knex')

const trails = require('./controllers/trails')
const getTrails = require('./controllers/getTrails')
const splash = require('./controllers/splash')

require('dotenv').config()

const app = express()

app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())

app.set('port', process.env.PORT || 4000)
app.set('view engine', 'hbs')

app.use(cors())
app.use('/trails', trails)
app.use('/getTrails', getTrails)
app.use('/', splash)

app.listen(app.get('port'), () => {
  console.log('Listening on port 4000')
})