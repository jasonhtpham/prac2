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
    constructor (data, prev, next) {
        this.data = data;
        this.next = next || null; 
        this.prev = prev || null; 
    }
} 

class LinkedList {
    constructor (){
        // this.length = 0;
        this.head = this.tail =  null;
    }

    append(data) {
        // check if the list is empty -> initial with a new Node
        if (!this.tail) {
            this.head = this.tail = new Node(data)
        } else {
            let oldTail = this.tail;
            this.tail = new Node(data);
            oldTail.next = this.tail;
            this.tail.prev = oldTail;
        }
    }

    prepend(data) {
        // check if the list is empty -> initial with a new Node
        if (!this.tail) {
            this.head = this.tail = new Node(data)
        } else {
            let oldHead = this.head;
            this.head = new Node(data);
            oldHead.prev = this.head;
            this.head.next = oldHead;
        }
    }

    deleteHead() {
        // check if the list is empty
        if(!this.head) {
            return null;
        } else {
            let removeHead = this.head;
            if (removeHead === this.tail) {
                this.head = this.tail = null;
            } else {
                this.head = this.head.next;
                this.head.prev = null;
            }
            return removeHead.data;
        }
    }

    deleteTail() {
        // check if the list is empty
        if(!this.tail) {
            return null;
        } else {
            let removeTail = this.tail;
            if (removeTail === this.head) {
                this.head = this.tail = null;
            } else {
                this.tail = this.tail.prev;
                this.tail.next = null;
            }
            return removeHead.data;
        }
    }

    //search node by id
    search(id) {
        let currentNode = this.head;

        while (currentNode) {
            if(currentNode.data.id == id) {
                return currentNode;
            }
            currentNode = currentNode.next
        }

        return null;
    }
}

let linkedListAccounts = new LinkedList();

linkedListAccounts.append(accounts[0]);
linkedListAccounts.append(accounts[1]);
linkedListAccounts.append(accounts[2]);


const addNumbers = (x, y) => {
    return x + y
}

// Use express.static to serves static files saved in public folder
app.use(express.static(__dirname + '/public'));

// response with Hello World when the website hit the root endpoint
// app.get('/', function (req, res) {
//     res.send("Hello World");
// })

app.get('/addTwoNumbers', function(req, res) {
    //parse the params into int for mathematical operation
    let x = parseInt(req.query.x);
    let y = parseInt(req.query.y);
    let result = addNumbers(x, y);

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

app.get('/getLinkedListAccount', function (req, res) {

    let result = linkedListAccounts.search(req.query.id);

    //response with a msg if there is no account returned
    if (!result) {
        return res.send("Account Not Found");
    }
    res.send(result.data)
})

// the app listens to port 3000
app.listen(3000);