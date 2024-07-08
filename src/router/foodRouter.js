const express = require('express')

const router = express.Router()

const foodCtrl = require('../controller/foodCtrl')

const authMiddlware = require('../authMidleware/authMidleware')

router.post('/addFood',authMiddlware,foodCtrl.addFood)
router.get('/:id',foodCtrl.getFood)
router.get('/',foodCtrl.getAllFood)
router.delete('/:id',authMiddlware,foodCtrl.deleteFood)
router.put('/:id',authMiddlware,foodCtrl.updateFood)

module.exports = router;