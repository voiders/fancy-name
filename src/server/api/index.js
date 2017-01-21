const router = require('express').Router()

router.use('/auth', require('./auth/auth.js'))
router.use('/users', require('./users/users.js'))

module.exports = router
