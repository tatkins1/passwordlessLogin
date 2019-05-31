var express = require('express');
var router = express.Router();
let userDao = require("../DAOs/userDao");

/* GET users listing. */
router.get('/', function(req, res, next) {
  let users= userDao.getAllUsers();
  res.send(users);
});


module.exports = router;
