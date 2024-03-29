const express = require("express");
const router = express.Router();
const {
    fetchFavoriteVideos,
    addFavoriteVideo,
    removeFavoriteVideo
} = require("../controllers/favoriteController");

router.get("/all/:userID", fetchFavoriteVideos);

router.post("/add/video", addFavoriteVideo);

router.delete("/remove/video", removeFavoriteVideo);

module.exports = router;
