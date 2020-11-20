const express = require('express')
const db = require('../config')

const {
	body,
	param,
	validationResult
} = require('express-validator');

//DB Queries
const getCourse = `SELECT courses.name, campus.name as campus_name, description, year, subject, overall_rating, overall_workload, overall_enjoyment, overall_difficulty, overall_usefulness FROM courses, campus WHERE courses.campus = camp_id AND courses.course_id = $1;`
const getReviews = `SELECT username as user_name, user_comment, overall, workload, enjoyment, difficulty, usefulness, likes as helpful FROM reviews WHERE course_id = $1;`
const getPrereq = `SELECT courses.course_id, courses.name FROM prereq, courses WHERE courses.course_id = prereq.require AND prereq.course_id = $1;`

const getAllCourses = `SELECT courses.course_id, courses.name, campus.name as campus, university.name as university_name, courses.description, year, subject, courses.overall_rating FROM courses, campus, university WHERE campus.university = university.uni_id AND courses.campus = campus.camp_id ORDER BY overall_rating DESC;`

const getCampusDomain = `SELECT domain FROM campus, courses WHERE courses.campus = campus.camp_id AND courses.course_id = $1`
const getUserEmail = `SELECT email from users WHERE username=$1`
	
const insertReview = `INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING course_id, username;`
const searchCoursesByName = `SELECT courses.name, courses.course_id, campus.name as campus, courses.description, courses.overall_rating
	FROM courses, campus WHERE courses.campus = campus.camp_id AND courses.name = $1 ORDER BY overall_rating DESC;`

const getExistingUser = `SELECT email, username FROM users WHERE email=$1 AND password=$2;`

const insertUser = 'INSERT INTO users(email, username, password) VALUES ($1, $2, $3);'

const getRecommendedCourses = `SELECT courses.course_id, courses.name, courses.description, courses.overall_rating, courses.year, courses.subject, campus.name as campus
	FROM courses
	INNER JOIN campus ON courses.campus = campus.camp_id
	INNER JOIN likes ON likes.user_email = $1
	INNER JOIN prereq ON courses.course_id = prereq.require
	WHERE courses.overall_rating >= 3;`

const likeCourse = 'INSERT INTO likes(user_email, course_id) VALUES ($1, $2)'
const unlikeCourse = 'DELETE FROM likes WHERE user_email=$1 AND course_id=$2'
const getLikedCoursesByUser = `
	SELECT 
	courses.name, courses.course_id, campus.name as campus, courses.description, courses.overall_rating
	FROM courses, campus, likes 
	WHERE likes.user_email = $1
	AND likes.course_id = courses.course_id
	ORDER BY name DESC;
`
const hasUserLikedCourse = `
SELECT CASE WHEN EXISTS (
	SELECT * FROM likes
	WHERE likes.user_email = $1
	AND likes.course_id = $2
)
THEN CAST(1 AS BIT)
ELSE CAST(0 AS BIT) END
`

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
		campus_domain = await t.one(getCampusDomain, [req.body.course_id]);
		user_email = await t.one(getUserEmail, [req.body.username]);
		
		
		email_domain = user_email.email.substring(user_email.email.lastIndexOf("@") +1);
		
		if (campus_domain.domain != email_domain) {
			return;
		}
		
		return await t.one(insertReview, [req.body.course_id , req.body.username, req.body.user_comment, req.body.workload, req.body.enjoyment, req.body.difficulty, req.body.usefulness, overall]);
	}).then (result => {
		console.log(result)
	   if (result == null) {
		   res.status(400).end();
		} else if ('course_id' in result && 'username' in result) {
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

exports.likeCourse = [
	body('username')
	.exists()
	.withMessage('Missing Username Parameter')
	.bail()
	.trim()
	.escape(),
	body('course_id')
	.exists()
	.withMessage('Missing Course Id Parameter')
	.bail()
	.trim()
	.escape(),
	async function(req, res, next) {
		db.task(async t => {
			const user_email = await t.one(getUserEmail, [req.body.username]);
			return await t.any(likeCourse, [user_email.email, req.body.course_id]);
		}).then (result => {
			res.status(200).json(result);
		}).catch(e => {res.status(500); res.send(e)})
	}
];

exports.unlikeCourse = [
	body('username')
	.exists()
	.withMessage('Missing Username Parameter')
	.bail()
	.trim()
	.escape(),
	body('course_id')
	.exists()
	.withMessage('Missing Course Id Parameter')
	.bail()
	.trim()
	.escape(),
	async function(req, res, next) {
		db.task(async t => {
			const user_email = await t.one(getUserEmail, [req.body.username]);
			return await t.any(unlikeCourse, [user_email.email, req.body.course_id]);
		}).then (result => {
			res.status(200).json(result);
		}).catch(e => {res.status(500); res.send(e)})
	}
];

exports.getLikedCoursesByUser = [
	body('username')
	.exists()
	.withMessage('Missing Username Parameter')
	.bail()
	.trim()
	.escape(),
	async function(req, res, next) {
		db.task(async t => {
			const user_email = await t.one(getUserEmail, [req.body.username]);
			return await t.any(getLikedCoursesByUser, [user_email.email]);
		}).then (result => {
			res.status(200).json(result);
		}).catch(e => {res.status(500); res.send(e)})
	}
]

exports.hasUserLikedCourse = [
	body('username')
	.exists()
	.withMessage('Missing Username Parameter')
	.bail()
	.trim()
	.escape(),
	body('course_id')
	.exists()
	.withMessage('Missing Course Id Parameter')
	.bail()
	.trim()
	.escape(),
	async function(req, res, next) {
		db.task(async t => {
			const user_email = await t.one(getUserEmail, [req.body.username]);
			return await t.any(hasUserLikedCourse, [user_email.email, req.body.course_id]);
		}).then (result => {
			res.status(200).json(result);
		}).catch(e => {res.status(500); res.send(e)})
	}
]

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

exports.login = [
	body('email')
	.exists()
	.withMessage('Missing University E-mail')
	.bail()
	.trim(),
	body('password')
	.exists()
	.withMessage('Missing password')
	.bail(),
	async function(req, res, next) {
		db.task(async t => {
		return await t.one(getExistingUser, [req.body.email, req.body.password]);
	}).then (result => {
		res.status(200).json(result);
	}).catch(() => {res.status(400); res.send("E-mail or password is invalid")})
	}
];

exports.register = [
	body('username')
	.exists()
	.withMessage('Missing Username')
	.bail()
	.trim(),
	body('email')
	.exists()
	.withMessage('Missing University E-mail')
	.bail()
	.trim(),
	body('password')
	.exists()
	.withMessage('Missing password')
	.bail(),
	async function(req, res, next) {
		db.task(async t => {
		const email = req.body.email;
		const username = req.body.username;
		const password = req.body.password;
		await t.none(insertUser, [email, username, password]);
		return t.one(getExistingUser, [email, password]);
	}).then (result => {
		res.status(200).json(result);
	}).catch(() => {res.status(400); res.send("E-mail already registered or username already taken")})
	}
];

exports.getUserRecommendations = [
	param('email')
	.exists()
	.withMessage('Missing user email')
	.bail(),
	async function(req, res, next) {
		db.task(async t => {
		return await t.any(getRecommendedCourses, [req.params.email]);
	}).then (result => {
		res.status(200).json(result);
	}).catch(e => {res.status(500); res.send(e)})
  }
];
