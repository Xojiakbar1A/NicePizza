const express = require('express')

const router = express.Router()

const orderCtrl = require('../controller/orderCtrl')

const authMiddlware = require('../authMidleware/authMidleware')

router.post('/addorder/:id',authMiddlware,orderCtrl.addOrder)
router.put('/updateStatus/:id',authMiddlware,orderCtrl.updateStatus)
router.put('/canselStatus/:id',authMiddlware,orderCtrl.canselStatus)
router.get('/getorder/:id',orderCtrl.getOrder)

module.exports = router;