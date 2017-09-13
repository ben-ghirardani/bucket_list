var express = require('express');
var countriesRouter = express.Router();

var MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/bucketList", function(error, database){
    db = database;
});

countriesRouter.get("/", function(request, response){
    db.collection("countries").find().toArray(function(error, results){
    response.json(results);    
    });
});

module.exports = countriesRouter;