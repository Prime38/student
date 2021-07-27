let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');



// create a reference to the model
let userModel = require('../models/user');
let User = userModel.User;
let sha256=require('sha256')

module.exports.processRegisterPage = (req, res, next) => {

    console.log('recieved the request....');
    console.log(req.body.username);
    console.log(req.body.password);

    let newUser = User({
        "username": req.body.username,
        "password": sha256(req.body.password),
        "email":req.body.email,
        "phone":req.body.phone
    });
    User.create(newUser, (err, user)=>{
        if(err){
            console.log(err);
            res.send(err);
        } else{
            console.log(user);
            res.render('account',{user:user});
        }
    })
}
module.exports.updateUserInfo = (req, res, next) => {
    console.log('recieved the request....');
    console.log(req.body.username);
    console.log(req.body.password);

    let newUser = {
        "username": req.body.username,
        "email":req.body.email,
        "phone":req.body.phone
    }
    
    User.update(newUser, (err, user)=>{
        if(err){
            console.log(err);
            res.send(err);
        } else{
            console.log(user);
            res.render('account',{user:user});
        }
    })
}


module.exports.processLoginPage = (req, res, next) => {
    console.log('recieved the request....');
    console.log(req.body.username);
    console.log(req.body.password);

    let newUser = {
        "username": req.body.username
    }
    User.findOne(newUser, (err, user)=>{
        if(err){
            console.log(err);
            res.send(err);
        } else{
            console.log(user);
            res.render('account',{user:user});
        }
    })
}



module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}
