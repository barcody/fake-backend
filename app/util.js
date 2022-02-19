const { Databases, Collections } = require("./constants");

async function findByUsername(client, dbName, collectionName, _username) {
	return await client.db(dbName)
		.collection(collectionName)
		.findOne( { username: _username } );
}

async function findByEmail(client, dbName, collectionName, _email) {
	return await client.db(dbName)
		.collection(collectionName)
		.findOne( { email: _email } );
}

async function findByUserid(client, dbName, collectionName, _userid) {
	return await client.db(dbName)
		.collection(collectionName)
		.findOne( { user_id: _userid } );
}

async function findByTicketId(client, _ticketid) {
	const res = await client.db(Databases.FAKEY)
		.collection(Collections.TICKETS)
		.findOne( { ticket_id: _ticketid} );
	
	return res;
}

async function cancelTicketInDB(client, _ticketid) {
	// explaination
	// var query = { ticket_id: _ticketid }
	// var newValues = { $set: { ticket_validitty: false }}

	await client.db(Databases.FAKEY)
		.collection(Collections.TICKETS)
		.updateOne(
			{ ticket_id: _ticketid },
			{ $set: 
					{ "ticket_validitty": false }
			}
		);
		
	
	const result = await findByTicketId(client, _ticketid);

	return result.ticket_validitty;
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}

async function createNewTicket(client, name) {
	
	const _newTicket = getRndInteger(10000000000000000,90000000000000000);

	const res = await client.db(Databases.FAKEY)
		.collection(Collections.TICKETS)
		.insertOne( { 
			"ticket_id": _newTicket,
			"ticket_owner": name,
			"ticket_validitty": true
		} );

	return res.acknowledged == true ? _newTicket : false;
}

module.exports = { 
	findByUsername, 
	findByEmail,
	findByUserid,
	findByTicketId,
	cancelTicketInDB,
	createNewTicket,
};