var express = require('express');
const router = express.Router({ mergeParams: true, strict: true });

const db = require('./queries');

//API routes go here 

router.route('/test')
    .get(db.test)


module.exports = router;
