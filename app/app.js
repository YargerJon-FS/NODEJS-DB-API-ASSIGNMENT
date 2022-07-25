const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose =require("mongoose");
const directorRoutes= require("../api/routes/directors") 
const movieRoutes= require("../api/routes/movies") 

//middleware for logging
app.use(morgan("dev"))
//parsing middleware
app.use(express.urlencoded({
    extended: true
}));

//middleware that all requests are json
app.use(express.json());

//middleware to handle the CORS policy
app.use((req,res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method=== "OPTIONS"){
        req.header("Access-Control-Allow-Methods","POST, GET, PUT, PATCH, DELETE");
    }
    next();
})
app.get("/", (req,res,next)=> {
    res.status(201).json({
        message: "Service is up", 
        method: req.method
    })
});

app.use("/directors", directorRoutes);
app.use("/movies", movieRoutes);

// add middleware to handle errors and bad url paths
app.use((req, res, next) => {
    const error = new Error("NOT FOUND!!");
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status,
        },
    });
});

//connect to mongodb
mongoose.connect(process.env.mongoDBURL, (err)=>{
    if(err){
        console.error("Error: ", err.message);
    }else{
        console.log("MongoDB connection successful");
    }
});
module.exports= app;