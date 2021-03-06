var express = require('express');
const router = express.Router({ mergeParams: true, strict: true });

const db = require('./queries');

//API routes go here 
router.route('/test')
    .get(db.test)

router.route('/course')
    .post(db.getCourseInfo)
    
router.route('/courses')
    .get(db.getCourses)
    
router.route('/reviews')
    .post(db.postReview)

router.route('/search/:course_name')
    .get(db.searchCoursesByName)

router.route('/login')
    .post(db.login)

router.route('/register')
    .post(db.register)

router.route('/recommendations/:email')
    .get(db.getUserRecommendations)

router.route('/like')
    .post(db.likeCourse)

router.route('/unlike')
    .post(db.unlikeCourse)

router.route('/getLikes')
    .post(db.getLikedCoursesByUser)

router.route('/hasUserLikedCourse')
    .post(db.hasUserLikedCourse)

router.route('/likeReviews')
    .post(db.likeReview)
    .delete(db.unlikeReview)

module.exports = router;
