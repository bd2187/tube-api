const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    videoID: { type: String, required: true }
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
