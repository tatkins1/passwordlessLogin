var express = require('express');
var router = express.Router();
let codeMap = require("../DAOs/codemap");
let userDao = require("../DAOs/userDao");

router.get('/user', function (req, res, next) {
    console.log(req.session.user);
    res.status(200).send(req.session.user);
});

router.get('/logout', function (req, res, next) {
    console.log("logging out");
    console.log(`session id ${req.session.id}`);
    req.session.user=null;
    res.status(200).send({});
});

router.post('/login', function (req, res, next) {
    let sessionId = req.session.id;
    let postBody = req.body;
    let number = postBody.number;
    let code = sendCode();
    let expires = new Date().getTime() + 30000;
    codeMap[sessionId] = { "code": code, "number": number, "expires": expires };
    res.status(200).send({uid:number});
});

router.post('/verify', function (req, res, next) {
    let sessionId = req.session.id;
    console.log(sessionId);
    let postBody = req.body;
    let clientCode = postBody.code;
    let status = verify(sessionId, clientCode);
    if (status === 1) {
        console.log("Valid code");
        let number = codeMap[sessionId].number;
        //check if user already exists
        let user=userDao.getUser(number);
        if(user===undefined){
             //create new user
             console.log("Creating new user");
             let user=userDao.createUser(number, sessionId);
             req.session.user = user;
        }else{
            //user already exists
            console.log("User already exist. fetching user!");
            req.session.user = user;
        }
        
    } else if (status === 0) {
        console.log("Invalid code");
    } else {
        console.log("Code has expired");
    }
    console.log(`Code to Session Map: ${codeMap}`);
    res.status(200).send({status:status});
});

function verify(sessionId, clientCode) {
    let now = new Date().getTime();
    let data = codeMap[sessionId];
    if(data){
        let expirationDate = data.expires;
    let serverCode = data.code;
    if (expirationDate > now) {
        console.log(`clientCode: ${clientCode} vs serverCode: ${serverCode}`);
        if (serverCode === clientCode) {
            return 1;
        } else {
            return 0;
        }

    } else {
        return -1;
    }
    }else{
        console.log("ERROR: do not recognize sessionId");
        return -1;
    }
    

}
function sendCode() {
    let val = Math.floor(1000 + Math.random() * 9000);
    console.log(`${val} is your verification code to login`);
    return val + "";
}
module.exports = router;
