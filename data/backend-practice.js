
// backend is another computer that manages the data of a website
// what we've been designing is the frontend
// you communicate with other computer through http

// xmlhttpclass - built in class

// creates a new http message to send to the backend
const xhr = new XMLHttpRequest();

// open network tab in inspect to see http requests coming in and out
// messages only appear in network after opening the console so open the network tab and resend the mesages to see the http messages


// request - response cycle
// message to backend is request
// message received is response

// get response -  but we need to wait for the response to get back
// load means response has loaded, the function runs after the response is loaded

xhr.addEventListener('load', () => {
    console.log(xhr.response);
});

// set up event listener and then trigger the event
// get, post, put, delete are examples or requests
// provide url for where to send request to

// url path is what comes after the domain name, each url path delivers a different response. backend supports only a certain number of url paths. the list of supported apis is called "Backend API "

// backend can respond with different types of data eg text - products/first returns a json string, it can also respond with an image

// status code starting with 4 or 5 is a failure, 4 is ourt fault, 5 is a backend problem. starting with 2 is a success
// typing a website in a browser is sending a get request and displaying the response on the webpage
xhr.open('GET', 'https://supersimplebackend.dev/');
xhr.send();




