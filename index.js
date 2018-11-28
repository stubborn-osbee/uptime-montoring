/*
 * 
 *Primary file for api 
 *  
 */ 


//Dependencies
const http = require('http')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder
const config = require('./config')

//The server should respond to all requests with a string
let server = http.createServer((req,res)=>{

    //Get the URL and parse it
    let parsedUrl = url.parse(req.url,true)

    //Get the path
    let path = parsedUrl.pathname
    let trimmedPath = path.replace(/^\/+|\/+$/g,'')

    //Get the query string as an object
    let queryStringObject = parsedUrl.query

    //Get the http method
    let method = req.method.toLowerCase()

    //Get headers
    let header = req.headers

    //Get the payload, if any
    var decoder = new StringDecoder('utf-8')
    var buffer = ''
    req.on('data',(data) => buffer += decoder.write(data) )
    req.on('end',(data)=>{
        buffer += decoder.end()
    
        // Choose the handler the request should go
        let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound
        
        //Construct data object to send to handler
        var data ={
            'trimmedPath' : trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'header': header,
            'payload': buffer
        }
       
        // Route the request to the handler specified in the router
            chosenHandler(data,function(statusCode,payload){
            statuscode = typeof(statusCode) == 'number' ? statusCode : 200
            payload = typeof(payload) == 'object' ? payload : {}

            // Covert payload to string
            let payloadString = JSON.stringify(payload)

            //Return the reponse
            res.setHeader('Content-Type','application/json')
            res.writeHead(statusCode)
            res.end(payloadString)

            //Return the results
            res.writeHead(statusCode) 
            res.end(payloadString)

            console.log('Returning this response '+ statusCode, payload)

        })
       

        // log the request path
        console.log('Request was recieved with this payload: '+ buffer)
    })
})


//Start the server
server.listen(config.port,function(){
    console.log('The server is listening on port' + config.port)
})

//Define the handler
const handlers = {}

//Sample hander
handlers.sample = function(data,callback){
    callback(406, {'name': 'sample handler'})
}

//Not found handler
handlers.notFound = function(data,callback){
    callback(404)
}

//Defining a request router
const router = {
    'sample' : handlers.sample
}