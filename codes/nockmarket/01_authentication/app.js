
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , routes = require('./routes')
  , fs = require('fs')
  , User = require('./models/User.js')
  , bodyParser     = require('body-parser')
  , morgan         = require('morgan')
	, methodOverride = require('method-override')
	, errorHandler = require('errorhandler');

 // var app = module.exports = express.createServer();
 var app = express();



// Configuration

/*app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});*/

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                     // log every request to the console
app.use(bodyParser.urlencoded({ extended: false }))    // parse application/x-www-form-urlencoded
app.use(bodyParser.json())    // parse application/json
app.use(methodOverride());

/*app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});*/

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

// Routes

app.get('/', routes.index);
app.get('/form', function(req, res) {
  fs.readFile('./form.html', function(error, content) {
    if (error) {
      res.writeHead(500);
      res.end();
    }
    else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf-8');
    }
  });
});
app.post('/signup', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  alert(username + password + "saatu");
  User.addUser(username, password, function(err, user) {
    if (err) throw err;
    res.redirect('/form');
  });
});

// app.listen(3000);
// console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});