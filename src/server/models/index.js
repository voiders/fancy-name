const mongoose = require('mongoose')

mongoose.Promise = require('bluebird')

const { userSchema } = require('./user.js')

const User = mongoose.model('User', userSchema)

module.exports = {
  User
}
