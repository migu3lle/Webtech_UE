const express = require('express');
const router = express.Router();
const checkAuth = require('../check_auth');
const getDb = require("../db").getDb;

router.get('/', checkAuth, (req, res) => {
    let db = getDb();

    //TODO EX3: create and return image JSON list (cf. ex 4.4) for logged in user
    res.status(401).json({message: "no results"}); // replace with your code

});

module.exports = router;
