var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

  fs.readFile('users.json', (err, data) => {

    if (err) throw err;
    var users = JSON.parse(data);

    res.send(users);

  })
});


//Uppdatera användare
router.post('/', function (req, res) {
  console.log(req.body);
  var user = req.body;
  console.log(user);
  fs.readFile('users.json', (err, data) => {
    if (err) throw err;

    var json = JSON.parse(data);
    json.push(user);

    fs.writeFile('users.json', JSON.stringify(json), (err) => {
      if (err) throw err;
    });
  });
  res.status(200).send(req.body);
});

//Logga in
router.post('/login', function (req, res) {
  fs.readFile('users.json', (err, data) => {
    if (err) throw err;
    var users = JSON.parse(data);
    users.forEach(element => {
      if (element.userName === req.body.userName && element.password === req.body.password) {
        res.send(element.id.toString());
      }
    })
  })

});

router.put('/:id', (req, res) => {
  var id = parseInt(req.params.id);
  var updatedUser = req.body.subscribed;

  fs.readFile('users.json', (err, data) => {
    if (err) throw err;

    var json = JSON.parse(data);

    json.forEach(element => {
      if (element.id === id) {
        element.subscribed = updatedUser
      }
    });

    fs.writeFile('users.json', JSON.stringify(json), (err) => {
      if (err) throw err;
    });
  });
  res.status(200).send(req.body);
});

module.exports = router;