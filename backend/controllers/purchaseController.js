const asyncHandler = require('express-async-handler')
const Purchase = require('../models/purchaseModel') //Purchase is nickname for JSON Array/Schema in purchaseModel.js
const User = require('../models/userModel')

const getPurchase = asyncHandler(async (req, res) => {
    const purchase = await Purchase.findById(req.params.id)
    res.status(200).json(purchase)

        //Check for user
        if (!req.user) {
            res.status(401)
            throw new Error('User not found')
        }
    
        //Make sure the user matches the purchases
        if (purchase.user.toString() !==req.user.id) {
            res.status(401)
            throw new Error('User not authorized')
        }
}
)

//Get purchases
//GET /api/purchases
//Private
//requests and responds/displays all purchases in db
const getPurchases = asyncHandler(async (req, res) => {
    const purchases = await Purchase.find({user: req.user.id})

    res.status(200).json(purchases)

    if (!purchases) {
        return next(new Error('No purchases found'))
    }
})

//Set purchases
//GET /api/purchases
//Private
//Sends request to add completely new purchase and sends a json response with that added purchase 
const setPurchases = asyncHandler(async (req, res) => {
    
    const {title, year, producer, director, length, platform, requesterName, requesterEmail, requesterDepartment, price, notes} = req.body
            
    if (!title || !year || !producer || !director || !length || !requesterName || !requesterEmail || !price || !notes){
        res.status(400)
        throw new Error('Please fill in all the fields')
    }

    const purchase = await Purchase.create(Object.assign({user:req.user.id}, req.body));
        //Is there another wait to write Object.assign({user: req.user.id})? Save for later. It works fine for now
        //another method for performing this operation: const savedPurchase = await newPurchase.save();
        //fields in the Purchase Model/JSON Array/Schema in models/purchaseModels.js
        //instantiates new Purchase
        // below is how originally I had to pass objects to .create() before I used Object.assign({}) for the user
     
        /* user: req.user.id
        title: req.body.title,
        year: req.body.year,
        producer: req.body.producer,
        director: req.body.director,
        licenseStart: req.body.licenseStart,
        licenseEnd: req.body.licenseEnd,
        platform: req.body.platform,
        requestorName: req.body.requestorName,
        requestorEmail: req.body.requestorEmail,
        requestorDepartment: req.body.requestorDepartment,
        price: req.body.price,
        notes: req.body.notes */
    
    res.status(200).json(purchase) 
})

//Update purchases
//PUT /api/purchases/:id
//Private
//requests purchase of specific id, if there is one, updates specific property, and sends a json response with the modified property
const updatePurchase = asyncHandler(async (req, res) => {
    const purchase = await Purchase.findById(req.params.id)

    if (!purchase){
    res.status(400)
    throw new Error('Purchase not found')
    }

    //const user = await User.findById(req.user.id)

    //Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the user matches the purchases
    if (purchase.user.toString() !==req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedPurchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    
    res.status(200).json(updatedPurchase)
})

//Delete purchases
//DELETE /api/purchases/:id
//Private
//sends request for purchase of specific id, if there is one, deletes it, and responds with a json array including just the id (for later UI purposes)
const deletePurchases = asyncHandler(async (req, res) => {
    const purchase = await Purchase.findById(req.params.id)

    if (!purchase) {
        res.status(400)
        throw new Error('Purchase not found')
    }

    //const user = await User.findById(req.user.id)

    //Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the user matches the purchases
    if (purchase.user.toString() !==req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await purchase.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getPurchase,
    getPurchases,
    setPurchases,
    updatePurchase,
    deletePurchases
}