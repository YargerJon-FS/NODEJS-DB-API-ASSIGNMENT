const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Movie= require("../models/movies");

router.get("/",(req,res,next)=> {
    res.json({message:"Movies - GET"
    });
});

router.get("/:movieId",(req,res,next)=> {
    const movieId= req.params.movieId;
    res.json({message:"Moviess - GET",
    id: movieId
    });
});

router.post("/",(req,res,next)=> {
    
const newMovie = new Movie({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    director: req.body.director,
});

//write to the database
newMovie.save()
.then(result => {
    console.log(result);
    res.status(200).json({
        message: "Movie Saved",
        book:{
            title: result.title,
            director: result.director,
            id: result._id,
            metadata:{
                method: req.method,
                host: req.hostname
            }
        }
    });
})
.catch(err => {
    console.error(err.message);
    res.status(500).json({
        error: {
            message: err.message
        }
    });
});

});


router.patch("/:movieId",(req,res,next)=> {
    const movieId= req.params.movieId;
    
    const updatedMovie= {
        title: req.body.title,
        director: req.body.director
    };

    Movie.updateOne({
        _id:movieId
    }, {
        $set: updatedMovie
    })
    .then(result => {
        res.status(200).json({
            message: "Updated Movie",
            movie: {
                title: result.title, 
                director: result.director, 
                id: result._id
            },
            metadata: {
                host: req.hostname,
                method: req.method
            }
        })
    })

    .catch(err =>{
        res.status(500).json({
            error: {
                message: err.message
            }
        })
    });


});

router.delete("/:movieId",(req,res,next)=> {
    const movieId= req.params.movieId;
    res.json({message:"Movies - DELETE",
    id: movieId
    });
});

module.exports= router;
