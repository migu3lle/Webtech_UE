/*
Michael Gundacker 1646765
Webtech UE 6.1 - Node.js Gallery Setup
*/

let cfg = require('./config.json') //Load JSON file

let express = require('express'); //Load web-framework "Express" for Node.js

let cors = require('cors') //Load package for CORS
const app = express();

app.use(express.static('public')); // host public folder
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *
const db = require("./db");

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

// set routes
const loginRoutes = require('./routes/login');
const galleryRoutes = require('./routes/gallery');
const imageRoutes = require('./routes/image');

//Routes, welche Funktionen beinhalten, die als Modul Export in den /routes/* files exportiert wurden
//Die Funktion loginRoutes wird für jede Art von HTTP-Anforderung 
//auf dem Pfad /login ausgeführt.
app.use("/login", loginRoutes);
app.use("/gallery", galleryRoutes);
app.use("/image", imageRoutes);


//Doppelpunkt gibt einen Parameter mit Namen (="hello") an, der aus req.params.hello geholt werden kann
/*
app.use("/:hello", (req, res) => {
    res.send("Welcome to gallery server 1.0 - you passed the parameter " + req.params.hello);
});
*/

// default route
app.use("/", (req, res) => {
    console.log("Welcome to gallery server 1.0");
    res.send("Welcome to gallery server 1.0");
});

db.initDb.then(() => {
    app.listen(cfg.server.port, () => {
        console.log("Listening on port " + cfg.server.port + "...");
    });
}, () => {console.log("Failed to connect to DB!")});
