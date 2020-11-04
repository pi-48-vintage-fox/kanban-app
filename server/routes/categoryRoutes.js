const router = require('express').Router()
const CategoryController = require('../controllers/CategoryController')
const { isMember } = require('../middlewares/authorization')

router.get('/', CategoryController.categories)
router.post('/', CategoryController.addCategory)
router.patch('/:CategoryId', isMember, CategoryController.patchCategory)
router.delete('/:CategoryId', isMember, CategoryController.deleteCategory)


module.exports = router
