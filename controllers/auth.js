const Manager = require('../models/Manager');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt')
require('dotenv').config()

exports.signup = async (req, res) => {
    const managerExist = await Manager.findOne({ email: req.body.email })
    if (managerExist) return res.status(403).json({ message: "Email already taken", error: "error" });
    const manager = await new Manager(req.body);
    await manager.save();
    res.status(200).json({ message: 'Signup success! please login.' })
}

exports.signin = (req, res) => {
    const { email, password } = req.body;
    Manager.findOne({ email }, (err, manager) => {
        if (err || !manager)
            return res.status(401).json({ error: 'Manager with email does not exist , please sign in' })

        if (!manager.authenticate(password))
            return res.status(401).json({ error: 'Email and password do not match' })

        // JWT_SECRET is in .envFile i have excluded this file from .gitignore
        const token = jwt.sign({ _id: manager._id }, process.env.JWT_SECRET);
        res.cookie('t', token, { expire: new Date() + 9999 });
        const { _id, email ,firstname,lastname} = manager;
        return res.json({ token, manager: { _id, email, firstname, lastname } })
    })
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    uanagerProperty: 'auth'
})