const mongoClient = require("mongodb").MongoClient;
const promise = require("bluebird");

const url = process.env.DB_URL;
const auth = {auth: {user: process.env.DB_USER, password: process.env.DB_PASS}};
const db_name = "freelance-management";

// module.exports.get = (query, collection) => {
//     return mongoClient.connect(url, auth).then((client) => {
//         return client.db(db_name).collection(collection).find(query).toArray();
//     }).then((client) => {
//         client.close();
//     });
// }

// module.exports.get({}, "Clients").then((data) => {
//     console.log(data);
// });

let db;

module.exports.connect = () => {
    return mongoClient.connect(url, auth).then((client) => {
        db = client.db(db_name);
        return db;
    })
}

// mongoClient.connect(url, {auth: {user: user, password: pass}}, (err, client) => {
//     if (err) throw err;
//     console.log("Successfully connected to DB");
//     let db = client.db("freelance-management")
//     db.collection("Clients").find({}).toArray((err, data) => {
//         if (err) throw err;
//         console.log(data);
//         client.close();
//     });
// });

