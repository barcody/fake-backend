// declare function require(name:string);
const { log } = require('console');
const { MongoClient } = require('mongodb');
const { Databases, Collections } = require('./constants');
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

        const _res = await userLoginValidation(client, "mmingeth", "gDdPxZ")
        // proper msg
        if(_res == true) console.log("Correct credential");
        else console.log("Incorrect credential");

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

    const res = await client.db(Databases.FAKEY)
    .collection(Collections.ACCOUNTS)
    .findOne({ username: _username });
    console.log("user details:")
    console.log(res);
}

async function userLoginValidation(client, _username, _password) {

    const res = await client.db(Databases.FAKEY)
                            .collection(Collections.ACCOUNTS)
                            .findOne({ username: _username })
    const pass = res.password
    if(pass == _password) return true 
    else return false;
}