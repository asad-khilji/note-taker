// importing packages
const express = require('express');
const path = require("path");
const fs = require("fs");
const notes = require("./db/db.json");

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

//Setting routes for APIs
//This gets notes saved and joins it in db.json
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

// Post function to add new notes to db.json
app.post("/api/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});

//used for deleting notes
app.delete("/api/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
    res.json(delNote);
})

app.listen(3000, () => {
    console.log('listening on port 3000......');
})