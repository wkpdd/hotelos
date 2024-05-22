const express = require('express')
const router = express.Router()

router.use('/auth', require('./routes/auth'))
router.use('/roles', require('./routes/roles'))

module.exports = router