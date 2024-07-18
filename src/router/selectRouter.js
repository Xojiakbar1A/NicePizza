const express = require('express')

const router = express.Router()

const selectCtrl = require('../controller/selectCtrl')

const authMiddlware = require('../authMidleware/authMidleware')

router.post('/addorder/:id',authMiddlware,selectCtrl.addSelectFood)
router.get('/getorder/:id',selectCtrl.getSelect)

module.exports = router;