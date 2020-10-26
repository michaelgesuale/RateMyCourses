const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/API/api');

require('dotenv').config();
const config = require('./config')

const app = express();

app.use(express.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Main paths
app.use('/', indexRouter);
app.use('/api', apiRouter);

app.listen(config.port, function(error){ 
    if(error) throw error 
    console.log("Server created on port " + config.port) 
}) 
