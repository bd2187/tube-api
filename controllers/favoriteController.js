const User = require("../models/userModel");
const Favorite = require("../models/favoriteModel");

const fetchFavoriteVideos = function(req, res) {
    const { userID } = req.params;

    User.findById(userID)
        .then(function(user) {
            if (!user) {
                throw {
                    message: "user not found"
                };
            }

            const { favorites, username, email, _id: id } = user;
            return res.json({
                success: true,
                data: {
                    id,
                    username,
                    email,
                    favorites
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

module.exports = {
    fetchFavoriteVideos
};
