var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");
var middleware = require("../middleware"); // requires it automatically, because index.js is 
//a special name

//=====================================
//  AUTHENTICATION ROUTES
//=====================================
//SIGNUP
router.get("/register", function(req,res){
    res.render("register", {page: 'register'});
});
router.post("/register", function(req,res){
   //creates the user and save to DB
    var newUser = new User({
        username:req.body.username, 
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email,
        avatar:req.body.avatar  
    });
   if(req.body.adminCode === "secretcode123"){
       newUser.isAdmin = true;
   }
    User.register(newUser,req.body.password, function(err,user){
        if(err) {
           // console.log(err); gives an err object. check next line
           // req.flash("error", err.message); //passes the error to that field                                              
            return res.render("register", {error:err.message});
        }
        // and if that works then it logins the user=>
        else{
            passport.authenticate("local")(req,res,function(){
                req.flash("success", "Successfully signed up! nice to meet you, " + user.username);                                  
                res.redirect("/campgrounds");
             });
        }
    });
});


//LOGINS
router.get("/login", function(req,res){
    res.render("login", {page: 'login'});
});
//handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect: "/login"
    }), function(req,res){
});

//logout
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});


module.exports = router;