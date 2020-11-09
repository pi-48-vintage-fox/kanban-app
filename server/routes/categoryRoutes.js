const router = require('express').Router()
const CategoryController = require('../controllers/CategoryController')
const { isMember } = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')

router.get('/', authentication, CategoryController.categories)
router.post('/', authentication, CategoryController.addCategory)
router.patch(
  '/:CategoryId',
  authentication,
  isMember,
  CategoryController.patchCategory
)
router.delete(
  '/:CategoryId',
  authentication,
  isMember,
  CategoryController.deleteCategory
)

module.exports = router
