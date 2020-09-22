//Initialize logger
//import loger
const Logger = require('./public/js/logger');

//instantialize loger
const logger = new Logger;

//event listener
logger.on('message',(data) => console.log('Called Logger! ', data));

//Import the url module
const EventEmitter = require('events');

//import http
const http = require('http');

//Import the url module
const url = require('url');

//import other module
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req,res) => {
    //Build file path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html': req.url);

    //Get extension of file
    let extname = path.extname(filePath);

    // Check ext and set content type
    switch(extname){
        case '.css':
            contenType = 'text/css';
            break;
        case '.json':
            contenType = 'application/json';
            break;
        case '.png':
            contenType = 'image/png';
            break;
        case '.jpg':
            contenType = 'image/jpg';
            break;
        case '.html':
            contenType = 'text/html';
            break;
        case '.js':
            contenType = 'application/javascript';
            break;
    }
    // console.log(filePath);
    //Read file
    fs.readFile(filePath, (err,content)=> {
        if (err){
            console.log(err);
            if(err.code == 'ENOENT'){
                //PAGE NOT FOUND
                fs.readFile(path.join(__dirname, 'public', 'nofound.html'),(err,content)=>{
                //Init Emmiter
                logger.log(`${err.code} \n`);
 
                })
            }
            else{
                //some error
                res.writeHead(500);
                res.end(`server error: ${err.code}`);
                //Init Emmiter
                logger.log(`${err.code} \n`);
            }

        }else{
            //Success
            res.writeHead(200, {'Content-Type': contenType, 'route': req.url});
            res.end(content, 'utf8');
             //Init Emmiter
             logger.log('Success \n');
        }
    })

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
