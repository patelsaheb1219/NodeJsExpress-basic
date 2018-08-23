var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();

// var logger = function( req , res , next){
//     console.log('Logging...');
//     next();
// }

// app.use(logger);

//View Engine
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//Set static path
app.use(express.static(path.join(__dirname , 'public')));

// Express Validator Middleware 
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

var users  = [ 
    {
        id : 1,
        first_name : 'Kishan',
        last_name : 'Patel',
        email : 'kaumik@gmail.com'
    },
    {
        id : 2,
        first_name : 'Ravi',
        last_name : 'Patel',
        email : 'ravi@gmail.com'
    },
    {
        id : 3,
        first_name : 'Freddy',
        last_name : 'Thobhani',
        email : 'freddy@gmail.com'
    }
]

app.get('/', function(req , res){
    res.render('index' , {
        title : 'Customers',
        user : users
    });
});

app.post('/user/add', function(req , res){

    req.checkBody('firstName' , 'First Name is required').notEmpty();
    req.checkBody('lastName' , 'last Name is required').notEmpty();
    req.checkBody('email' , 'Email is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('index' , {
            title : 'Customers',
            user : users,
            errors:errors
        });
    } else {
        var newUser = {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email
        }
        console.log('Success');
    }
})
app.listen(3000 , function(){
    console.log('Server started on port 3000 ...')
});