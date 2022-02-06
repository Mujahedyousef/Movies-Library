//Use this to shown me any problem
"use strict";
//=======================All import and var====================================

//=======1)imoprt module framework (express) from node_modules=================
const express=require('express');
const app=express();
//========================2)import and make variable ==========================
 const dotenv = require('dotenv');
 dotenv.config();
const PORT=process.env.PORT;

//========================3)import data.json===================================

const dMovie= require('./Movie Data/data.json');

 //=======================make a constructor to movie==========================
function Movie(title,poster_path,overview ){
    this.Title=title;
    this.poster_path=poster_path;
    this.overview=overview;
};

//=============================All method in express===========================
//===================================1)get method==============================
// use method especially to app called get(path,(function or callback(params)))
app.get("/",(req,res)=>{
    let movie=new Movie(dMovie.title,dMovie.poster_path,dMovie.overview);
//The information is returned to the client and shown when sending the req to the path.
    res.status(200).json(movie);
});

app.get("/favorite",(req,res)=>{
    res.status(200).json("Welcome to Favorite Page")

});

//===================================2)use method===============================

//==============================include Handel Error and status=================

//=========================1)status(500)Internal Server Error=================== 
app.use(function (err,req,res){
    console.log("Sorry, something went wrong");

res.status(500).json("Sorry, something went wrong");
});

//=========================2)status(404)Not Found===============================
app.use(function (err,req,res){
    console.log("Sorry, the page Not Found.");
    res.status(404).json("Sorry, the page Not Found.");
});
//==============================================================================

//=================3)Method listen for turn on the server an connection=========
app.listen(PORT, ()=>{
console.log(`Server are working on http://localhost:${PORT}`)

});























