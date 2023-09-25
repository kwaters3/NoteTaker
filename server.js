// Importing the packages
const express = require("express");
const fs = require("fs");


// Variables 
const app = express();
const PORT = process.env.PORT || 3000;


// Static middleware pointing to the public folder
app.use(express.static('public'));


// Get notes.html
app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Get index.html
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/index.html'))
);


// app.get('/api/notes', (req, res) => {
//   const note = {
//     noteTitle: "note taker one o one",
//     noteText: "text will go here"
//   }
//   res.json(note)
// });


// Listen() method used to listen for incoming connections on the specified port
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})