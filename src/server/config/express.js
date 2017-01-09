// const path = require('path')
// const express = require('express')
const config = require('./environment')
// const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const mongooseConnection = require('../components/connect.js').connection

module.exports = function (app) {
  app.use(morgan('dev'))
  app.use(cookieParser(config.secret))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection})
  }))
  // app.use(favicon(path.join(__dirname, '../../favicon.ico')))
  // app.use(express.static(config.PUBLIC_PATH))
  // app.use(express.static(config.FILES_PATH))
  // require('./passport.js')(app)
}
