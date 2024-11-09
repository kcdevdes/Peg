const express = require('express')
const router = express.Router()
const submitRouter = require('./submit-router');
const createRouter = require('./create-router');
const convertRouter = require('./convert-router');

router.use('/submit', submitRouter); // submit files
router.use('/create', createRouter); // create questions with AI
router.use('/convert', convertRouter); // convert responded questions into PDF or Markdown format

module.exports = router;