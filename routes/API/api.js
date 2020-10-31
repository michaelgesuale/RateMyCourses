var express = require('express');
const router = express.Router({ mergeParams: true, strict: true });

const db = require('./queries');
const bodyParser = require('body-parser');

//API routes go here 
router.route('/v1/course/:course_id')
    .get(db.getCourseInfo)
    
router.route('/v1/reviews')
    .post(db.postReview)

module.exports = router;
