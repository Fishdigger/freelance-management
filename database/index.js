const mongoClient = require("mongodb").MongoClient;
const promise = require("bluebird");

const url = process.env.DB_URL;
const auth = {auth: {user: process.env.DB_USER, password: process.env.DB_PASS}};
const db_name = "freelance-management";

let db;

module.exports.connect = () => {
    return mongoClient.connect(url, auth).then((client) => {
        db = client.db(db_name);
        return db;
    })
}