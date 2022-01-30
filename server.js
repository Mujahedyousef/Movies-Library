"use strict"
const express=require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const db= require('./Movie Data/data.json')

const app=express();


app.get("/favorite",(req,res)=>{
    res.status(200).json(db)

})


app.listen(3000, ()=>{
console.log('Server are working....')

});























