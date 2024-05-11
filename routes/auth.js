const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const {checkIfUsernameExists, checkIfEmailExists} = require("../controllers/user.controller");

router.post('/login', authController.login)
router.post('/register', (req, res, next) => {
    req.body.next = true;
    next()
}, checkIfEmailExists, checkIfUsernameExists, authController.register)
router.post('/logout', authController.logout)

module.exports = router

