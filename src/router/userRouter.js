const express = require('express')

const router = express.Router()

const usersCtrl = require('../controller/userCtrl')

const authMiddlware = require('../authMidleware/authMidleware')

router.post('/signup',usersCtrl.SignUp)
router.post('/login',usersCtrl.Login)
router.get('/',usersCtrl.getAllUsers)
router.get('/:id',usersCtrl.getUser)
router.put('/:id',authMiddlware,usersCtrl.updateUser)
router.delete('/:id',authMiddlware,usersCtrl.deleteUser)

module.exports = router;