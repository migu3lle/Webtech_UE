/*
Michael Gundacker 1646765
Webtech UE 6.2 - Simple Authentication
*/

let cfg = require('../config.json')
const express = require('express');
const router = express.Router();
const getDb = require("../db").getDb;

//Exported routing function POST route with parameter "email"
router.post('/:email', (req, res) => {
    const db = getDb();

    //Lies die E-Mail aus
    console.log("Login email: " + req.params.email)
    //Hole das Passwort aus der JSON Datei
    console.log("Login password: " + req.body.pass);
    //Erzeuge die Datenbank-Query
    
    
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    //Abruf der Query
    db.query(query, [req.params.email, req.body.pass], (error, results) => {

        if(error){ //Database error occured - Login failure
            console.log('database error: \n' + error)
            res.status(500).json({message: "an error occured"});
        }
        if(results.length != 1){ //Zero or more than one entries found - Login failure
            console.log('login failed')
            res.status(401).json({message: "login failed"});
        }
        else{ //Login success - user found in DB
            //Now create token and update database
            let rand = Math.floor(Math.random() * 10000);
            console.log('New random token: ' + rand);
            db.query('UPDATE users SET token = ? WHERE email = ? AND password = ?', [rand, req.params.email, req.body.pass], (error, update_results) => {
                if(error){
                    res.status(400).json({message: "an error occured"});
                }
                console.log("Database user (current):\n--> " + JSON.stringify(results));
                res.status(200).json({first_name: results[0].first_name, last_name: results[0].last_name, token: rand});
            })
        }
    });
});

module.exports = router;
