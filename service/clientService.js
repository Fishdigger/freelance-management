const mongo = require("../database");
const titleCase = require("title-case");

const collection = "Clients"

module.exports.getAll = () => {
    return mongo.connect().then((db) => {
        return db.collection(collection).find({}).toArray();
    });
}

module.exports.get = (query) => {
    return mongo.connect().then((db) => {
        return db.collection(collection).find(query).toArray();
    });
}

module.exports.getOne = (query) => {
    return mongo.connect().then((db) => {
        return db.collection(collection).findOne(query);
    });
}

module.exports.getByName = (fullName) => {
    let names = fullName.split(" ");
    let firstName = names.shift();
    let lastName = names.join(" ");
    let query = {firstName: titleCase(firstName), lastName: titleCase(lastName)};
    return mongo.connect().then((db) => {
        return db.collection(collection).findOne(query);
    });
}