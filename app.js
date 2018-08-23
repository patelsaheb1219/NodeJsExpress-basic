var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


var app = express();

// var logger = function( req , res , next){
//     console.log('Logging...');
//     next();
// }

// app.use(logger);


// Nody Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//Set static path
app.use(express.static(path.join(__dirname , 'public')));

var person = [
    {
        name : 'Kishan Patel',
        age : 21
    },
    {
        name : 'Ravi Patel',
        age : 21
    },
    {
        name : 'Freddy Thobhani',
        age : 21
    }

]

app.get('/', function(req , res){
    res.json(person);
});

app.listen(3000 , function(){
    console.log('Server started on port 3000 ...')
});