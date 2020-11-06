const router = require("express").Router()
const CategoryController = require("../controllers/CategoryController")
const Auth = require("../middlewares/Auth")

router.use(Auth.authentication)
router.get('/',CategoryController.list)
router.post('/',CategoryController.add)

module.exports=router