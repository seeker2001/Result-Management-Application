const express = require('express'); // get express for Router function
const router = express.Router(); 
const { getHomePage } = require('../controllers/HomeController');

router.get('/', getHomePage);
module.exports = router;