const Joi = require("@hapi/joi");

const validateSignup = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(7)
        .max(30),

    email: Joi.string().email(),

    password: Joi.string().pattern(/^[a-zA-Z0-9]{7,30}$/)
});

module.exports.validateSignup = validateSignup;
