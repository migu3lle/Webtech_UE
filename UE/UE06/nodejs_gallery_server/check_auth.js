/*
Michael Gundacker 1646765
Webtech UE 6.2 - Simple Authentication
*/

let cfg = require('./config.json')
const getDb = require("./db").getDb;

// verify token using cfg.auth.jwt_key
module.exports = (req, res, next) => {
    const db = getDb();
    let token = req.headers.authorization;

    //TODO EX2: verify token validity via MySQL request

    console.log("Received header authorization: " + req.headers.authorization);

    db.query('SELECT * FROM users WHERE token = ?', [token], (error, results) =>{
        if(error){ //On DB error respond with error
            console.log("database error")
            res.status(401).json({message: "an error occured"});
        }
        if(!results || results.length != 1){ //On 0 or >1 results respond with failure
            console.log("requested token not found in database")
            res.status(404).json({message: "token not found"})
        }
        else{ //respond with user found in database for given token
            req.user = results[0];
            next(); // call on success
        }
    })
};
