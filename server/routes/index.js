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
router.get("/categories", Controller.getCategory)
router.get("/tasks", Controller.getTask)
router.post("/tasks", Controller.postTask)
router.put("/tasks/:id", authorization, Controller.putTask)
router.patch("/tasks/:id", authorization, Controller.patchTaskCategory)
router.delete("tasks/:id", authorization, Controller.deleteTask)

module.exports = router