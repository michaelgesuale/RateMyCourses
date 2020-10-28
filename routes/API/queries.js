const express = require('express')
const pgp = require('pg-promise')({})
const config = require('../../config')

const db = pgp(config.db)

const {
  body,
	param,
	validationResult
} = require('express-validator');

// Run Queries here 
exports.test = [
  async function(req, res, next) {
	db.task(async t => {	
		const result = await t.any(`SELECT * FROM university;`, []);
		
		return result
	}).then (result => {
		res.status(200).json(result);
	}).catch(e => {res.status(500); res.send(e)})
	
  }
];

