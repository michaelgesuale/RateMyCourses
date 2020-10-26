const express = require('express')

const {
  body,
	param,
	validationResult
} = require('express-validator');

// Connect to DB here 


exports.test = [
  async function(req, res, next) {
	res.status(200).send('API GOOD');
  }
];

