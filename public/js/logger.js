//Import the url module
const EventEmitter = require('events');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const { PassThrough } = require('stream');

//Create class
class Logger extends EventEmitter{
    log(msg){
        //call event
        var tem_data = {id: uuid.v4(),msg:msg}
        this.emit('message',  {id: tem_data.id,msg:tem_data.msg});
        //create folder
        fs.mkdir(path.join(__dirname,'log'),{},(err)=>{
            if (err){
            };
            console.log('Folder Created');
        })

        // Open file and write to file
        // openFile
        //check if file is empty
        var temp_log_text = '';
        fs.readFile(path.join(__dirname,'log','log.txt'),'utf8',(err,data)=>{
            if (err) {
                console.log('New file created');
            };
            temp_log_text = data;
        })
        if (temp_log_text = ''){
            fs.writeFile(path.join(__dirname,'log','log.txt'),` ${tem_data.id} ${tem_data.msg}`,(err)=>{
                if (err) throw err;
                console.log('File Created');    
        }
            )
        }
        else{
              fs.appendFile(path.join(__dirname,'log','log.txt'),` ${tem_data.id} ${tem_data.msg}`,(err)=>{
                if (err) throw err;
                console.log('File Created TO APPEND');
            })

    }
        }}
module.exports = Logger;
