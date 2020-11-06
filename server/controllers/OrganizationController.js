'use strict'
const { Organization } = require("../models")
class OrganizationController {

  static async index(req, res, next) {
    try {
      let organizations = await Organization.findAll()
      res.status(200).json({
        msg: "Success",
        organizations
      })
    } catch (err) {
      next(err)
    }
  }

  static async insert(req, res, next) {
    try {
      let data = {
        name: req.body.name
      }

      let organization = await Organization.create(data)
      
      res.status(200).json({
        msg: "Organization Added",
        organization
      })
    } catch (err) {
      next(err)
    }
  }

  static async update(req, res, next) {
    try {
      let id = req.params.id
      let data = {
        name: req.body.name
      }

      let organization = await Organization.findByPk(id)
      organization.name = data.name
      organization.save()
      res.status(200).json({
        msg : "Organization updated",
        organization
      })
    } catch (err) {
      next(err)
    }
  }

  static async destroy(req,res,next){
    try {
      let id = req.params.id
      let organization = await Organization.findByPk(id)
      res.status(200).json({
        msg : "Organization Deleted",
        organization
      })
      organization.destroy()
    } catch (err) {
      next(err)
    }
  }

}

module.exports = OrganizationController