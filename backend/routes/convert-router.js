const express = require('express')
const {hello} = require("../services/convert-service");
const router = express.Router()

router.get('/', hello);

module.exports = router;