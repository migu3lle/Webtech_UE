/*
Michael Gundacker 1646765
Webtech UE 6.3 - Requesting User Gallery
*/

const express = require('express');
const router = express.Router();
const checkAuth = require('../check_auth');
const getDb = require("../db").getDb;

//Hier wird zuerst die exportierte checkAuth Methode aufgerufen, welche wiederum next() aufrufen muss,
//um in die anonyme (req, res) => Funktion zu kommen  
router.get('/', checkAuth, (req, res) => {
    let db = getDb();

    console.log("gallery.js - user identified by token:\n--> " + JSON.stringify(req.user));

    //TODO EX3: create and return image JSON list (cf. ex 4.4) for logged in user
    let userObjectId = req.user.id;
    console.log('gallery searching for user ID: ' + userObjectId)

    //Start database query with user object given from check_auth.js
    db.query(`SELECT i.* from users_images ui, images i 
                WHERE ui.image_id = i.id 
                AND ui.user_id = ?`, [userObjectId], (error, results) => {
                    
                    console.log('gallery query returned result: ' + results + '\n')
                    
                    if(error){ //On DB error return error message
                        res.status(401).json({message: "gallery: an error occured", text: error});
                    }
                    if(!results){ //If no results return not found
                        res.status(404).json({message: "gallery: no images found"})
                    }
                    else{ //On successful query return results as JSON
                        console.log('gallery found image(s), responding with results:\n' + JSON.stringify(results))
                        res.status(200).json(results)
                    }
                })
});

module.exports = router;
