const AuthRouter = require('express').Router();
const User = require('../models/User');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const passport = require('passport');

const { secret } = process.env;

const users = [
    {
      id: 1,
      email: 'jon',
      password: '123'
    },
    {
      id: 2,
      name: 'test',
      password: 'test'
    }
  ];

AuthRouter.post('/login', async (req, res) => {


      var user = await User.findOne({
        email: req.body.email
      });

      console.log(user)
      if( ! user ){
        res.status(401).json({message:"no such user found"});
      }
    
      if(user.password === req.body.password) {
        // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
        var payload = { id: user._id };
        var token = jwt.sign(payload, secret);
        res.json({message: "ok", token: token});
      } else {
        res.status(401).json({message:"passwords did not match"});
      }
})

AuthRouter.get("/auth", passport.authenticate('jwt', { session: false }), function(req, res){
    res.json({ auth: true });
});

AuthRouter.post('/logout', async (req, res) => {
  jwt.
    req.session.destroy(() => {
        res.statusCode(200).send()
    });
})

AuthRouter.post('/register', async function (req, res) {
    const {
        email,
        password,
        admin
    } = req.body;
    console.log(req.body)
    const user = new User({
        email,
        password,
        admin
    });
    const resw = await user.save();
    console.log(resw)
    // user.save(function (err) {
    //     if (err) {
    //         res.status(500)
    //             .send("Error registering new user please try again.");
    //     } else {
    //         res.status(200).send("Welcome to the club!");
    //     }
    // });
});


module.exports = AuthRouter;