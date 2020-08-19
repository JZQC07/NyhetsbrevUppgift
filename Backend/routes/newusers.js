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

        newUser = {
            "id": 4,
            "userName": "Kalle Karlsson",
            "userEmail": "kalle@mail.com"
        }

        users.push(newUser);

        var saveUsers = JSON.stringify(users, null, 2);

        fs.writeFile('users.json', saveUsers, (err, data) => {
            if (err) throw err;
        })

        res.send("Ny användare sparad!");

    })

});

module.exports = router;