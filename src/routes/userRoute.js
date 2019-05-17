const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

// ENDPOINTS 
router.post('', userController.createUser)
router.get('', userController.listAllUsers)
router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router