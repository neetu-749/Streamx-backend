const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

router.post('/', (req,res) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        // if no user is found
        if(user.length <1) {
            return res.status(401).json({
                message: 'Authorization Failed'
            });
        }
        // if user is found then comapare password
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err) {
                return res.status(401).json({
                    message: 'Authorization Failed'
                });
            }
            // if password mathce s we will generate token ( for session)
            if (result) {
                const token = jwt.sign({
                  userId: user[0]._id,
                  firstName: user[0].firstName,
                  lastName: user[0].lastName,
                  email: user[0].email,
                }, 
                'my_secret_key',
                {
                  expiresIn: "1h"
                });
                return res.status(200).json({
                  message: 'Auth successful',
                  token: token
                });
              }
              res.status(401).json({
                message: 'Auth failed'
              });
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      });
      
      module.exports = router;