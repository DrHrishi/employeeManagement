const { validationResult, body } = require('express-validator');
exports.signupValidator = [
    [
        body('firstname').exists(),
        body('lastname').exists(),
        body('email').exists()
            .matches(/.+\@.+\..+/)
            .withMessage('email must contain @')
            .isLength({ min: 4, max: 200 }),
        body('password').exists()
            .isLength({ min: 4, max: 200 })
            .withMessage('Password must contain at least 6 char max 200 char')
            .matches(/\d/)
            .withMessage('Password must contain number')
    ], (req, res, next) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            const firsrError = errors.array().map((error) => error)[0]
            return res.status(400).json({
                err: firsrError,
                message: firsrError
            })
        }
        next()
    }
]


exports.employeeValidator = [
    [
        body('firstname').exists()
            .withMessage("Firstname is compulsory"),
        body('lastname').exists()
            .withMessage("Lasttname is compulsory"),
        body('email').exists()
            .matches(/.+\@.+\..+/)
            .withMessage('email must contain @')
            .isLength({ min: 4, max: 200 })
            .withMessage('email length should be in between 4 to 200 charactors'),
        body('mobile').exists()
            .isNumeric()
            .withMessage('Please enter valid number')
            .isLength({ min: 10, max: 10 })
            .withMessage('Mobile number must be 10 digits only'),
        body('createdBy').exists()
            .isLength({ min: 1 })
            .withMessage('Created By must not be null')
    ], (req, res, next) => {
        var errors = validationResult(req);
        console.log(errors);
        
        if (!errors.isEmpty()) {
            const firsrError = errors.array().map((error) => error)[0]
            return res.status(400).json({ message: firsrError.msg, error: firsrError })
        }
        next()
    }
]