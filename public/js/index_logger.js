//import loggger
const Logger = require('./logger');

//instantite logger
const logger = new Logger;

//event listener
logger.on('message',(data) => console.log('Called Logger! ', data));

//Init Emmiter
logger.log('Hello World! \n');
logger.log('Miami \n');
logger.log('Celomomo ');
