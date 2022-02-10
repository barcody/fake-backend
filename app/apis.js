const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');  
app.use(bodyParser.json());

const { Databases, Collections } = require('./constants');

const { findByUsername,
        findByTicketId } = require('./util')

var { singleton } = require('./server');
var Long = require('mongodb').Long;
var dbInstance;

app.get('/d', async function(req, res) {

  _username = req.body.username;
  const result  = await findByUsername(dbInstance,Databases.FAKEY, Collections.ACCOUNTS, _username)

  res.send(
    JSON.stringify(result)
  )

});

app.get('/ticketid', async function(req, res) {

  _ticketid = Long.fromString(req.body.ticket_id) // cast to Long type to match db type
  const result  = await findByTicketId(dbInstance,Databases.FAKEY, Collections.TICKETS, _ticketid)

  res.send(
    JSON.stringify(result)
  )

});

app.listen(port, async function() {
  try {  
    dbInstance = await singleton.getInstance();
    await dbInstance.connect()
    await dbInstance.db("admin").command({ ping: 1 }); 
    console.log("Connected successfully to server") // for testing only!

  } catch(e) { console.log(e); }
  console.log(`Example app listening on port ${port}!`)

});