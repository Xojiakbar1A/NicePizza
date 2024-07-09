const express = require('express')

const router = express.Router()

const kategoryCtrl = require('../controller/kategoryCtrl')

const authMiddlware = require('../authMidleware/authMidleware')

router.post('/addKatrgoty',authMiddlware,kategoryCtrl.addKategory)
router.get('/:id',kategoryCtrl.getKategory)
router.get('/',kategoryCtrl.getAllKategory)
router.delete('/:id',authMiddlware,kategoryCtrl.deleteKategory)
router.put('/:id',authMiddlware,kategoryCtrl.updateKategory)

module.exports = router;