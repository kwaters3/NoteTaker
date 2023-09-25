// Importing the packages
const express = require("express");
const path = require('path');
const fs = require('fs');


// Variables 
const app = express();
const PORT = process.env.PORT || 3000;
const notesData = require('./db/db.json');


// Static middleware pointing to the public folder
// app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Get notes.html - NEED TO DEBUG TO HTML FILE
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);


// Gets/**READS** ALL notes from db.json *****THIS WORKS ON POSTMAN and can be viewed in console
app.get('/api/notes', (req, res) => { 
  console.log(`${req.method} request received to get notes`);
  return res.json(notesData) 
});

// Post/ **CREATE** Note with title and text input through Postman - This allows the user to input data into the body of POSTman
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  let response;

  if (req.body && req.body.title) {
    response = {
      status: 'success',
      data: req.body,
    };
    res.json(`Note Title: '${response.data.title}', has been added!`);
  } else {
    res.json('Request body must at least contain a title and text');
  }
})

// Route with input from consumer ****THIS gets/reads THE TITLE using PARAMS Title id from DB.JSon file - throws 404 error code if the title name is incorrect when tested on Postman
app.get('/api/notes/:title', (req, res) => {
  const filterResult = notesData.filter(x => x.title === req.params.title)
  filterResult.length === 0 ? res.statusCode = 404 : res.statusCode = 200
  res.json(filterResult)
});


// Get index.html ** NEED TO DEBUG TO HTML FILE
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);


// Listen() method used to listen for incoming connections on the specified port
app.listen(PORT, () => {
  console.log(`Server started listening on http://localhost:${PORT}`)
});