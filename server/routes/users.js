const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('INI API USERS!');
});

module.exports = router;
