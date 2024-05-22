const express = require('express')
const router = express.Router()
const rolesController = require('../controllers/roles.controller')

router.get("/", rolesController.getRoles)
router.post("/",rolesController.checkIfRoleExists, rolesController.createRole)
router.delete("/:id", rolesController.checkRoleIfDeleted, rolesController.deleteRole)
module.exports = router