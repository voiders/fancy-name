const router = require('express').Router()

router.use('/users', require('./users/users.js'))

module.exports = router
