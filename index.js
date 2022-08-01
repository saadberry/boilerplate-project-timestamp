// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//function to check if input date contains whitespace
function containsWhitespace(str) {
  return /\s/.test(str);
}
//if unix/utc is received
app.get('/api/:id', function (req,res) {
  // const strs = `/api/:id`.split('/');
  // const id = strs.at(-1)
  unixDate = req.params.id;
  console.log(unixDate)
  // if date is in unix format
  if(!containsWhitespace(unixDate)){    
   
    var date = new Date(parseInt(unixDate))
    console.log(date)
    console.log(date.toGMTString())
    if(isNaN(date)){
      
      res.json({error:"Invalid Date"})
    }
    else{
      res.json({unix:unixDate,utc:date.toGMTString()})
  }  }

  // if date is in utc format
  else{
    res.send('hehe')
  }
  
});

//if date parameter is empty
app.get('/api/', function(req,res){

  var weekday = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat')
  var date = new Date();

  var dd = String(date.getDate()).padStart(2, '0');
  var day = String(date.getDay())
  day = weekday[day]
  
  const options = { month: 'long'};
  var month = (new Intl.DateTimeFormat('en-US', options).format(month));
  var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  
  var yyyy = date.getFullYear();
  console.log(day)
  // today = mm + '/' + dd + '/' + yyyy;
  // today = dd + ','

  //"Fri, 25 Dec 2015 00:00:00 GMT"
  today = day + ', ' + dd + ' ' + month + ' ' +yyyy 
  const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
    weekday: 'long'
    
});
  res.json({unix:date.getTime()/1000.0,utc:date.toGMTString()})
})


// listen for requests :)
var listener = app.listen(8000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
