const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')

const controller = new userController()

router.post('/login', controller.login)
router.post('/signin', controller.signin)

module.exports = router;