const { MongoClient } = require("mongodb");

// load variables in .env file
require("dotenv").config();

/**
 * 
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * URI: mongodb://<username>:<password>@localhost:27017
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
const uri = process.env.MONGO_DB_URL;

/**
 * 
 * @Singleton -> Database Singleton Object 
 * 
 * server.js is used throughout the app to access the db object. Using mongodb
 * native drivers the db object contains a pool of connections that are used to
 * make requests to the db. To use this singleton object simply require it and
 * call getInstance(). 
 * 
 */
var Singleton = (function () {
	var instance; // DB Singleton Instance
    
	async function createInstance() {
		return new MongoClient(uri); // create a new mongo client instance
	}
    
	return {

		/** @returns database instance */
		getInstance: function () {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		}
	};
})();

exports.singleton = Singleton;