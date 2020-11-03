const Controller = require('../controllers')
const {
    authentication,
    authorization
} = require('../middlewares/auth')
const router = require("express").Router()


router.post("/login", Controller.postLogin)
router.post("/register", Controller.postRegister)
router.post("/googleLogin", Controller.postGoogleLogin)
router.use(authentication)
router.post("/category", Controller.postCategory)
router.post("/tasks", Controller.postTask)
router.get("/tasks", Controller.getTask)
router.put("/tasks/:id", authorization, Controller.putTask)
router.delete("tasks/:id", authorization, Controller.deleteTask)

module.exports = router