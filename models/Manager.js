const mongoose = require('mongoose');
const { v1: uuidv1 } = require('uuid');

const crypto = require('crypto');
const { ObjectId } = mongoose.Schema

const managerSchema = new mongoose.Schema({
    firstname: {
        type: String, trim: true, required: true
    },
    lastname: {
        type: String, trim: true, required: true
    },
    address: {
        type: String, trim: true
    },
    dob: {
        type: Date
    },
    company: {
        type: String, trim: true
    },
    email: {
        type: String, trim: true, required: true
    },
    hashed_password: {
        type: String, required: true
    },
    salt: String,
    created: {
        type: Date, default: Date.now()
    },
    updated: Date,
})

// virtualField
managerSchema.virtual('password')
    .set(function (password) {
        this._password = password
        //generate timestamp with npm's uuid pack
        this.salt = uuidv1()
        // encrypt password
        this.hashed_password = this.encryptPassword(password)

    })
    .get(function () { return this._password })

// Adding methods
managerSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
        } catch (error) {
            return '';
        }
    }
}

module.exports = mongoose.model("Manager", managerSchema);