/*
Webtech - Excercise 5.3 - Node.js
Michael Gundacker 1646765
*/

//Include the built-in HTTP module
let http = require('http');
//Include the fileServer module (for file access)
let fs = require('fs');
//Include the express module
let express = require('express')
let home = '/Users/gunmic/Documents/AAU/18WS/Webtech/UE/UE05/ex3/httpRoot'


//Helper method to manually build JSON object from CSV string (we could also use a module here)
function csvToJson(csvString){
    //Get rows
    row = csvString.split("\n")
    let json = {}
    for(let i = 0; i < row.length; i++){
        //Get elements of each row
        let cols = row[i].split(";")
        json[i] = {}        
        cols.forEach(column => {
            json[i].dataSmall = cols[0]
            json[i].dataBig = cols[1]
            json[i].description = cols[2]
        });
    }
    return json
}

//Helper method to read content type from request url
function getContentType(fileUrl){
    let extension = fileUrl.substring(fileUrl.lastIndexOf('.'), fileUrl.length)
    switch (extension) {
        case '.html':   return 'text/html'
            break;
        case '.js':     return 'application/javascript'
            break;
        case '.json':   return 'application/json'
            break;
        case '.css':    return 'text/css'
            break;
        case '.jpg':    return 'image/jpg'
            break;
        default:        return 'text/plain'
            break;
    }
}


console.log('Starting HTTP server on port 80')
//Create the HTTP server
http.createServer(function (req, res) {
    console.log('Received request: ' + req.url)
    //On request for root, respond with gallery.html
    if(req.url === '/'){
        fs.readFile('httpRoot/gallery.html', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data)
            res.end();
            console.log("Server responed with HTML file")
        })
    }
    //This part is for testing CSV conversiononly (requesting 'localhost/galleryJSON')!
    //See else{} for general file access handling
    else if(req.url === '/galleryJSON'){
        console.log('Request-URL: ' + req.url)
        //Read JSON file from filesystem 
        fs.readFile('gallery.csv', function(err, data){
            res.writeHead(200, {'Content-Type': getContentType(req.url)});
            res.write(JSON.stringify(csvToJson(data.toString())))
            res.end();
            console.log('Server responed with ' + getContentType(req.url) + ' file')
        })
        /* // Initial test with existing json file before we build our JSON from CSV
        fs.readFile('gallery.json', function(err, data){
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(data));
            res.end();
        })*/
    }
    //On other request, check if file exists and respond with file
    //If not, respond with not found error
    else{
        fs.readFile('httpRoot' + req.url, function(err, data){
            if(!err){
                res.writeHead(200, {'Content-Type': getContentType(req.url)});
                res.write(data)
                res.end();
                console.log('Server responed with ' + getContentType(req.url) + ' file')
            }
            else{   //Error handling -> Respond with 'Not found'
                res.writeHead(404);
                res.end()
                console.log('ERROR: invalid request - file not found!')
            }
        })
    }
}).listen(80);