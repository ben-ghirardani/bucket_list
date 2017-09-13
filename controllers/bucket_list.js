var express = require('express');
var countriesRouter = express.Router();

var MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/bucketList", function(error, database){
    db = database;
});

// Show
countriesRouter.get("/", function(request, response){
    db.collection("countries").find().toArray(function(error, results){
    response.json(results);    
    });
});

// Create
countriesRouter.post("/", function(request,response){
    console.log(request.body);
    db.collection("countries").insertOne(request.body, function(error, results){
        response.json(results);
    })
})

// Delete
countriesRouter.delete("/:id", function(request, response){
    console.log(request.body.name);
    db.collection("countries").remove({ name : request.body.name}, function(error, results){
        response.json(results);
    });
});


module.exports = countriesRouter;