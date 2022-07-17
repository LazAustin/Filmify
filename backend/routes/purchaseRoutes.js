const express = require('express');
const router = express.Router();
const {getPurchases, setPurchases, updatePurchase, deletePurchases} = require('../controllers/purchaseController');
const {protect} = require('../middleware/authMiddleware');


//get, post, put, and delete functions brought in from controller folder for these endpoints
// the '/' is actually api/purchases and brought in at server.js
router.route('/')
.get(protect, getPurchases)
.post(protect, setPurchases)

router.route('/:id')
.put(protect, updatePurchase)
.delete(protect, deletePurchases)

module.exports = router