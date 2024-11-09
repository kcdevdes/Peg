const express = require('express')
const {hello, upload, handleUpload} = require("../services/submit-service");
const router = express.Router()

router.get('/', hello);
// router.post('/file', upload.single('class_file'), handleUpload);
router.post('/file', upload.single('class_file'), handleUpload);

module.exports = router;