const { Task, User, Category } = require('../models')

async function isTaskCreator (req, res, next) {

  /**
   *  Handles: update & delete task
   * 
   *  check if task exists
   *  if task not exists:
   *    send 404 task not found
   *  else: 
   *     check:
   *       - if task's userId (creator) is equal user's id
   *       - if task's OrganizationId is equal user's OrganizationId
   *       - if task's category's OrganizationId is equal user's OrganizationId
   *       if any of above points are false: 
   *          send 403 not authorized
   *       else:
   *         next()
   */

  console.log('authorization: is task creator')
  
  const { TaskId } = req.params

  try {

    const task = await Task.findByPk(TaskId, {
      include: Category
    })

    if (!task) {
      throw { msg: "Task not found", status: 404 }
    } else {

      const user = await User.findByPk(req.user.id)

      if (task.UserId != user.id) {
        throw { msg: "Not authorized", status: 403}
      }

      // handle kasus ubah task's category
      console.log('req body', req.body)
      if (req.body.CategoryId) {
        console.log('req body catid', req.body.CategoryId)

        const category = await Category.findByPk(req.body.CategoryId)

        if (!category) {
          throw { status: 404, msg: 'Category not found'}
        }

        console.log('cat org id:', category.OrganizationId, 'user org id:', user.OrganizationId)

        if (category.OrganizationId != user.OrganizationId) {
          throw { msg: "Not authorized to post in other organization", status: 403}
        }
      }
      next()
    }
  } catch(err) {
    console.log(err)
    next(err)
  }
}

async function isMember (req, res, next) {

  console.log('authorization: is member of organization')

  try {

    const user = await User.findByPk(req.user.id)
    
    if (!user) {
      throw { msg: "Not authorized", status: 403}
    }
    
    const { id } = req.user
    req.body.OrganizationId = user.OrganizationId
    
    switch(req.originalUrl.split('/')[1]) {

      case 'tasks':

      // kasus create task
      if (req.body.CategoryId) {

        try {
          const category = await Category.findByPk(req.body.CategoryId)

          if (!category) {
            throw({status: 400, msg: 'Must include category'})
          }

          if (category.OrganizationId != user.OrganizationId) {
            throw({status: 403, msg: 'Not authorized to post in other organization'})
          }

          next()
        } catch (error) {
          console.log(error)
          next(error)
        }
        
      } else {

        // kasus get task details
        const { TaskId } = req.params
        try {
          const task = await Task.findByPk(TaskId, {
            include: Category
          })
      
          if (!task) {
            throw { msg: "Task not found", status: 404 }
  
          } else {
  
            console.log(task.toJSON())
            if (task.OrganizationId != user.OrganizationId) {
              throw { msg: "Not authorized", status: 403}
            }
            next()
          } 
        } catch (err) {
            console.log(err)
            next(err)
          }
        }
      break


    case 'categories':
        console.log(req.originalUrl.split('/')[1])
      try {
        const { OrganizationId } = user
        const { CategoryId } = req.params

        console.log({OrganizationId}, '>>> user')

        if (CategoryId) {

          try {
            const category = await Category.findByPk(CategoryId)
        
            if (!category) {
              throw { msg: "Category not found", status: 404 }

            } else {

              if (category.OrganizationId != OrganizationId) {
                throw { msg: "Not authorized", status: 403}
              }
              next()
            } 
          } catch (err) {
              console.log(err)
              next(err)
            }

        } else {

          console.log({CategoryId})
          next()
        }
        
      } catch (err) {
        console.log(err)
        next(err)
        
      }
        break
    }
  } catch(err) {
    console.log(err)
    next(err)
  }

}

module.exports = {
  isTaskCreator,
  isMember
}
