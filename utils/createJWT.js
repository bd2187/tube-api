const jwt = require("jsonwebtoken");

/**
 * Creates JWT for client
 *
 * @param String email
 * @param String username
 * @return String (JWT)
 */
module.exports = function(email, username) {
    const currentTime = new Date().getTime();
    const options = {
        email,
        username,
        iat: currentTime,
        exp: currentTime + 86400000 // 24 hour expiration date
    };

    return jwt.sign(options, "123secret", { algorithm: "HS256" });
};
