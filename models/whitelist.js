var APIBuilder = require('@axway/api-builder-runtime');
var Model = APIBuilder.createModel('whitelist', {
    "connector": "composite",
    "fields": {
        "email": {
            "type": "string",
            "model": "mongo/whitelist",
            "name": "email"
        },
        "fname": {
            "type": "string",
            "model": "mongo/whitelist",
            "name": "fname"
        },
        "lname": {
            "type": "string",
            "model": "mongo/whitelist",
            "name": "lname"
        },
        "mobile": {
            "type": "string",
            "model": "mongo/whitelist",
            "name": "mobile"
        }
    },
    "actions": [
        "create",
        "read",
        "update",
        "delete",
        "deleteAll"
    ],
    "metadata": {
        "primarykey": "id",
        "primaryKeyDetails": {
            "autogenerated": true,
            "type": "string"
        }
    }
});
module.exports = Model;