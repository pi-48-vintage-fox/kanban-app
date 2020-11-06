const router = require("express").Router()
const TaskController = require("../controllers/TaskController")
const Auth = require("../middlewares/Auth")

router.use(Auth.authentication)
router.get('/',TaskController.list)
router.post('/',Auth.authorAdd,TaskController.add)
router.put('/:id',Auth.authorUpdate,TaskController.edit)
router.patch('/:id',Auth.authorUpdate,TaskController.updateCategory)
router.delete('/:id',TaskController.delete)

module.exports=router