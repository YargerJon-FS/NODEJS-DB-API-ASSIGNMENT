const express = require("express");
const router = express.Router();

router.get("/",(req,res,next)=> {
    res.json({message:"Directors - GET"
    });
});

router.post("/",(req,res,next)=> {
    res.json({message:"Directors - POST"
    });
});
router.get("/:authorId",(req,res,next)=> {
    const directorId= req.params.authorId;
    res.json({message:"Directors - GET",
    id: directorId
    });
});

router.patch("/:authorId",(req,res,next)=> {
    const directorId= req.params.directorId;
    res.json({message:"Directors - PATCH",
    id: directorId
    });
});

router.delete("/:authorId",(req,res,next)=> {
    const directorId= req.params.directorId;
    res.json({message:"Directors - DELETE",
    id: directorId
    });
});

module.exports= router;
