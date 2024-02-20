//To define routes we need Router.
const express = require('express');
const router = express.Router();

//Controllers to attach with router.
const uploadRoute = require('../Controllers/uploadController');

//Define the routes.
router.post('/localFileUpload',uploadRoute.localFileUpload);

module.exports = router;