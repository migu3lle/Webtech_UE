let cfg = require('../config.json')
const express = require('express');
const router = express.Router();
const getDb = require("../db").getDb;

router.post('/:email', (req, res) => {
    const db = getDb();

    //TODO EX2: get login parameters and handle user authentication via random number token stored in user table
    res.status(401).json({message: "login failed"}); // replace with your code
});

module.exports = router;
