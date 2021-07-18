let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');



// create a reference to the model
let userModel = require('../models/user');
let User = userModel.User;


module.exports.displayLoginPage = (req, res, next) => {
    if(!req.user)
    {
        res.render('user-login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName: ''
        });
    }
    else
    {
        res.redirect('/');
    }
}

module.exports.displayRegisterPage = (req, res, next) => {
    
    if(!req.user)
    {
        res.render('register',
        {
        });
    }
    else
    {
        //if the user already exists
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {

    console.log('recieved the request....');
    console.log(req.body.username);
    console.log(req.body.password);

    let newUser = User({
        "username": req.body.username,
        "password": req.body.password
    });
    User.create(newUser, (err, user)=>{
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            // refresh the list
            console.log(user);

            res.redirect('/');
        }
    })


}


module.exports.processLoginPage = (req, res, next) => {
    console.log('recieved the request....');
    console.log(req.body.username);
    console.log(req.body.password);

    

}


module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}
