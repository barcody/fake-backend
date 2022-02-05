// declare function require(name:string);
const { MongoClient } = require('mongodb');
require("dotenv").config()

/**
 * 
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * URI: mongodb://<username>:<password>@localhost:27017
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */

const uri = process.env.MONGO_DB_URL;
const client = new MongoClient(uri);
console.log(client)

async function main(){
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await client.db("admin").command({ ping: 1 }); 
        console.log("Connected successfully to server")

        // List all databases
        await listDatabases(client);

        // fetch user details based on username
        await showUserByUsername(client, "mmingeth");

        const _res = await userLoginValidation(client, "mmingeth", "GDdPxZ")
        console.log(_res)

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

async function showUserByUsername(client, _username) {
    
    /**
     *  Collection names 
     *  [ "accounts", "events", "tickets", "users" ]
     */

    const res = await client.db("fakey")
    .collection("accounts")
    .findOne({ username: _username });
    console.log(res)
}

async function userLoginValidation(client, _username, _password) {
    const res = await client.db("fakey")
                            .collection("accounts")
                            .findOne({ username: _username })
    const pass = res.password
    if(pass == _password) return true 
    else return false;
}