const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");  
app.use(bodyParser.json());

const { cancelTicketInDB,
		findByTicketId,
		createNewTicket, } = require("./app/util");

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
 * 
 * @keys		->		@type
 * ticket_id	->		string
 */
app.get("/validate", async function(req, res) {

	const _ticketid = Long.fromString(req.body.ticket_id); // cast to Long type to match db type
	const isValid  = await findByTicketId(dbInstance, _ticketid);

	// if(isValid) { paymentRequest() }

	res.status(200).send(
		JSON.stringify(isValid)
	);

});

/**
 * 
 * @summary cancel a ticket
 * @argument ticket_id
 * @author Bassam
 * @requires ticket_id
 * @access public
 * @returns a new valid ticket
 * 
 * @keys		->		@type
 * ticket_id	->		string
 * username		->		string
 * 	
 */
app.get("/reissue", async function(req, res) {

	const _ticketid = Long.fromString(req.body.ticket_id); // cast to Long type to match db type
	const name = req.body.username
	const isCancelled = await cancelTicket(_ticketid);

	if (!isCancelled) { 
		const new_ticket = await createNewTikcet(dbInstance,name)
		if(new_ticket) {
			res.status(200).send(
				JSON.stringify(new_ticket)
			)	
		} else {
			res.status(200).send(
				JSON.stringify("Invalid")
			)
		}
	}
});

/**
 * 
 * @summary cancel ticket
 * @param ticket_id
 * @author Bassam
 * @requires ticket_id
 * @access private
 * @returns acknowledged (bool)
 */
async function cancelTicket(_ticketid) {
	const isValid = await cancelTicketInDB(dbInstance, _ticketid)
	return isValid
}

async function createNewTikcet(client) {
	return await createNewTicket(client)
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