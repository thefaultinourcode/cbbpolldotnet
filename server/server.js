const express = require('express');
const app = express();
// const MongoClient = require('mongodb').MongoClient;

// Connect URL
// const url = 'mongodb://127.0.0.1:27017';

// const dbName = 'testcbbpoll';
// let db;

// MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//   if (err) return console.log(err)

  // Storing a reference to the database so you can use it later
  // db = client.db(dbName)
//   console.log(`Connected MongoDB: ${url}`)
//   console.log(`Database: ${dbName}`)
// })

app.get("/", function (req, res) {
    res.send("Hello World!");
  });

app.get('/test', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

app.get('/voterForm', (req, res) => {
    TeamData.find({}).then(data => {
      res.json(data);
    });
  });

