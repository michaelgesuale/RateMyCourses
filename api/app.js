const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');

const apiRouter = require('./routes/api');

require('dotenv').config();
const config = require('./config')

const cors = require('cors')
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Allow all origins to access API, might want to change in future
app.use(cors())

// Main paths
app.use('/api', apiRouter);

module.exports = app;
