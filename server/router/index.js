const router = require("express").Router()
const UserController = require("../controllers/user-controller")
const TaskController = require("../controllers/task-controller")
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")


router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post("/googleLogin", UserController.googleLogin)

router.use(authentication)
router.get("/task", TaskController.getAllTask)
router.post("/task", TaskController.postTaskById)
router.put("/task/:id", authorization, TaskController.putTaskById)
router.patch("/task/:id", authorization, TaskController.patchTaskById)
router.delete("/task/:id", authorization, TaskController.deleteTaskById)


module.exports = router