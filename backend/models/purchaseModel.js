const mongoose = require('mongoose');
const opts = { toJSON: { virtuals: true } };

const purchaseSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }, 
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    year: {
        type: Number,
        unique: false,
        required: [true, 'Please add a year of release'],
        min: 1900,
        max: new Date().getFullYear(),
    },
    producer: {
        type: String,
        unique: false,
        required: [true, 'Please add a production company'],
    },
    director: {
        type: String,
        unique: false,
        required: false,
    },
    length: {
        type: String,
        unique: false,
        required: false
    },
    //Using length instead for testing purposes until i code the if statements for license start and end with the radio buttons and custom range
    // licenseStart: {
    //     type: Date,
    //     unique: false,
    //     required: [true, 'Please enter the date the license starts'],
    // },
    // licenseEnd: {
    //     type: Date,
    //     unique: false,
    //     required: [true, 'Please enter the date the license ends'],
    // },
    platform: {
        type: String,
        unique: false,
        required: false,
    },
    requesterName: {
        type: String,
        unique: false,
        required: [true, 'Please enter the faculty or staff member who requested this purchase'],
    },
    requesterEmail: {
        type: String,
        unique: false,
        required: [true, 'Please enter the requester email'],
    },
    requesterDepartment: {
        type: String,
        unique: false,
        required: false,
        //re add [true, 'Please enter the requester department']
    },
    price: {
        type: String,
        unique: false,
        required: [true, 'Please enter the price'],
        min: 0
    },
    notes: {
        type: String,
        unique: false,
        required: false,
    },
},
     { timestamps: true },
     opts)

module.exports = mongoose.model('Purchase', purchaseSchema)