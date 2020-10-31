const express = require('express')
const db = require('../config')

const {
	body,
	param,
	validationResult
} = require('express-validator');

// Run Queries here 
exports.test = [
  async function(req, res, next) {
	db.task(async t => {	
		const result = await t.one(`SELECT * FROM university;`, []);
		
		return result
	}).then (result => {
		res.status(200).json(result);
	}).catch(e => {res.status(500); res.send(e)})
	
  }
];

