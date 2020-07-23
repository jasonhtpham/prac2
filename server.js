var express = require('express');
var app = express();

let accounts= [
    {   
        id:1,
        name:'alex',
        deposit:5
    },
    {
        id:2,
        name:'sarah',
        deposit:5
    },
    {
        id:3,
        name:'jim',
        deposit:15
    },
];

// response with Hello World when the website hit the root endpoint
app.get('/', function (req, res) {
    res.send("Hello World");
})

app.get('/addTwoNumbers/:x/:y', function(req, res) {
    //parse the params into int for mathematical operation
    let x = parseInt(req.params.x);
    let y = parseInt(req.params.y);
    let result = x + y;

    response = "Result = " + result.toString();
    res.send(response);
})

app.get('/getAccount/:id', function (req, res) {
    // loop through the accounts array to get account.id for comparision
    accounts.forEach(account => {
        if(account.id == req.params.id) {
            res.send(account);
            res.end();
        }
    });
    // response with message if there is no account returned
    res.send("Account Not Found");
})

// Use express.static to serves static files saved in public folder
app.use(express.static('public'))

// the app listens to port 3000
app.listen(3000);