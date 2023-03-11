const express=require('express');
const router = require("express").Router();
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const User = require('../models/User');

// console.log('bye');

router.post('/signUp', async (req,res)=>{
    // console.log("hi");
    console.log(req.body);

    // try{
    //     res.status(200).json({
    //         message:"Inside post /api/signUp"
    //     });
    // }
    // catch(error){
    //     console.log(error);
    // }
    User.find({email:req.body.email})
    .exec()
    .then(user => {
        if (user.length >=1 ) {
            return res.status(409).json({   // conflict! mail id already exists
                message:"User already exists"
            });   
        }else{        // generate new user
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        console.log(err);
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user= new User({
                            _id: new mongoose.Types.ObjectId,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash
                        });
                        // to save user
                        user
                            .save()
                            .then(result =>{
                                console.log(result);
                                res.status(201).json({
                                    message: "user created successfully"
                                });
                            })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                    }
                })
            }
        })
    .catch(err =>{
        console.log(err);
        res.status(422).json({   // unprocess about entity error
            erro: err
        });
    });
});

module.exports = router;
