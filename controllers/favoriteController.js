const User = require("../models/userModel");
const { validateFavoriteVideo } = require("../utils/validation");

/**
 *  Returns  user's favorites
 */
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

/**
 * Adds a favorite video to the user's favorites array.
 * 1) Validate incoming favoriteVideo to ensure that it matches the schema
 * 2) Find the user in the DB and check if the incoming favoriteVideo
 * already exists in their favorites array
 * 3) If the favoriteVideo doesn't exists in the user's favorites, add
 * the video their favorites
 */
const addFavoriteVideo = function(req, res) {
    var { userID, favoriteVideo } = req.body;

    favoriteVideo = { ...favoriteVideo, dateAdded: new Date().getTime() };

    const isFavoriteValid = validateFavoriteVideo.validate(favoriteVideo);

    if (
        isFavoriteValid.error &&
        isFavoriteValid.error.details &&
        isFavoriteValid.error.details.length > 0
    ) {
        var errorMessages = isFavoriteValid.error.details.map(function(
            errorObj
        ) {
            return errorObj.message;
        });

        return res.json({
            favoriteVideo,
            success: false,
            data: {
                errorMessages
            }
        });
    }

    User.findById(userID)
        .then(function(user) {
            if (!user) {
                throw {
                    message: "user not found"
                };
            }

            // check if favorite video already exists in user's favorites
            const existingFavorites = user.favorites;

            for (let i = 0; i < existingFavorites.length; i++) {
                let { videoID } = existingFavorites[i];

                if (videoID === favoriteVideo.videoID) {
                    throw {
                        message: "video is already favorited by user"
                    };
                }
            }

            const updatedFavorites = [...user.favorites, favoriteVideo];

            return User.findOneAndUpdate(
                { _id: userID },
                { favorites: updatedFavorites },
                { new: true }
            );
        })
        .then(function(data) {
            return res.json({
                success: true,
                data: {
                    message: "successfully saved favorite",
                    data: data.favorites
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
    fetchFavoriteVideos,
    addFavoriteVideo
};
