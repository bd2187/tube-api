const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    signUpDate: { type: Date, required: true },
    favorites: { type: Array },
    likes: { type: Array },
    dislikes: { type: Array }
});

userSchema.pre("save", function(next) {
    this.favorites = [];
    this.likes = [];
    this.dislikes = [];
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
