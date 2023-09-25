// Importing the packages
const express = require("express");
const fs = require("fs");
const notesData = require('./db/db.json');


// Variables 
const app = express();
const PORT = process.env.PORT || 3000;


// Static middleware pointing to the public folder
app.use(express.static('public'));


// Get notes.html - NEED TO DEBUG TO HTML FILE
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);


// Get notes through db.json *****THIS WORKS ON POSTMAN
app.get('/api/notes', (req, res) => { res.json(notesData) });


// Get index.html ** NEED TO DEBUG TO HTML FILE
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);


// Listen() method used to listen for incoming connections on the specified port
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
});