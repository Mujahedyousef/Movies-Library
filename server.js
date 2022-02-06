//Use this to shown me any problem
"use strict";
//=======================All import and var====================================

//=======1)imoprt module framework (express) from node_modules=================
const express=require('express');
const app=express();

//========================2)import and make variable ==========================
const axios=require('axios');
const dotenv = require('dotenv');
 dotenv.config();
 const APIKEY=process.env.APIKEY;
const PORT=process.env.PORT;

//========================3)import data.json===================================

const dMovie= require('./Movie Data/data.json');
const { handle } = require('express/lib/application');

 //=======================make a constructor to movie==========================
function dataMovie( id,title,release_date,poster_path,overview ){
  this.id=id,
this.title=title,
 this.poster_path=release_date,
this.poster_path=poster_path,
this.overview=overview
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

app.get("/trending",getTrendingFunc);
app.get("/search",getsearchFunc);
app.get("/popular",pagePopularMovie);
//===================================2)use method===============================

//==============================include Handel Error and status=================

//=========================1)status(500)Internal Server Error=================== 
app.use(function (err,req,res){
    console.log("Sorry, something went wrong");

res.status(500).json("Sorry, something went wrong");
});

//=========================2)status(404)Not Found===============================
app.use("*",handlError);

//==============================Functions get from API==========================

function getTrendingFunc (req,res){
  let infTrendingMovies=[];
  axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${APIKEY}&language=en-US'`).then(value=>{
    value.data.results.forEach(trendingData=>{
      let trendingMovies=new dataMovie (trendingData.id,trendingData.title,trendingData.release_date,trendingData.poster_path,trendingData.overview);
      infTrendingMovies.push(trendingMovie) 
    })
    return res.status(200).json(infTrendingMovies);
    
  }).catch(err=>{
   handlError(err,req,res)
  })
};

function getsearchFunc(req,res){
  let searchQuery=req.query.search;
  let arraySearch=[];
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${searchQuery}page=1`).then(value=>{
    value.data.results.forEach(searching=>{
      let searchMovies=new dataMovie(searching.id,searching.title,searching.release_date,searching.poster_path,searching.overview);
      arraySearch.push(searchMovies);
    })
return res.status(200).json(arraySearch);
  }).catch(err=>{
    handlError(err,req,res)
  })
};

function pagePopularMovie(req,res){
  let popularMovie=[];
  axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&page=1
  `).then(value =>{
  value.data.results.forEach(popular =>{
    popularMovie.push(popular);});
  return res.status(200).json(popularMovie);
  }).catch(err => {
      errorHandler(err, req,res);
  });
 };


//===============function HandleError===========================================

function handlError (err,req,res){
  console.log("Sorry, the page Not Found.");
  res.status(404).json("Sorry, the page Not Found.");
  
}



//=================3)Method listen for turn on the server an connection=========
app.listen(PORT, ()=>{
console.log(`Server are working on http://localhost:${PORT}`)

});




























