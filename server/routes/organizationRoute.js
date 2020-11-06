'use strict'
const express = require('express');
const OrganizationController = require('../controllers/OrganizationController');
const organizationRoute = express.Router()

organizationRoute.get("/",OrganizationController.index)
organizationRoute.post("/",OrganizationController.insert)
organizationRoute.patch("/:id",OrganizationController.update)
organizationRoute.delete("/:id",OrganizationController.destroy)

module.exports = organizationRoute