'use strict'
const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const categoryRoutes = express.Router()

categoryRoutes.get("/",CategoryController.index)
categoryRoutes.post("/",CategoryController.insert)
categoryRoutes.patch("/:id",CategoryController.update)
categoryRoutes.delete("/:id",CategoryController.delete)

module.exports = categoryRoutes