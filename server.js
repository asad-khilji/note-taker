// importing packages
const express = require('express');
const path = require("path");

// declare static path
let staticPath = path.join(__dirname, "public");

// initializng express.js
const app = express();

// middlewares
app.use(express.static(staticPath));
app.use(express.json());

// routes
// home route
app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})

// notes route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(staticPath, "notes.html"));
})

app.listen(3000, () => {
    console.log('listening on port 3000......');
})