var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  //request handler
  if (request.method === "GET" && parsedUrl.pathname === "/listings") {
    //return success code
    response.statusCode = 200;

    //responds with data
    response.write(listingData);
  }
  else {
    //send bad request code
    response.statusCode = 404;
    response.write("Bad gateway error");
  }
  //tells server body and headers have been sent
  response.end();
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  listingData = data;
  //calls function to start server
  startServer();
});

//function to start server
function startServer() {
  //creates the server
  server = http.createServer(requestHandler);

  // listens on port specified
  server.listen(port, function () {

  //console log that server is listening
    console.log("Server listening on: http://127.0.0.1:" + port);

  });
}