const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { validateSignup } = require("../utils/validation");

router.post("/signup", function(req, res) {
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

    User.findOne({ email })
        .then(function(userEmail) {
            if (userEmail) {
                return res.json({
                    success: false,
                    data: {
                        message: "email already exists"
                    }
                });
            }

            return User.findOne({ username });
        })
        .then(function(username) {
            if (username) {
                return res.json({
                    sucess: false,
                    data: {
                        message: "username already exists"
                    }
                });
            }

            var newUser = new User({
                username,
                email,
                password,
                signUpDate: new Date().getTime()
            });

            return newUser.save();
        })
        .then(function(data) {
            return res.json({
                success: true,
                data
            });
        })
        .catch(function(err) {
            return res.json({
                success: false,
                data: {
                    err
                }
            });
        });

    // 2) Check if both email and username are available

    // 3) Hash password

    // 4) Save info to DB

    // 5) Return token

    // return res.json({ test: "test", data: req.body });
});

router.post("/signin", function(req, res) {
    // 1) Validate email/username, and password

    // 2) Find email/username in DB
    // - validate password

    // 3) Return token

    return res.json({ test: "test", data: req.body });
});

router.post("/delete", function(req, res) {
    // 1) Validate email, username, and password

    // 2) Check if both email and username are available

    // 3) Hash password

    // 4) Delete account

    return res.json({ test: "test", data: req.body });
});

module.exports = router;
