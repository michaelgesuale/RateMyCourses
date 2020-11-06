var express = require('express');
const router = express.Router({ mergeParams: true, strict: true });

const db = require('./queries');

//API routes go here 
router.route('/test')
    .get(db.test)

router.route('/course/:course_id')
    .get(db.getCourseInfo)
    
router.route('/courses')
    .get(db.getCourses)
    
router.route('/reviews')
    .post(db.postReview)

router.route('/search/:course_name')
    .get(db.searchCoursesByName)

module.exports = router;
