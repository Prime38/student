let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var cookieOptions = {
    signed: true,
    maxAge: 3000000
  };


// create a reference to the model
let userModel = require('../models/user');
let User = userModel.User;
let sha256=require('sha256')

module.exports.processRegisterPage = (req, res, next) => {

    console.log('recieved the request....');
    console.log(req.body.username);
    console.log(req.body.userType);

    let newUser = User({
        "userType":req.body.userType,
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
            let cookies=req.signedCookies.cookies;
            if (cookies) {
                cookies.user = user
            } else {
                cookies = {
                    user: user
                }
              }
            res.cookie('cookies', cookies, cookieOptions)
            res.redirect('/account');
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
            let cookies=req.signedCookies.cookies;
            if (cookies) {
                cookies.user = user
            } else {
                cookies = {
                    user: user
                }
              }
            res.cookie('cookies', cookies, cookieOptions)
            res.redirect('/account');
        }
    })
}
module.exports.displayCheckList=(req,res,next)=>{
    let cookies=req.signedCookies.cookies;
    res.render('checkList',{cookies:cookies})
} 

module.exports.updateCheckList=(req,res,next)=>{
    let cookies=req.signedCookies.cookies;
    if(cookies.user!=null){
        let newUser = {
            "username": cookies.user.username,
            "userType": cookies.user.userType
        }
        console.log("cookies user todo list before->"+ cookies.user.todo_list);

        cookies.user.todo_list.push(req.body.todo);
        console.log("cookies user to do list after->"+ cookies.user.todo_list);
        User.updateOne(newUser,{todo_list:cookies.user.todo_list},(err,userFormDb)=>{
            if(err){
                console.log(err);
            }else{
                console.log("user updated: "+ userFormDb.todo_list);
                cookies.user=userFormDb
                console.log("cookies user to do list after updated db ->"+ cookies.user.todo_list);
                res.cookie('cookies', cookies, cookieOptions)
                res.render('checkList',{cookies:cookies})
            }
        })
    }
    // res.render('checkList',{cookies:cookies})
} 

module.exports.performLogout = (req, res, next) => {
    let cookies=req.signedCookies.cookies;
    cookies.user=null;
    res.cookie('cookies', cookies, cookieOptions)
    res.redirect('/');
}
