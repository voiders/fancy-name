const mongoose = require('mongoose')
const config = require('../config/environment')
const url = config.MONGODB_URI

const connection = mongoose.connect(url)

module.exports = connection
