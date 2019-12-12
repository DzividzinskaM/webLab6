var express = require('express')
var bodyParser = require('body-parser')
const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false })


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const urlDB = 'mongodb://localhost:27017';

const dbName = 'myproject';

const client = new MongoClient(urlDB);

let poem = [];
let poetry = {};


router.get('/add', (req, res) => {
    res.render('adding', {
        title: "hello",
        message: "welcome"
    })
});

router.post('/add', urlencodedParser, function(req, res){
    if(!req.body) return res.sendStatus(400);
    poetry = req.body;
    console.log(poetry);
    insertInDB();
    res.render('about-succes', {title: "thanks for your information"});

});

function insertInDB(){
    client.connect(function(err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
      
        const db = client.db(dbName);
        insertDocuments(db, function() {
            client.close();
          });
    
      });
    
    
    const insertDocuments = function(db, callback) {
      // Get the documents collection
      let collection = db.collection('poetry');
      // Insert some documents
      collection.insertOne(
        {
         nameAuthor: poetry["author"],
         namePoem: [ poetry["title"] ]
         }
       );
         

       let poem = (poetry["text"]).split('\r\n\r\n');


       collection = db.collection('poems');
       collection.insertOne(
           {
               name: poetry["title"],
               text: poem
           }
       )
    }
    
}

module.exports=router;