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


// Gets/**READS** ALL notes from db.json *****THIS WORKS ON POSTMAN
app.get('/api/notes', (req, res) => { res.json(notesData) });


// Route with input from consumer ****THIS gets/reads THE TITLE using PARAMS Title id from DB.JSon file - through 404 error code if the title name is incorrect when tested on Postman
app.get('/api/notes/:title', (req, res) => {
  const filterResult = notesData.filter(x => x.title === req.params.title)
  filterResult.length === 0 ? res.statusCode = 404 : res.statusCode = 200
  res.json(filterResult)
});


// Get index.html ** NEED TO DEBUG TO HTML FILE
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);


// Listen() method used to listen for incoming connections on the specified port
app.listen(PORT, () => {
  console.log(`Server started listening on http://localhost:${PORT}`)
});