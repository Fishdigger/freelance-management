const mongo = require("../database");

const collection = "Users";

module.exports.getPermissions = (email) => {
    return mongo.connect().then((db) => {
        return db.collection(collection).find({email: email})
        .project({permissions: 1, _id: 0});
    });
}

module.exports.get = (email) => {
    return mongo.connect().then((db) => {
        return db.collection(collection).findOne({email: email});
    });
}

module.exports.insert = (user) => {
    return mongo.connect().then((db) => {
        return db.collection(collection).insertOne(user);
    });
}

module.exports.update = (user) => {
    return mongo.connect().then((db) => {
        return db.collection(collection).replaceOne({email: user.email}, user);
    });
}