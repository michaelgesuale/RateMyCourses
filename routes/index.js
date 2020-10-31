var express = require('express');
var router = express.Router({ mergeParams: true, strict: true});
const page = require('./UI/pageFunc');

/* Main pages router */
router.get('/', page.mainPage);
// router.get('/catalog', page.catalogPage);
// router.get('/register', page.registerPage);
// router.get('/login', page.loginPage);
// router.get('/dashboard', page.dashboardPage);

module.exports = router;
