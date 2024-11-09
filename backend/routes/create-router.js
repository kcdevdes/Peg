const express = require('express')
const {hello} = require("../services/create-service");
const router = express.Router()

router.get('/', hello);

module.exports = router;