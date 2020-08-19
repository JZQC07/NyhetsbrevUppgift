var express = require('express');
var fs = require('fs');
const {
  json
} = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

  fs.readFile('users.json', (err, data) => {

    if (err) throw err;
    var users = JSON.Parse(data);
    res.send(users);
  })

});

module.exports = router;