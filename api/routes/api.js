var express = require('express');
const router = express.Router({ mergeParams: true, strict: true });

const db = require('./queries');

//API routes go here 
router.route('/test')
    .get(db.test)

router.route('/v1/course/:course_id')
    .get(db.getCourseInfo)

module.exports = router;
