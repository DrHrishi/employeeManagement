const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
require('./Manager')
const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String, trim: true, required: true
    },
    lastname: {
        type: String, trim: true, required: true
    },
    address: {
        type: String, trim: true,
    },
    email: {
        type: String, trim: true, required: true
    },
    mobile: {
        type: Number, trim: true, 
    },
    dob: {
        type: Date,
    },
    createdBy: {
        type: ObjectId, ref: 'Manager', required: true
    },
    created: {
        type: Date, default: Date.now()
    },
    updated: Date,
})


module.exports = mongoose.model("Employee", employeeSchema);