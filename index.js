const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const app = express()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aiagx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port = process.env.PORT || 4055;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productCollection = client.db("ElectronicsShop").collection("products");
  const ordersCollection = client.db("ElectronicsShop").collection("orders");

  app.get('/products', (req, res) => {
    productCollection.find()
    .toArray((err, items) => {
      res.send(items)
    })
  })

  app.post('/addProduct', (req, res) => {
    const newProduct = req.body;
    productCollection.insertOne(newProduct)
    .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
    })
  })


  app.delete('/delete/:id', (req, res) => {
    productCollection.findOneAndDelete({_id: ObjectID(req.params.id)})
    .then(result => {
      console.log(result);
    })
  })
  app.post('/addOrder', (req, res) => {
    const order = req.body;
    ordersCollection.insertOne(order)
    .then(result => {
        res.send(result.insertedCount > 0)
    })
  })
  app.get('/orderDetails', (req, res) => {
    ordersCollection.find()
    .toArray((err, items) => {
      res.send(items)
    })
  })
  

});

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})