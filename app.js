const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

// DB connection

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes

app.listen(PORT, function() {
    console.log(`Server running on ${PORT}`);
});
