const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');  
app.use(bodyParser.json());

const { Databases, Collections } = require('./constants');
const { findByUsername } = require('./util')
var { singleton } = require('./server')
var dbInstance;

app.post('/', async function(req, res) {

  _username = req.body.username
  const result  = await findByUsername(dbInstance,Databases.FAKEY, Collections.ACCOUNTS, _username)

  res.send(JSON.stringify(result))

});

app.listen(port, async function() {
  dbInstance = await singleton.getInstance();
  try {  
    await dbInstance.connect()

    await dbInstance.db("admin").command({ ping: 1 }); 
    console.log("Connected successfully to server") // for testing only!

  } catch(e) { console.log(e); }
  console.log(`Example app listening on port ${port}!`)

});