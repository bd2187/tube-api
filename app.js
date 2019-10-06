const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// DB connection
mongoose.connect(process.env.DEV_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("connected to db");
});

require("./config/passport");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/user", require("./routes/userRoutes"));
app.use("/favorites", require("./routes/favoriteRoutes"));

app.listen(PORT, function() {
    console.log(`Server running on ${PORT}`);
});
