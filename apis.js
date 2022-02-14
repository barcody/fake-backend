const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");  
app.use(bodyParser.json());

const { cancelTicketInDB, findByTicketId } = require("./app/util");

var { singleton } = require("./server");
var Long = require("mongodb").Long;
var dbInstance;

/**
 * 
 * @summary check ticket validity
 * @argument ticket_id
 * @author Bassam
 * @requires ticket_id
 * @access public
 * @returns ticket validity (bool)
 */
app.get("/validate", async function(req, res) {

	const _ticketid = Long.fromString(req.body.ticket_id); // cast to Long type to match db type
	const isValid  = await findByTicketId(dbInstance, _ticketid);

	// if(isValid) { paymentRequest() }

	res.status(200).send(
		JSON.stringify(isValid)
	);

});

app.get("/reissue", async function(req, res) {

	const _ticketid = Long.fromString(req.body.ticket_id); // cast to Long type to match db type
	const isCancelled = await cancelTicket(_ticketid)
	console.log(isCancelled);
	res.status(200).send(
		// return new ticket
		JSON.stringify(isCancelled.acknowledged)
	)
});

/**
 * 
 * @param {ticket id} _ticketid 
 * @returns 
 */

/**
 * 
 * @summary cancel ticket
 * @param ticket_id
 * @author Bassam
 * @requires ticket_id
 * @access private
 * @returns ticket validity (bool)
 */
async function cancelTicket(_ticketid) {
	const isValid = await cancelTicketInDB(dbInstance, _ticketid)
	return isValid
}

app.listen(port, async function() {
  
	try {  
		dbInstance = await singleton.getInstance();
		await dbInstance.connect();
		await dbInstance.db("admin").command({ ping: 1 }); 
		console.log("Connected successfully to server"); // for testing only!

	} catch(e) { console.log(e); }
	console.log(`Example app listening on port ${port}!`);

});