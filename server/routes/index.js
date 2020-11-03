const router = require('express').Router()

router.post('/register')
router.post('/login')
router.get('/users')
router.get('/users/:UserId')
router.get('/orgs/:OrgId/users')

router.get('/orgs/:OrgId/tasks')
router.get('/orgs/:OrgId/tasks/:TaskId')
router.put('/orgs/:OrgId/tasks/:TaskId')
router.patch('/orgs/:OrgId/tasks/:TaskId')
router.delete('/orgs/:OrgId/tasks/:TaskId')

router.get('/orgs/:OrgId/categories')
router.post('/orgs/:OrgId/categories')
router.patch('/orgs/:OrgId/categories/:CategoryId')
router.delete('/orgs/:OrgId/categories/:CategoryId')

module.exports = router