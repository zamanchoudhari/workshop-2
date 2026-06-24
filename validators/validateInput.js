const { validationResult } = require('express-validator');

const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ Status: "Error", Message: errors.array() });
    } 
    next();
}

module.exports = validateInput;