const hostname = '127.0.0.1'
const port = 3000
let express=require('express');
let app=express();
let server=require('http').createServer(app);
app.use(express.static('public'));
app.set("view engine", "pug");
//app.set("views", path.join(__dirname, "views"));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

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
  });
//});


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
    let authors = [];
    let poems = [];
    let count = 0;
    let countPoems = 0;

    for(let key in docs){
      authors[count] = docs[key]["nameAuthor"];
      for(let val in docs[key]["namePoem"]){
        poems[countPoems] = docs[key]["namePoem"][val];
        countPoems++;
      }
      poems[countPoems] = false;
      countPoems++;
      count++;
    }

    console.log(poems);

    app.get("/", (req, res) => {
      res.render("index", {
          authors: authors,
          poems: poems
      });
    });


    assert.equal(err, null);
    console.log("Found the following records");
    callback(docs);
    });
}



/*let arr_prod = ['carrot', 'potato', 'beet'];
app.get("/", (req, res) => {
  res.render("index", {
      values: arr_prod
  });
});*/

/*app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});*/