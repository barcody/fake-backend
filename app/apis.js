const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');  
app.use(bodyParser.json());

const { findByUsername,
        findByTicketId } = require('./util')

var { singleton } = require('./server');
var Long = require('mongodb').Long;
let dbInstance;

/**
 * 
 * @summary check ticket validity
 * @argument ticket_id
 * @author Bassam
 * @requires ticket_id
 * @access public
 * @returns ticket validity (bool)
 */
app.get('/validate', async function(req, res) {

  _ticketid = Long.fromString(req.body.ticket_id) // cast to Long type to match db type
  const isValid  = await findByTicketId(dbInstance, _ticketid)

  // if(isValid) { paymentRequest() }

  res.send(
    JSON.stringify(isValid)
  )

});

// async function paymentRequest() { return "payment not implemented" }

app.get('/reissue', async function(req, res) {

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