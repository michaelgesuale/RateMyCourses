const express = require('express')
const db = require('../config')

const {
	body,
	param,
	validationResult
} = require('express-validator');

//DB Queries
const getCourse = `SELECT * FROM courses WHERE course_id = $1;`
const getReviews = `SELECT * FROM reviews WHERE course_id = $1;`
const getPrereq = `SELECT * FROM prereq, courses WHERE prereq.course_id = $1 AND courses.course_id = prereq.require;`

const getAllCourses = `SELECT courses.name, campus.name as campus, courses.description, courses.overall_rating
				FROM courses, campus WHERE courses.campus = campus.camp_id ORDER BY overall_rating DESC;`
	
const insertReview = `INSERT INTO reviews(course_id, user_id, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING course_id, user_id;`
const searchCoursesByName = `SELECT name, campus, description, overall_rating FROM courses 
	WHERE name = $1;`

// Run Queries here 
exports.test = [
	async function(req, res, next) {
		result = {
				  test: "API working"
				 }
		res.status(200).json(result);
	}
];

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

exports.postReview = [
	body('course_id')
	.exists()
	.withMessage('Missing Course Id Parameter')
	.bail()
	.isInt()
	.withMessage('Invalid Course Id Parameter')
	.bail()
	.escape(),
	body('user_id')
	.exists()
	.withMessage('Missing User Id Parameter')
	.bail()
	.matches(/^[a-zA-Z0-9 ]+$/i)
	.withMessage('Invalid User Id Parameter')
	.bail()
	.escape(),
	body('user_comment')
	.exists()
	.withMessage('Missing User Comment Parameter')
	.bail()
	.escape(),
	body('workload')
	.exists()
	.withMessage('Missing Workload Parameter')
	.bail()
	.isInt()
	.withMessage('Invalid Workload Parameter')
	.bail()
	.escape(),
	body('enjoyment')
	.exists()
	.withMessage('Missing Enjoyment Parameter')
	.bail()
	.isInt()
	.withMessage('Invalid Enjoyment Parameter')
	.bail()
	.escape(),
	body('difficulty')
	.exists()
	.withMessage('Missing Difficulty Parameter')
	.bail()
	.isInt()
	.withMessage('Invalid Difficulty Parameter')
	.bail()
	.escape(),
	body('usefulness')
	.exists()
	.withMessage('Missing Usefulness Parameter')
	.bail()
	.isInt()
	.withMessage('Invalid Usefulness Parameter')
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
		overall = (parseInt(req.body.workload) + parseInt(req.body.enjoyment) + parseInt(req.body.difficulty) + parseInt(req.body.usefulness)) / 4

		return await t.one(insertReview, [req.body.course_id , req.body.user_id, req.body.user_comment, req.body.workload, req.body.enjoyment, req.body.difficulty, req.body.usefulness, overall]);
	}).then (result => {
	   console.log(result)
	
     	   if ('course_id' in result && 'user_id' in result) {
          	res.status(200).end();
       	 } else {
		// return 400 if unsuccessful
        	res.status(400).send('Unable to create the review');
       	 }
	}).catch(e => {
		console.log(e); 
		
		if (e.code == 23505) {
			res.status(403).send("Review already submitted");
		} else {
			res.status(500).send("Interal Error");
		}
	})
  }
];

exports.getCourses = [
	async function(req, res, next) {
		db.task(async t => {
		return await t.any(getAllCourses);
	}).then (result => {
		res.status(200).json(result);
	}).catch(e => {res.status(500); res.send(e)})
  }
];

exports.searchCoursesByName = [
	param('course_name')
	.exists()
	.withMessage('Missing Course Name Parameter')
	.bail()
	.trim()
	.escape(),
	async function(req, res, next) {
		db.task(async t => {
		const nameForQuery = req.params.course_name.toUpperCase().replace(/\s+/g, '')
		return await t.any(searchCoursesByName, [nameForQuery]);
	}).then (result => {
		res.status(200).json(result);
	}).catch(e => {res.status(500); res.send(e)})
  }
];
