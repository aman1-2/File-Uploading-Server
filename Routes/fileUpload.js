//To define routes we need Router.
const express = require('express');
const router = express.Router();

//Controllers to attach with router.
const uploadRoute = require('../Controllers/uploadController');

//Define the routes.
router.post('/localFileUpload',uploadRoute.localFileUpload);
router.post('/imageUpload',uploadRoute.imageUpload);
router.post('/videoUpload',uploadRoute.videoUpload);
router.post('/imageSizeReducer',uploadRoute.imageSizeReducer);

module.exports = router;