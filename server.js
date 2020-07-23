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

// LinkedList should be used to reduce the complexity of the algorithm
// It also saves program resource, because it eliminates abundant processes
// For instance, if I use array, I have to loop through the entire array element by element
// => this will cause big waste of program resources, as the process still loop through the rest of the array regardless 
//    the desire element is found.

class Node {
    constructor (data) {
        this.data = data;
        this.next = null; 
    }
} 

class LinkedList {
    constructor (head = null){
        // this.length = 0;
        this.head = head;
    }
}

// Node #1
const node1 = new Node(
    {   
        id:1,
        name:'alex',
        deposit:5
    }
);

//Node #2
const node2 = new Node(
    {
        id:2,
        name:'sarah',
        deposit:5
    }
);

// Node #3
const node3 = new Node(
    {
        id:3,
        name:'jim',
        deposit:15
    }
)

node1.next = node2;
node2.next = node3;

let linkedListAccounts = new LinkedList(node1);


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

app.get('/getLinkedListAccount/:id', function (req, res) {
    if (linkedListAccounts.head == null) {
        res.send('No account found');
        res.end();
    }
    // define a var call currentNode to keep track of the LinkedList's element
    let currentNode = linkedListAccounts.head;

    // loop through the list until the last element
    while (currentNode != null) {
        if (currentNode.data.id == req.params.id) {
            res.send(currentNode.data);
            res.end()
        }
        // update the currentNode if the desired account was not found
        currentNode = currentNode.next
    }

    //response with a msg if there is no account returned
    res.send("Account Not Found");
})

// Use express.static to serves static files saved in public folder
app.use(express.static('public'))

// the app listens to port 3000
app.listen(3000);