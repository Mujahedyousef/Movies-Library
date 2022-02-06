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

const axios=require('axios')
const dotenv = require('dotenv');
const pg =require('pg')
const dMovie= require('./Movie Data/data.json');
const { get } = require('express/lib/response');
const { Client } = require('pg/lib');
const DATABASE_URL=process.env.DATABASE_URL;
const client=new pg.Client(DATABASE_URL)
dotenv.config();
const APIKEY = process.env.APIKEY;
const PORT=process.env.PORT;


app.get("/",dataMovie)
app.get("/favorite",(req,res)=>{
    res.status(200).json("Welcome to Favorite Page")

});
app.get("/trending",TrendingHandler);
app.get("/search",searchMovie);
app.get("/moviePopular",pagePopularMovie);
app.post("/addfavariteMovie", addMovies);
app.get("/getfavariteMovie", getAllFavariteMovies);
app.put("/updateInfMovie/:id",updateInfMovie);
app.delete("/deletInfMovie/:id",deletInfMovie);
app.get("/getInfMovie/id",getInfMovie)
app.use(express.json());
app.use(errorHandler);






function MovieConstructor(id,title,release_date,poster_path,overview ){
    this.Id=id;

    this.Title=title;
    this.release_date=release_date;
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

}


function dataMovie(req,res){
  let dataAll = new MovieConstructor (dMovie.id,dMovie.title,dMovie.release_date,dMovie.poster_path,dMovie.overview);
  return res.status(200).json(dataAll);
};


function searchMovie(req,res){
const searchQuery  = (req.query.search);
const searchArray=[];
axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${searchQuery}`).then(value=>{
  value.data.results.forEach(shearchMovie=>{
    let search =new MovieConstructor(shearchMovie.id,shearchMovie.title, shearchMovie.release_date,shearchMovie.poster_path, shearchMovie.overview);
searchArray.push(search)
  })
  return res.status(200).json(searchArray);
}).catch(error=>{
  errorHandler(error, req,res);
})
}

function TrendingHandler(req,res){
const trendingMovies=[];
axios
.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}&language=en-US`).then(value=>{
  value.data.results.forEach(trend=>{
    let trendingMovie = new MovieConstructor (trend.id,trend.title,trend.release_date,trend.poster_path,trend.overview);            
    trendingMovies.push(trendingMovie)
  
  })
  return res.status(200).json(trendingMovies);

}).catch(error=>{
  errorHandler(error, req,res);
})

}

function pagePopularMovie(req,res){
  const popularMovie=[];
  axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&page=1
  `).then(value =>{
  value.data.results.forEach(value =>{
    popularMovie.push(value);
  });return res.status(200).json(popularMovie);
  }).catch(error => {
      errorHandler(error, req,res);
  });
 }





 function errorHandler(error,req,res){
   const err={
    status : 500,
    message : error
}
res.status(500).send(err);
};

 function addMovies(req,res){
const addmovie=req.body;
const sql=`INSERT INTO favariteMovie (title,release_date,poster_path,overview)VALUES($1,$2,$3,$4) RETURNING * ;`
let values=[addmovie.title, addmovie.release_date, addmovie.poster_path, addmovie.overview ];
client.query(sql, values).then((data) => {
       
  return res.status(201).json(data.rows);
}).catch(error => {
  errorHandler(error, req, res);
})
};
 

function getAllFavariteMovies (req,res){
const sql=`SELECT * FROM favariteMovie`;
client.query(sql).then(data => {
  return res.status(200).json(data.rows);
}).catch(error => {
  errorHandler(error, req,res);
})
};

 function updateInfMovie (req,res){
const id =req.params.id ;
const movie=req.body ;
const sql=`UPDATE favariteMovie SET title=$1, release_date=$2, poster_path=$3, overview=$4 WHERE id=${id} * RETARNING `;
const values=[movie.title, movie.release_date, movie.poster_path, movie.overview ];
client.query(sql,values).then(data=>{
   res.status(200).json(data.rows);

}).catch(err=>{
  errorHandler (err,req.res);
})
 }

 function deletInfMovie(req,res){
   const id=req.params.id ;
   const sql=`DELETE FROM favariteMovie WHERE id=${id} `;
   client.query(sql).then(()=>{
     return res.status(204).json([]);
   }).catch(err=>{
     errorHandler (err,req.res);
   })
 }

 function getInfMovie(req,res){
   const id=req.params.id ;
   const sql=`SELECT * FROM favariteMovie WHERE id=${id}`;
   client.query(sql).then(data=>{

res.status(200).json(data.rows)
   }).catch(err=>{
    errorHandler (err,req.res);
  })
  
 }



client.connect().then(()=>{

  app.listen(PORT, ()=>{
    console.log(`Server are working ${PORT}....`)
    
    });
});
























