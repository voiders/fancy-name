
const router = require('express').Router()
// const controller = require('./users.ctrl.js')
const passport = require('passport')

router.get('/twitter', passport.authenticate('twitter'))

router.get('/twitter/callback',
  passport.authenticate('twitter', {failureRedirect: '/'}),
  function (req, res) {
    res.send('<html><head><script type="text/javascript">window.close();</script></head></html>')
  }
)

module.exports = router
