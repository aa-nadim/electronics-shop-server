const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()


const app = express()
const port = process.env.PORT || 4055;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})