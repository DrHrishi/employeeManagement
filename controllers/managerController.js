const Manager = require('../models/Manager');

// creating managerById middleware-function to attach manager details to the request
exports.managerById = (req, res, next, id) => {
    Manager.findById(id)
        .exec((err, manager) => {
            if (err || !manager) {
                res.status(400).json({
                    message: 'manager not found',
                    error: err
                });
            }
            req.profile = manager;
            next()
        })
}

exports.getManager = (req, res) => {
    req.profile.salt = undefined;
    req.profile.hashed_password = undefined;
    return res.json(req.profile)
}
