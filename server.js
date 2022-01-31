"use strict"
const express=require('express');

const app=express();
const axios=require('axios')
const dotenv = require('dotenv');
dotenv.config();
const APIKEY = process.env.APIKEY;
const dMovie= require('./Movie Data/data.json')

function Movie(title,poster_path,overview ){
    this.Title=title;
    this.poster_path=poster_path;
    this.overview=overview;

}


app.get("/",(req,res)=>{
    let movies = [];
  moviesData.data.forEach((movie) => {
    movie = new Movie(movie.title, movie.poster_path, movie.overview);
    movies.push(movie);
  });
  return res.status(200).json(movies);
});


app.get("/favorite",(req,res)=>{
    res.status(200).json("Welcome to Favorite Page")

})




app.use("*",(req,res)=>{
    res.status(404).send("Not Found!")
})


app.listen(3000, ()=>{
console.log('Server are working....')

});























