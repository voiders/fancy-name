const mongoose = require('mongoose')

const schema = {
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: [2, 'Name too short'],
    maxlength: [30, 'Name too long']
  },
  email: {
    type: String,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    required: true,
    default: '/assets/images/profile.png'
  }
}

const userSchema = new mongoose.Schema(schema)

userSchema.statics.findOrCreate = function (conditions, data) {
  return this.findOne(conditions)
    .then(anonymous => anonymous || this.create(data))
}

module.exports = {
  userSchema
}
