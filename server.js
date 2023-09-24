// Importing the package
const express = require("express");
const fs = require("fs");

// Variables 
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/api/notes', (req, res) => {
  const note = {
    name: "note taker one o one",
    description: "text will go here"
  }
  res.json(note)
})





app.use(express.static('public'))




app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})