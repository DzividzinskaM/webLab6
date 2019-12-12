const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const urlDB = 'mongodb://localhost:27017';

const dbName = 'myproject';

const client = new MongoClient(urlDB);

let id;
let allPoems = {};
let poem = [];

client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

    findDocuments(db, function() {
      client.close();
    });

});


const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('poems');
  // Find some documents
  collection.find({}, {projection: { _id: 0, name: 1, text: 1}}).toArray(function(err, docs) {
    allPoems=docs;
    //console.log(poem);
    assert.equal(err, null);
    //console.log("Found the following records");
    callback(docs);
    });

}


function findPoem(){

  for(let key in allPoems){
    if(allPoems[key]["name"]==id){
      poem=allPoems[key]["text"];
    }
  }
  console.log("poem: ");
  console.log(poem);
  return poem;
}



router.get('/:id', (req, res) => {
  var data = req.app.get('data');
  //var item = data[req.params.id];
  id = req.params.id;
  id=id.split(":id")[1];
  findPoem();
 
  res.render('poemList', {
    titlePoem: id,
    poemText: poem
  });
});

module.exports=router;