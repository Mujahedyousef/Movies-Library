"use strict"
const express=require('express');

const app=express();

const dMovie= require('./Movie Data/data.json')

function Movie(title,poster_path,overview ){
    this.Title=title;
    this.poster_path=poster_path;
    this.overview=overview;

}


app.get("/",(req,res)=>{
    let movie=new Movie(dMovie.title,dMovie.poster_path,dMovie.overview);

    res.status(200).json(movie);
})

app.get("/favorite",(req,res)=>{
    res.status(200).json("Welcome to Favorite Page")

})

app.use("*",(req,res)=>{
    res.status(404).send("Not Found!")
})


app.listen(3000, ()=>{
console.log('Server are working....')

});























