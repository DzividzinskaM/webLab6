const hostname = '127.0.0.1';
const port = 3000;
let express=require('express');
let app=express();
let server=require('http').createServer(app);
app.use(express.static('public'));
app.set("view engine", "pug");
var url = require('url');
var request = require ('request');
var router = require('router');
var bodyParser = require('body-parser')


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


const urlDB = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(urlDB);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
   });
   

client.connect(function(err) {
	assert.equal(null, err);
	console.log("Connected successfully to server");

	const db = client.db(dbName);

	//insertDocuments(db, function() {
    findDocuments(db, function() {
      client.close();
    });
 // });
  console.log(urlDB);
});

app.get("/:id", function(req, res){
  var data = req.app.get('data');
  var item = req.params.id;
   res.render("../public/poemList.pug", {
     message: item
   });
   console.log(item);
});

/*app.get("/", (req, res)=> {
  var k=
  console.log()
});*/

/*var adr = 'https://views/poemList.pug?id=vdksvl&aut=fnfdkn';
var q = url.parse(adr, true);
console.log("host");
console.log(adr.href);
console.log(q.search);
var qdata = q.query;
console.log(qdata.id);
console.log(qdata.aut);*/

/*app.get(, (req, res)=>{
  res.send("hello");
});*/





const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('poetry');
  // Insert some documents
  collection.insertMany([
    {
     nameAuthor: "Тарас Шевченко",
     namePoem: ["Садок вишневий коло хати", "Сон"]
	}, 
	{
	   nameAuthor: "Леся Українка",
     namePoem: ["Contra spem spero", "Надія"]
 	},
 	{
 	   nameAuthor: "Іван Франко",
     namePoem: ["Паде додолу листя з деревини...", "Не пора"]

 	}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('poetry');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    let poetry = {};

    for(let val in docs){
      let key = docs[val]["nameAuthor"];
      poetry[key] = docs[val]["namePoem"];
    }

    //console.log(poetry);
 
    app.get("/", (req, res) => {
      res.render("index", {
          values: poetry
      });
    });


    assert.equal(err, null);
    console.log("Found the following records");
    callback(docs);
    });

}
