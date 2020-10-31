const express = require('express')
const pgp = require('pg-promise')({})
const config = require('../../config')

const db = pgp(config.db)

const {
  body,
	param,
	validationResult
} = require('express-validator');

// DB Queries
const getCourse = `SELECT * FROM courses WHERE course_id = $1`
const getReviews = `SELECT * FROM reviews WHERE course_id = $1`
const getPrereq = `SELECT * FROM prereq, courses WHERE prereq.course_id = $1 AND courses.course_id = prereq.require;`

const insertReview = `INSERT INTO reviews(course_id, user_id, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING review_id;`

// Run Queries here 
exports.getCourseInfo = [
	param('course_id')
	.exists()
	.withMessage('Missing Course Id Parameter')
	.bail()
	.isInt()
	.withMessage('Invalid Course Id Parameter')
	.bail()
	.escape(),
	async function(req, res, next) {
		// First see if we have any errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// If there are errors. We want to render form again with sanitized values/errors messages.
			res.status(400).json({ errors: errors.array() });
			return;
		}
		
		db.task(async t => {	
		const courseResult = await t.one(getCourse, [req.params.course_id]);
		const reviewResults = await t.any(getReviews, [req.params.course_id]);
		const prereqResults = await t.any(getPrereq, [req.params.course_id]);

		
		result = {
			  course: courseResult,
			  reviews: reviewResults,
			  prereq: prereqResults
			 }

		return result
	}).then (result => {
		res.status(200).json(result);
	}).catch(e => {res.status(500); res.send(e)})
  }
];