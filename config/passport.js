const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/userModel");

passport.use(
    "login",
    new LocalStrategy(
        { usernameField: "email", passwordField: "password", session: false },
        function(email, password, done) {
            User.findOne({ email }, function(err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, {
                        message: "email not found"
                    });
                } else {
                    bcrypt
                        .compare(password, user.password)
                        .then(function(isPasswordValid) {
                            if (!isPasswordValid) {
                                return done(null, false, {
                                    message: "incorrect password"
                                });
                            }

                            return done(null, user);
                        });
                }
            }).catch(function(err) {
                return done(err);
            });
        }
    )
);

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "123secret";

passport.use(
    "jwt",
    new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({ _id: jwt_payload.userID }, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    })
);

module.exports = passport;
