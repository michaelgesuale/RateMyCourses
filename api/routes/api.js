var express = require('express');
const router = express.Router({ mergeParams: true, strict: true });

const db = require('./queries');

//API routes go here 
router.route('/test')
    .get(db.test)

router.route('/course/:course_id')
    .get(db.getCourseInfo)
    
router.route('/reviews')
    .post(db.postReview)

module.exports = router;
