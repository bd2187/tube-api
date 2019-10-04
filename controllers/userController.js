const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { validateSignup, validateSignin } = require("../utils/validation");
const createJWT = require("../utils/createJWT");

/**
 * Validates email, usernam and password prior to saving
 * the user the DB. If validation passes, JWT is returned
 * to the user
 */
const signUp = function signUp(req, res) {
    // 1) Validate email, username, and password
    const { username, email, password } = req.body;
    const validationRes = validateSignup.validate({
        username,
        email,
        password
    });

    if (
        validationRes.error &&
        validationRes.error.details &&
        validationRes.error.details.length > 0
    ) {
        var errorMessages = validationRes.error.details.map(function(errorObj) {
            return errorObj.message;
        });

        return res.json({
            username,
            email,
            success: false,
            data: {
                errorMessages
            }
        });
    }

    // 2) Check if both email and username are available
    User.findOne({ email })
        .then(function(userEmail) {
            if (userEmail) {
                throw {
                    message: "email already exists"
                };
            }

            return User.findOne({ username });
        })
        .then(function(username) {
            if (username) {
                throw {
                    message: "username already exists"
                };
            }

            return bcrypt.genSalt(10);
        })
        .then(function(salt) {
            // 3) Hash password

            if (!salt) {
                throw {
                    message: "failed to generate salt"
                };
            }

            return bcrypt.hash(password, salt);
        })
        .then(function(hash) {
            if (!hash) {
                throw {
                    message: "failed to hash password"
                };
            }

            var newUser = new User({
                username,
                email,
                password: hash,
                signUpDate: new Date().getTime()
            });

            // 4) Save info to DB
            return newUser.save();
        })
        .then(function(data) {
            // 5) Return token
            const token = createJWT(email, username, data._id);
            return res.json({
                success: true,
                data: {
                    token
                }
            });
        })
        .catch(function(err) {
            return res.json({
                success: false,
                data: err
            });
        });
};

const signIn = function(req, res) {
    // 1) Validate email and password
    const { email, password } = req.body;
    const validationRes = validateSignin.validate({
        email
    });

    if (
        validationRes.error &&
        validationRes.error.details &&
        validationRes.error.details.length > 0
    ) {
        var errorMessages = validationRes.error.details.map(function(errorObj) {
            return errorObj.message;
        });

        return res.json({
            email,
            success: false,
            data: {
                errorMessages
            }
        });
    }

    var username = "";
    var id = "";
    User.findOne({ email })
        .then(function(user) {
            if (!user) {
                throw {
                    message: "email not found"
                };
            }

            username = user.username;
            id = user._id;
            return bcrypt.compare(password, user.password);
        })
        .then(function(isPasswordValid) {
            if (!isPasswordValid) {
                throw {
                    message: "password invalid"
                };
            }

            const token = createJWT(email, username, id);

            return res.json({
                success: true,
                data: { token }
            });
        })
        .catch(function(err) {
            return res.json({
                success: false,
                data: err
            });
        });
};

module.exports = {
    signUp,
    signIn
};
