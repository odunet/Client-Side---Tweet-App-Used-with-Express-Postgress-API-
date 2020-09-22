//initialize DOM selectors
const form = document.querySelector('form');
const ElementLoading = document.querySelector('.loading');
const name_ = document.querySelector('#name');
const content_ = document.querySelector('#content');
const mewsElement = document.querySelector('.mews');

//Initialize logger
//import loger
const Logger = require('./logger');

//instantialize loger
const logger = new Logger;

//event listener
logger.on('message',(data) => console.log('Called Logger! ', data));

//Keep GIF active by default when the page is loaded
ElementLoading.style.display = '';

//Initialize route to the get page for JSON Mew data
// const MEW_URL = window.location.hostname === "127.0.0.1" ? 'http://localhost:5000/dtreq' : 'https://silvpurpnote.herokuapp.com/dtreq'
const MEW_URL =   'https://silvpurpnote.herokuapp.com/dtreq' 

//run the function to display tween oin startup
listAllMews();

//Initialize route to the backend server waiting for POST request
// const API_URL = window.location.hostname === '127.0.0.1' ? 'http://localhost:5000/silvpurp' : 'https://silvpurpnote.herokuapp.com/silvpurp'
const API_URL =  'https://silvpurpnote.herokuapp.com/silvpurp'


//handle submit event in the DOM
form.addEventListener('submit', (event) =>{
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    event.preventDefault();
    const mew = {
        name, content
    }

    //Change the display state of the form and GIF
    form.style.display = 'none'
    ElementLoading.style.display = '';

    //Send data through server to the route
    //Called loadJSON in P5. It is a way of making request to the server and recieving response.
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(mew),
        headers:{
            'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(createMew => {
          console.log(createMew.rows);

          //Init Emmiter
          logger.log(`${createMew.rows} \n`);

          //change the page back to defaulf screen, with loader off and form on 
          form.reset();

          //Unhide form after 30 seconds
          setTimeout(()=>{
            form.style.display = '';
          },10000)

        
          //A. reload windows
          listAllMews();

      });

});

//create function to get mew and display
function listAllMews(){
    mewsElement.innerHTML = ""
    fetch(MEW_URL) 
    .then(response => response.json())
    .then(loadMew => {
        console.log(loadMew);
        loadMew.reverse();
        loadMew.forEach( mew_ => {
        console.log(mew_);
        const div = document.createElement('div');
        //Add the name as header
        const header = document.createElement('h3');
        header.textContent = mew_.name; 
        //Add the content in paragraph element
        const contents = document.createElement('p');
        contents.textContent = mew_.contents;
         //Add the content in paragraph element
         const posting_date= document.createElement('p');
         posting_date.textContent = mew_.posting_date.slice(0,10);
         console.log(typeof(mew_.posting_date));
        

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(posting_date);

        //append newly created div to DOM
        mewsElement.appendChild(div);

        })
          //change the page back to defaulf screen,
          // with loader off and form on 
          ElementLoading.style.display = 'none';

      });
}