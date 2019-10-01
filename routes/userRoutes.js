const express = require("express");
const router = express.Router();
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

    // 2) Check if both email and username are available

    // 3) Hash password

    // 4) Save info to DB

    // 5) Return token

    return res.json({ test: "test", data: req.body });
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
