const express = require('express');
const router = express.Router();
const { getLoginPage, postResultPage } = require('../controllers/StudentController');

/**** Routes for search and result page for student ****/
router.get('/login', getLoginPage);
router.post('/result', postResultPage);

module.exports = router;