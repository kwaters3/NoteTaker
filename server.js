// Dependencies
const express = require("express");
const fs = require('fs');
const generateUniqueId = require('generate-unique-id');
const notesData = require('./db/db.json');


// Express Data Parsing - Initialize app Variables
const app = express();

const PORT = process.env.PORT || 3000;

// Static middleware pointing to the public folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



// ROUTES
// Get **READS** notes.html
app.get('/notes', (req, res) => {
  console.log(`${req.method} request received to view all notes via WEB`);
  res.sendFile(`${__dirname}/public/notes.html`);
});



// Gets/**READS** ALL notes from db.json *****THIS WORKS ON POSTMAN and can be viewed in console 
app.get('/api/notes', (req, res) => {
  res.json(notesData)
});



// EXTRA 
//Gets/ **Reads** by id: Title using API 
app.get('/api/notes/:title', (req, res) => {
  console.log(`${req.method} request received to view note titled: ${req.params.title}`);
  let result;
  result = notesData.find(x => x.title.toLowerCase() === req.params.title.toLowerCase())
  result
    ? res.json(result)
    : res.status(404).json({ message: `Note titled, ${req.params.title}, is not available` })
});



// Post/ **CREATE** Note 
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body;

  if (title && text) {

    const newNote = {
      title,
      text,
      id: generateUniqueId(),
    };
    notesData.push(newNote);
    fs.writeFile('db/db.json', JSON.stringify(notesData, null, 4), (err) =>
      err
        ? console.error(err)
        : console.log(`Your Note: "${newNote.title}" was added to the list!`));

    response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(200).json(response);
  } else {
    res.status(404).json('Error!')
  }
});




// BONUS
// Delete - **DELETE** 
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  const delNote = notesData.findIndex(note => note.id == id);

  notesData.splice(delNote, 1);
  fs.writeFile('db/db.json', JSON.stringify(notesData, null, 4), (err) =>
    err
      ? console.error(err)
      : console.log(`Your note was deleted from the list!`));
  return res.send();
});



// Get index.html - Wildcard - Catch All
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
})


// Listen() method used to listen for incoming connections on the specified port
app.listen(PORT, () => {
  console.log(`Server started listening on http://localhost:${PORT}`)
});



/////////////////////////////////////////////////////////////////////////////////////////////////
// DEBUGGING FOR LATER USE:
// app.get('/api/notes/:title', (req, res) => {
//   console.log(`${req.method} request received to get note!`);
//   let response;
//   const filterResult = notesData.filter(x => x.title === req.params.title)

// // Route from Body input ...still TESTING/DEbugging - res.json note response works in postman
//   if (req.body && req.body.title) {
//     response = {
//       status: 'success',
//       data: req.body,
//     };
//     res.json(`Note Title: '${response.data.title}', is available`);

// // Route with input from consumer ****THIS gets/reads THE TITLE using PARAMS Title id from DB.JSon file - throws 404 error code if the title name is incorrect when tested on Postman
//   } else if (filterResult.length === 0 ? res.statusCode = 404 : res.statusCode = 200) {
//     res.json(filterResult)

//   } else {
//     res.json('Request body must at least contain a title and text');
//   }
// });
