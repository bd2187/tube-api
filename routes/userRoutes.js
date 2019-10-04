const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/userController");

router.post("/signup", signUp);

router.post("/signin", signIn);

router.post("/delete", function(req, res) {
    // 1) Validate email, username, and password

    // 2) Check if both email and username are available

    // 3) Hash password

    // 4) Delete account

    return res.json({ test: "test", data: req.body });
});

module.exports = router;
