const express = require('express');
const signupRouter  = express.Router();
const { check, validationResult } = require('express-validator');

function router(){
    const signupValidation = [
        check('name')
            .isLength({min: 3})
            .withMessage('Name Length must be greater than 3'),
        check('email') 
            .isEmail()
            .withMessage('Invalid Email format'),
        check('password')
            .isLength({ min: 7 })
            .withMessage('Password Length must be greater than 7'),
        check('confirmpassword')
            .isLength({ min: 7 })
            .withMessage('Password Length must be greater than 7'),
    ];

    signupRouter.post('/',  signupValidation, function(req,res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('ERRORS :: ', errors);
            res.status(500).json({ errors: errors.array() })
        } else {
            res.status(200).json('success');
        }
    });

    return signupRouter;
}
module.exports = router;




