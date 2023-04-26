var MongoClient = require('mongodb').MongoClient;
// Docs: https://mongodb.github.io/node-mongodb-native/3.7/api/

exports.addConnection = async function (connection, app, callback){
    if(!app.locals.dbConnections){
        app.locals.dbConnections = [];
    }

    if(!connection.connOptions){
        connection.connOptions = {};
    }
    // const client = new MongoClient(connection.connString);
    // const resp = await client.connect();
    // const database = await client.db('meteor');
    // var dbObj = {};
    // dbObj.native = database;
    // dbObj.connString = connection.connString;
    // dbObj.connOptions = connection.connOptions;
    // app.locals.dbConnections[connection.connName] = null;
    // app.locals.dbConnections[connection.connName] = dbObj;
    // callback(null, null);

    MongoClient.connect(connection.connString, connection.connOptions, function(err, client){
        if(err){
            callback(err, null);
        }else{
            // var database = client.db('meteor');
            var dbObj = {};
            dbObj.native = client;
            // dbObj.native = database;
            dbObj.connString = connection.connString;
            dbObj.connOptions = connection.connOptions;
            app.locals.dbConnections[connection.connName] = null;
            app.locals.dbConnections[connection.connName] = dbObj;
            callback(null, null);
        }
    });
};

exports.removeConnection = function (connection, app){
    if(!app.locals.dbConnections){
        app.locals.dbConnections = [];
    }

    try{
        app.locals.dbConnections[connection].native.close();
    }catch(e){}

    delete app.locals.dbConnections[connection];
    return;
};
