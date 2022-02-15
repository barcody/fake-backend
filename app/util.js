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
	return res.ticket_validitty;
}

async function 	cancelTicketInDB(client, _ticketid) {
	await client.db(Databases.FAKEY)
				.collection(Collections.TICKETS)
				.updateOne(
					{ ticket_id: _ticketid },
						{ $set: 
							{ "ticket_validitty": false }
						}
				);

	const result = await findByTicketId(client, _ticketid);

	return result
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
  }

async function createNewTicket(client, name) {
	
	const ran = getRndInteger(11111111111111111,99999999999999999);
	
	const data = {
		"ticket_id": ran,
		"ticket_owner": name,
		"ticket_validtty": true
	}

	const res = await client.db(Databases.TICKETS)
						.collection(Collections.TICKETS)
						.insertOne( { data } );

	res.acknowledged == true ? data.ticket_id : false
}

module.exports = { 
	findByUsername, 
	findByEmail,
	findByUserid,
	findByTicketId,
	cancelTicketInDB,
	createNewTicket,
};