const mongo = require("../database");
const titleCase = require("title-case");

const collection = "Clients"

const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports.validateClient = (client) => {
    let errors = [];
    if (client.firstName.length < 2) errors.push("First name is required");
    if (client.lastName.length < 2) errors.push("Last name is required");
    if (!validateEmail(client.email)) errors.push("Email is invalid");
    return errors;
}

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

module.exports.insert = (client) => {
    return mongo.connect().then((db) => {
        db.collection(collection).findOne({}, {sort: {"id": -1}}).then((data) => {
            let oldId = data.id;
            let id = oldId + 1;
            client.id = id;
            return db.collection(collection).insertOne(client);
        });
    });
}

module.exports.update = (client, id) => {
    return mongo.connect().then((db) => {
        return db.collection(collection).replaceOne({id: id}, client);
    })
}

module.exports.delete = (clientID) => {
    return mongo.connect().then((db) => {
        return db.collection(collection).deleteOne({id: clientID});
    })
}