const express = require("express");
const router = express.Router();
const {
    fetchFavoriteVideos,
    addFavoriteVideo
} = require("../controllers/favoriteController");
const passport = require("passport");

router.get("/all/:userID", fetchFavoriteVideos);

router.post("/add/video", addFavoriteVideo);

router.delete("/remove/video", (req, res) => {});

module.exports = router;
