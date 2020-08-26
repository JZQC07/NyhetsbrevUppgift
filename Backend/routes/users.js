var express = require("express");
var fs = require("fs");
const { response } = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  fs.readFile("users.json", (err, data) => {
    if (err) throw err;
    var users = JSON.parse(data);
    res.send(users);
  });
});

//Skapa användare
router.post("/", function (req, res) {
  fs.readFile("users.json", (err, data) => {
    if (err) throw err;
    var users = JSON.parse(data);
    let userId = 0;
    users.forEach((element) => {
      userId++;
    });
    user = {
      id: userId + 1,
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      password: req.body.password,
      subscribed: false,
      loggedIn: false,
    };
    users.push(user);
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
      if (err) throw err;
    });
  });
  res.status(200).send(req.body);
});

//Logga in
router.post("/login", function (req, res) {
  var newUsername = req.body.loginUserName;
  var newPassword = req.body.loginUserPassword;

  fs.readFile("users.json", (err, data) => {
    var users = JSON.parse(data);
    if (err) throw err;

    const [foundUser] = users.filter((user) => {
      return user.userName === newUsername && user.password === newPassword;
    });

    if (foundUser) {
      res.send({
        ...foundUser,
        loggedIn: true,
      });
    } else {
      res.send("Felaktig inloggning.. Försök igen"); //Kolla om detta funkar.
      res.status(400).send({
        loggedIn: false,
        userName: null,
        userEmail: null,
      });
    }
  });
});

//Uppdatera newsletter
router.put("/:id", (req, res) => {
  var id = parseInt(req.params.id);
  var updateSub = req.body.subscribed;
  fs.readFile("users.json", (err, data) => {
    if (err) throw err;
    var users = JSON.parse(data);
    users.forEach((u) => {
      if (u.id === id) {
        u.subscribed = updateSub;
      }
    });
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
      if (err) throw err;
    });

    /*for (let i = 0; i < users.length; i++) {
                          if (req.body.id == i) {
                            users[i].subscribed = req.body.subscribed;
                            var saveUser = JSON.stringify(users, null, 2);
                            fs.writeFile("users.json", saveUser, (err, data) => {
                              if (err) throw err;
                            });
                            res.send("Subscription status has been updated for user with id: " + i);
                          }
                        }*/
  });
  res.status(200).send(req.body);
});

module.exports = router;
