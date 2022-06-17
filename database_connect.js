const { MongoClient } = require("mongodb");     // require mongodb here 
const url = 'mongodb://localhost:27017';
const database = 'user'  // database name 
const client = new MongoClient(url);

async function dbConnect() {
    let result = await client.connect();
    let db = result.db(database) // database name 
    return db.collection('users'); // table name 

}

module.exports =dbConnect;  // export 