const Joi = require("@hapi/joi");

const validateSignup = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(7)
        .max(30)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{7,30}$/)
        .required()
});

const validateSignin = Joi.object({
    email: Joi.string()
        .email()
        .required()
});

const validateFavoriteVideo = Joi.object({
    thumbnail: Joi.string().required(),
    title: Joi.string().required(),
    videoID: Joi.string().required(),
    dateAdded: Joi.date()
        .timestamp()
        .required()
});

module.exports.validateSignup = validateSignup;
module.exports.validateSignin = validateSignin;
module.exports.validateFavoriteVideo = validateFavoriteVideo;
