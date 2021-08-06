var APIBuilder = require('@axway/api-builder-runtime');
var Model = APIBuilder.createModel('whitelist', {
    "fields": {
        "acbaseurl": {
            "type": "string",
            "required": true,
            "model": "mongo/whitelist",
            "name": "acbaseurl"
        },
        "acsaclientid": {
            "type": "string",
            "required": true,
            "model": "mongo/whitelist",
            "name": "acsaclientid"
        },
        "acsaclientsecret": {
            "type": "string",
            "required": true,
            "model": "mongo/whitelist",
            "name": "acsaclientsecret"
        },
        "email": {
            "type": "string",
            "required": true,
            "model": "mongo/whitelist",
            "name": "email"
        },
        "fname": {
            "type": "string",
            "required": true,
            "model": "mongo/whitelist",
            "name": "fname"
        },
        "hasCreds": {
            "type": "boolean",
            "default": "false",
            "required": true,
            "model": "mongo/whitelist",
            "name": "hasCreds"
        },
        "lname": {
            "type": "string",
            "required": true,
            "model": "mongo/whitelist",
            "name": "lname"
        },
        "mobile": {
            "type": "string",
            "required": true,
            "model": "mongo/whitelist",
            "name": "mobile"
        }
    },
    "connector": "composite",
    "metadata": {
        "primarykey": "id",
        "primaryKeyDetails": {
            "autogenerated": true,
            "type": "string"
        }
    },
    "actions": [
        "create",
        "read",
        "update",
        "delete",
        "deleteAll"
    ]
});
module.exports = Model;
