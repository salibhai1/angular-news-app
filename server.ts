var express = require('express')
var app = express()
var request = require('request');
var newsFeedUrl = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=8&q=http%3A%2F%2Fnews.google.com%2Fnews%3Foutput%3Drss";
var Promise = require('promise');
var parseString = require('xml2js').parseString;

app.set('port', (process.env.PORT || 5000));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(express.static(__dirname + '/app'));

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/app', express.static(__dirname + '/app'));

app.get('/systemjs.config.js', function(req, res, next) {
  res.sendFile('systemjs.config.js', { root: __dirname  });
});

app.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: __dirname  });
});


app.get('/feed/test', function(req, res, next) {
  var parseString = require('xml2js').parseString;
  var xml = ``;
  parseString(xml,  {trim: true}, function (err, result) {
      res.header('Content-Type', 'application/json');
      res.send(result);
  });
});


app.get('/feed/google-news', function(req, res, next) {
  var clientip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
  // console.log('Client IP:' + clientip); 
  var url = newsFeedUrl + "&userip=" + clientip;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.header('Content-Type', 'application/json');
      res.send(body);
    }
  });
  
});

//Read an xml feed 
function xmlFeedToJson(url) {
    return new Promise(function (fulfill, reject) {
      request(url, function (error, response, body) {
          if (!error && response.statusCode == 200) {  
            parseString(body, 
            { 
                tagNameProcessors: [function(name:string) {
                  return name.replace(":","_");
                }],
                trim: true,
                explicitArray: false,
                ignoreAttrs : true               
            }, function (err, parsedXmlResult) {
              fulfill(parsedXmlResult);
            });
          } else {
            reject(error);
          }
      });
    });
}

app.get('/feed/toJson', function(req, res, next) {
  var url = req.query.url;
  if (!url)
  {
      res.header('Content-Type', 'application/json');
      res.send(null);
  }
  
  xmlFeedToJson(url).then(function(body) {
        res.header('Content-Type', 'application/json');
        res.send(body);  
  });    
  
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
