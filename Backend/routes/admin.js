var express = require("express");
var router = express.Router();
var fs = require("fs");

router.get("/", function (req, res) {

    let currentUsers;
    var emails = [];
    fs.readFile('users.json', (err, data) => {
        if (err) throw err;
        currentUsers = JSON.parse(data);
        currentUsers.forEach((element) => {
            emails.push(element.userEmail);
        });

        let welcomeMessage = "Lista över användare som prenumererar på nyhetsbrev: "
        let html = "";
        html += "<html>";
        html += "<body>";
        html += "<div>";
        html += "<h1>" + welcomeMessage +"</h1>";
        currentUsers.forEach((user) => {
            html += "<br><div>";
            html += "<li>";
            html += "<l>";
            html += "Email: " + user.userEmail + " " + "Subscription status: " + user.subscribed;
            html += "</l>";
            html += "</li>";
            html += "</div>";
        });
        html += "</body>";
        html += "</html>";
        res.send(html);
    });
});

module.exports = router;