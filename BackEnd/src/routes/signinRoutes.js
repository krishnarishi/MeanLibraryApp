const express = require('express');
const signinRouter  = express.Router();
const { check, validationResult } = require('express-validator');

function router(indexNav) {
    const loginValidation = [
        check('email')
            .isEmail()
            .withMessage('Invalid Email format'),
        check('password')
            .isLength({ min: 7 })
            .withMessage('Password Length must be greater than 10')
    ]
    signinRouter.post('/',  loginValidation, function(req,res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(500).json({ errors: errors.array() })
            // return res.status(500).json({ errors: errors.array() })
        } else {
            res.status(200).json('success')
        }
    });
    return signinRouter;
};
module.exports = router;
