const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/books_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Sucessfully connected to db");
});