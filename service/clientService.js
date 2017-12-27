const mongo = require("../database");

const collection = "Clients"

module.exports.get = (query) => {
    return mongo.connect().then((db) => {
        return db.collection(collection).find(query).toArray();
    })
}