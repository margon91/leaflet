var express = require('express');
var router = express.Router();
var server = require("http").createServer(express);
var io = require("socket.io").listen(server);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;