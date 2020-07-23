var express = require('express');
var app = express();

// response with Hello World when the website hit the root endpoint
app.get('/', function (req, res) {
    res.send("Hello World");
})

app.get('/addTwoNumbers/:x/:y', function(req, res) {
    let x = parseInt(req.params.x);
    let y = parseInt(req.params.y);
    let result = x + y;

    response = "Result = " + result.toString();
    // res.send("The result is: %s", result.toString());
    res.send(response);
})

app.use(express.static('public'))

// the app listens to port 3000
app.listen(3000);