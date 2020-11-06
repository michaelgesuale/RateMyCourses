const express = require('express')
const db = require('../config')

const {
	body,
	param,
	validationResult
} = require('express-validator');

//DB Queries
const getCourse = `SELECT courses.name, campus.name as campus_name, description, year, subject, overall_rating, overall_workload, overall_enjoyment, overall_difficulty, overall_usefulness FROM courses, campus WHERE courses.campus = camp_id AND courses.course_id = $1;`
const getReviews = `SELECT user_id as user_name, user_comment, overall, workload, enjoyment, difficulty, usefulness, likes as helpful FROM reviews WHERE course_id = $1;`
const getPrereq = `SELECT courses.course_id, courses.name FROM prereq, courses WHERE courses.course_id = prereq.require AND prereq.course_id = $1;`

const getAllCourses = `SELECT courses.course_id, courses.name, campus.name as campus, courses.description, courses.overall_rating
				FROM courses, campus WHERE courses.campus = campus.camp_id ORDER BY overall_rating DESC;`
	
const insertReview = `INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING course_id, username;`
const searchCoursesByName = `SELECT courses.name, campus.name as campus, courses.description, courses.overall_rating
	FROM courses, campus WHERE courses.campus = campus.camp_id AND courses.name = $1 ORDER BY overall_rating DESC;`

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
	body('username')
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

		return await t.one(insertReview, [req.body.course_id , req.body.username, req.body.user_comment, req.body.workload, req.body.enjoyment, req.body.difficulty, req.body.usefulness, overall]);
	}).then (result => {
	   console.log(result)
	
     	   if ('course_id' in result && 'username' in result) {
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
