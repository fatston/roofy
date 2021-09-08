// dependencies
const express = require('express');
const path = require('path');
const { send, nextTick } = require('process'); // delete if necessary
const sqlite3 = require('sqlite3').verbose();

// using dependencies I guess
const app = express();
app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const names = ['Luke', 'Eva', 'Phil']; 
const first = names;  
console.log(first); // 'Luke' 
//const [first, second] = names;  
console.log(first, second); // 'Luke' 'Eva'