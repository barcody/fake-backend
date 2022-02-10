async function findByUsername(client, dbName, collectionName, _username) {
    return await client.db(dbName)
                        .collection(collectionName)
                        .findOne( { username: _username } )
}

async function findByEmail(client, dbName, collectionName, _email) {
    return await client.db(dbName)
                        .collection(collectionName)
                        .findOne( { email: _email } )
}

async function findByUserid(client, dbName, collectionName, _userid) {
    return await client.db(dbName)
                        .collection(collectionName)
                        .findOne( { user_id: _userid } )
}

async function findByTicketId(client, dbName, collectionName, _ticketid) {
    return await client.db(dbName)
                        .collection(collectionName)
                        .findOne( { ticket_id: _ticketid} )
}

module.exports = { 
    findByUsername, 
    findByEmail,
    findByUserid,
    findByTicketId,
}