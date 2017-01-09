const router = require('express').Router()
const controller = require('./users.ctrl.js')

router.get('/', controller.getAll)
router.get('/:id', controller.getOne)

router.post('/', controller.post)

router.put('/:id', controller.put)

module.exports = router
