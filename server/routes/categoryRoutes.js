const router = require('express').Router()
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/')
router.post('/')
router.patch('/:CategoryId')
router.delete('/:CategoryId')


module.exports = router
