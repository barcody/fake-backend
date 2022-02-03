// declare function require(name:string);
const { MongoClient } = require('mongodb');

/**
 * 
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */

const uri = "mongodb://rootuser:rootpass@localhost:27017/?maxPoolSize=20&w=majority";
const client = new MongoClient(uri);
console.log(client)

async function main(){
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  client.db("admin").command({ ping: 1 }); 
        console.log("Connected successfully to server")
        // Make the appropriate DB calls
        await  listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");

    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};