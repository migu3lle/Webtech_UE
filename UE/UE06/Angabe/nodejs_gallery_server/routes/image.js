const express = require('express');
const router = express.Router();
const checkAuth = require('../check_auth');
const getDb = require("../db").getDb;

router.patch('/:id', checkAuth, (req, res) => {
    let db = getDb();

    //TODO EX5: update image description upon client request
    res.status(404).json({message: "db entry not found"}); // replace with your code
});


module.exports = router;
