/*********************************************************************************
* BTI425 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Ali Asadullah Student ID: 174606210 Date: jan 23, 2023
* Cyclic Link: _______________________________________________________________
*
********************************************************************************/ 



const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const cors = require("cors");
app.use(cors());

const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

require('dotenv').config();

app.use(bodyParser.json());

app.post("/api/movies", (req,res) => {
   db.addNewMovie(req.body)
    .then(() => {
            res.status(201).json(`new movie successfully added`);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

app.get("/api/movies", (req,res) => {
    db.getAllMovies(req.query.page, req.query.perPage)
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

app.get("/api/movies/:id", (req,res) => {
    db.deleteMovieById(req.params.id)
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

app.put("/api/sales/:id", (req,res) => {
    db.updateMovieById(req.body, req.params.id)
        .then(() => {
            res.status(200).json(`movie ${req.body._id} successfully updated`);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

app.delete("/api/sales/:id", (req,res) => {
   db.deleteMovieById(req.params.id)
        .then(() => {
            res.status(200).json(`movie ${req.params.id} successfully deleted`);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
    });
    }).catch((err)=>{
    console.log(err);
    });

app.use(express.json())
app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, '/index.html'));
});