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
        trim: true,
    },
    year: {
        type: Number,
        unique: false,
        required: [true, 'Please add a year of release'],
        min: [1900, `Film's date must be later than 1900`],
        max: new Date().getFullYear(),
    },
    producer: {
        type: String,
        unique: false,
        required: [true, 'Please add a production company'],
        trim: true,
    },
    director: {
        type: String,
        unique: false,
        required: [true, "Please add a director"],
        trim: true,
    },
    length: {
        type: String,
        unique: false,
        required: [true, "License must have a length"],
        trim: true,
    },
    startDate: {
        type: Date,
        unique: false,
        required: [true, 'Please enter a start date'],
    },
    endDate: {
        type: Date,
        unique: false,
        required: false,
    },
    platform: {
        type: String,
        unique: false,
        required: [true, "Please enter the platform"],
    },
    requesterName: {
        type: String,
        unique: false,
        required: [true, 'Please enter the faculty or staff member who requested this purchase'],
    },
    requesterEmail: {
        type: String,
        unique: false,
        required: [true, `Please enter the requestor's email`],
    },
    requesterDepartment: {
        type: String,
        unique: false,
        required: [true, `Please enter the requestor's department`],
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