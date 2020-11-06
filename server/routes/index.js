const router = require("express").Router();
const todoRouter = require("./task");
const userRouter = require("./user");
const categoryRouter = require('./category')

router.get("/", (req, res) => {
  res.send("kanban App");
});

router.use("/category", categoryRouter)
router.use("/task", todoRouter);
router.use("/user", userRouter);

module.exports = router;
